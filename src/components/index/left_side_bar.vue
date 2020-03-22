<template>
  <div class="col-md-3 col-xl-2 bd-sidebar">
    <form class="d-flex align-items-center ml-1 bd-search">
      <span class="algolia-autocomplete" style="width: 100%;">
        <input type="search" placeholder="Search...." class="form-control ds-input" />
      </span>
      <b-navbar-toggle target="categoryCol" class="md-none">
        <svg width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false">
          <title>分类</title>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M4 7h22M4 15h22M4 23h22"
          />
        </svg>
      </b-navbar-toggle>
    </form>

    <b-collapse is-nav id="categoryCol" class="mt-md-2">
      <div
        :class="{'item': true, active:currentItem === index1}"
        v-for="(category, index1) in categoryList"
        :key="index1"
        @click="changeCurrent(index1)"
      >
        <b-navbar-nav v-b-scrollspy:article-area>
          <!-- 分类导航 -->
          <b-nav-item class="ct-link">
            {{category.cName}}
            <span>({{category.hasOwnProperty('publish') ? category.publish.length : 0}})</span>
            <span class="sr-only">(current)</span>
          </b-nav-item>
          <!-- 分类对应的文章子导航 -->
          <b-navbar-nav v-if="category.hasOwnProperty('publish')" class="child-nav">
            <b-nav-item
              v-for="(article, index2) in category.publish"
              :href="`#item-${article.aid}`"
              :key="index2"
            >{{article.aName}}</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss" scoped>
.bd-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.05);

  .bd-search {
    position: relative;
    padding: 1rem 15px;
    margin-right: -15px;
    margin-left: -15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  #categoryCol {
    .item {
      .nav-item {
        padding-left: 30px;
        .nav-link:hover {
          color: #524f4f;
        }
        .nav-link {
          color: rgba(0, 0, 0, 0.52);
        }
      }
      .child-nav {
        display: none;
      }
    }
    .active {
      .ct-link {
        .nav-link {
          color: #2f4040 !important;
          font-weight: 600;
        }
      }
      .child-nav {
        display: block;
      }
    }
  }

  @media (max-width: 768px) {
    .bd-sidebar{   
      min-height: 0vh;  
    }
    #categoryCol {
      margin-top: 8px;
      text-align: center;
      font-size: 18px;
      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        .nav-item {
          .nav-link:hover {
            color: #007bff;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    .bd-sidebar{
      min-height: 100vh;
    }

    #categoryCol {
      display: block !important;
    }

    .md-none {
      display: none !important;
    }
  }
}
</style>


<script>
import Apis from "@/service/api";

export default {
  data() {
    return {
      username: "",
      currentItem: 0,
      categoryList: []
    };
  },

  created() {
    this.username = this.$route.params.user;
  },

  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      try {
        const res = await Apis.getOnesCategory(this.$store.state.id);
        this.categoryList = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    changeCurrent(index) {
      this.currentItem = index;
    }
  }
};
</script>