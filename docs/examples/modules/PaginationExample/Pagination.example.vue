<template lang="html">
  <div>
    <sui-pagination :total="700" :current="current"  @update-current-page="updateCurrentPage"/>
  </div>
</template>

<script>
export default {
  name: 'PaginationExample',
  data() {
    return { current: 7 };
  },
  methods: {
    updateCurrentPage(p) {
      if (p !== this.current) {
        this.current = p;
      }
    },
  },
};
</script>

<style lang="css">
</style>
