<template>
  <div class="left-bar">
    <a :href="'/index/' + user" class="icon">
      <img :src="icon" style="width: 32px;
      height: 32px;
      border-radius: 50%;" />
    </a>
    <a href="#calendar">
      <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
    </a>
    <a href="#settings">
      <i class="fa fa-cog" aria-hidden="true"></i>
    </a>
    <a href="#anaylsis">
      <i class="fa fa-bar-chart" aria-hidden="true"></i>
    </a>
  </div>
</template>


<style lang="scss" scoped>
.left-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 10vh;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background-clip: content-box;
  a {
    display: block;
    padding: 0.8rem 1rem 0.8rem 1rem;
    img {
      border-radius: 50%;
    }
    i {
      font-size: 1.6rem;
      color: grey;
    }
    i:hover {
      color: indianred;
    }
  }
}

@media screen and (min-width: 768px) {
  .left-bar {
    a {
      i {
        font-size: 1.8rem;
      }
    }
  }
}

@media screen and (min-width: 576px) {
  .left-bar {
    a {
      i {
        font-size: 1.6rem;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .left-bar {
    a {
      i {
        font-size: 1.4rem;
      }
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      user: "",
      icon: ""
    };
  },
  created() {
    this.user = this.$store.state.username;
    this.initIcon();
  },
  methods: {
    initIcon() {
      const temp = this.$store.state.icon;
      if (!temp) {
        this.icon = require("../../assets/img/default.png");
      } else {
        this.icon = temp;
      }
    }
  }
};
</script>