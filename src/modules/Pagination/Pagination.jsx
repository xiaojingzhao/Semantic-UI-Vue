import { SemanticUIVueMixin } from '../../lib';
import { Menu, MenuItem } from '../../collections/Menu';
import Icon from '../../elements/Icon/Icon';

const PAGE_SCALE_MIN = 9;
const OFF_SET = 5;

export default {
  name: 'SuiPagination',
  mixins: [SemanticUIVueMixin],
  props: {
    total: {
      type: Number,
      description: 'items length in total. E.g. 100 items of bill list. 10 items a page. So there are 10 pages in total. In this case, total should be set as 100',
    },
    current: {
      type: Number,
      description: 'Indicates current page',
    },
    pageSize: {
      type: Number,
      default: 10,
      description: 'How many items should be displayed in a page',
    },
  },
  events: {
    updateCurrentPage: {
      custom: true,
    },
  },
  data() {
    return {
      pages: [],
      pageLength: 0,
    };
  },
  watch: {
    total() {
      this.updatePages();
    },
    current() {
      this.updatePages();
    },
  },
  created() {
    this.updatePages();
  },
  methods: {
    updatePages() {
      this.pageLength = Math.ceil(this.total / this.pageSize);
      const pagesArr = new Array(this.pageLength).fill(1);
      const pages = pagesArr.map((_, index) => index + 1);
      if (this.pageLength <= PAGE_SCALE_MIN) {
        this.pages = [...pages];
      } else {
        const ellipseStartIndex = 1;
        const ellipseEndIndex = this.pageLength - 1;
        const pageStartIndex =
          this.pageLength - this.current < OFF_SET - 1
            ? this.pageLength - OFF_SET
            : this.current - 3;
        const pageEndIndex = this.current < OFF_SET ? OFF_SET : this.current + 2;
        const newPages = [...pages];
        if (pageEndIndex < ellipseEndIndex) {
          newPages.splice(pageEndIndex, ellipseEndIndex - pageEndIndex, '...');
        }
        if (pageStartIndex > ellipseStartIndex) {
          newPages.splice(
            ellipseStartIndex,
            pageStartIndex - ellipseStartIndex,
            '...',
          );
        }
        this.pages = [...newPages];
      }
    },
    prev() {
      const p = this.current - 1;
      if (p > 0) {
        this.$emit('update-current-page', p);
      }
    },
    next() {
      const p = this.current + 1;
      if (p <= this.pageLength) {
        this.$emit('update-current-page', p);
      }
    },
  },
  render() {
    return (
      <Menu
        {...this.getChildPropsAndListeners()}
        class={this.classes(
          'ui',
          'pagination',
        )}
      >
        <MenuItem
          class={this.current === 1 ? 'disabled' : ''}
          onClick={this.prev} >
          <Icon name="chevron left"/>
        </MenuItem>
        {
          this.pages.map((p, key) => {
            let className = '';
            if (p === '...') {
              className = 'disable';
            } else if (p === this.current) {
              className = 'active';
            }
            return (
              <MenuItem key={key}
                class={className}
                onClick={() => this.$emit('update-current-page', p)}>
                {p}
              </MenuItem>
            );
          })
        }
        <MenuItem
          class={this.current === this.pageLength ? 'disabled' : ''}
          onClick={() => this.next()}>
          <Icon name="chevron right" />
        </MenuItem>
      </Menu>
    );
  },
};
