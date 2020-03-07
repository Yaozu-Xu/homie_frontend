<template>
  <b-container class="m-0 p-0" fluid>
    <IndexHeader></IndexHeader>
    <div class="row flex-xl-nowrap" style="margin-right: 0;">
      <LeftSideBar></LeftSideBar>
      <ArticleContainer></ArticleContainer>
    </div>
  </b-container>
</template>


<style lang="scss" scoped>

</style>

<script>

import IndexHeader from "@/components/index/header";
import LeftSideBar from "@/components/index/left_side_bar";
import ArticleContainer from "@/components/index/article_container";

export default {
  data() {
    return {
    }
  },

  components: {
    IndexHeader,
    LeftSideBar,
    ArticleContainer,
  },

};
</script>