<template>
  <b-navbar class="flex-column flex-md-row nav-header">
    <b-navbar-brand href="#" class>homiepub</b-navbar-brand>
    <div class="navbar-nav-scroll ml-md-auto mr-md-4">
      <b-navbar-nav class="flex-row">
        <b-nav-item
          :class="currentPage == item.url ? 'active pr-sm-3' : 'pr-sm-3'"
          v-for="(item, index) in headerList"
          :key="index"
          :to="item.url"
        >{{item.name}}
        </b-nav-item>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>


<script>

export default {
  data() {
    return {
      currentPage: "",
      username: '',
      login: null,
      selfPage: null,
      headerList: null,
    }
  },

  mounted() {
    this.generateHeader()
  },

  created(){
    this.username = this.$route.params.user || this.$store.state.username
    this.login = this.$store.state.login
    this.selfPage = this.$store.state.selfPage
  },

  watch: {
    $route: {
      handler(newRouter) {
        this.currentPage = "/" + newRouter.name;
      },
      immediate: true
    }
  },

  methods: {
    generateHeader() {
      if(!this.login){
        // 游客访问
        this.headerList = [
          { url: `/index/xyz`, name: "作者主页" },
          { url: "/", name: "关于" },
          { url: "/login", name: "登陆" }
        ]
      }else if (this.selfPage) {
        // 注册的用户 访问自己的页面
        this.headerList = [
          { url: `/index/${this.username}`, name: "主页" },
          { url: "/publish", name: "发布" },
          { url: "/admin", name: "空间"},
          { url: "/", name: "关于" },
          { url: "/login", name: "登陆" }
        ]
      }else{
        // 注册的用户访问别人的页面
        this.headerList = [
          { url: `/index/${this.username}`, name: "主页" },
          { url: "/", name: "关于" },
          { url: "/login", name: "登陆" }
        ]
      } 
    },
  }
}
</script>



<style lang="scss" scoped>
.nav-header {
  background: #fff;
  box-shadow: 0 5px 4px -4px rgba(25, 25, 25, 0.1);
  color: #888;

  .active {
    color: blue;
  }

  .navbar-brand {
    font-weight: 300;
    font-family: "Sakura";
    text-shadow: 1px 1px 1px rgba(179, 225, 247, 0.5);
    padding-left: 60px;
  }
}

@media (max-width: 991.98px) {
  .navbar-nav-scroll {
    max-width: 100%;
    height: 2.5rem;
    margin-top: 0.25rem;
    overflow: hidden;

    .navbar-nav {
      padding-bottom: 2rem;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    padding-right: 30px;
  }
}
</style>