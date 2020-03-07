<template>
  <div>
    <div class="wrapper" @click="hide">
      <div class="user-icon-wrapper"></div>
      <div class="github-icon-wrapper"></div>
      <div class="wechat-icon-wrapper"></div>
      <div class="qq-icon-wrapper"></div>
    </div>
    <div class="Card" v-show="show">
      <a id="user-icon" class="pl-2" href="/index/xyz">
        <img src="../../assets/img/default.png" />
        <b-tooltip target="user-icon" triggers="hover">作者主页</b-tooltip>
      </a>
      <a id="github-icon" class="pl-2 icon" href="https://github.com/xuyaozu/" target="_blank">
        <i class="fa fa-github fa-2x" aria-hidden="true"></i>
        <b-tooltip target="github-icon" triggers="hover">Github</b-tooltip>
      </a>
      <a id="wechat-icon" class="pl-2 icon">
        <i class="fa fa-weixin fa-2x" aria-hidden="true"></i>
        <b-tooltip target="wechat-icon" triggers="hover">Wechat</b-tooltip>
      </a>
      <a id="qq-icon" class="pl-2 icon" href="https://user.qzone.qq.com/2589231996/" target="_blank">
        <i class="fa fa-qq fa-2x" aria-hidden="true"></i>
        <b-tooltip target="qq-icon" triggers="hover">QQ</b-tooltip>
      </a>
    </div>
  </div>
</template>


<style lang="scss" scoped>
div{
  .wrapper{
  float: left;
  cursor: pointer;
  writing-mode: vertical-lr;
  position: fixed;
  top: 180px;
  right: 40px;

  .user-icon-wrapper{
    float: left;
    width: 10px;
    height: 40px;
    background: peachpuff;
    opacity: 0.4;
  }

  .github-icon-wrapper{
    float: left;
    width: 10px;
    height: 38px;
    background: greenyellow;
    opacity: 0.4;
  }

  .wechat-icon-wrapper{
    float: left;
    width: 10px;
    height: 39px;
    background: plum;
    opacity: 0.4;
  }

  .qq-icon-wrapper{
    float: left;
    width: 10px;
    height: 40px;
    background: rgb(240, 41, 108);
    opacity: 0.4;
  }
}

.Card {
  position: fixed;
  margin-right: 0;
  writing-mode: vertical-lr;
  max-width: 44px;
  top: 180px;
  right: 0px;
  background: #acf3ff;
  opacity: 0.5;

  #user-icon {
    float: left;
    padding-top: 3px;
    padding-bottom: 3px;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
  }

  .icon {
    color: #abb8bd;
    float: left;
    padding-bottom: 3px;
    i {
      width: 36px;
      height: 36px;
    }
  }
}
}

</style>

<script>
export default {
  data() {
    return {
      show: true,
      icon: "../../assets/img/default.png"
    };
  },

  methods:{
    hide(){
      this.show = !this.show
      if(this.show){
        $('.wrapper').css('right', '40px')
      }else{
        $('.wrapper').css('right', '0px')
      }

    }
  }
};
</script>