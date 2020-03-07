<template>
  <div class="left-bar">
    <a href style="padding-bottom:1rem;">
      <img src="../../assets/img/default.png" />
    </a>
    <a href>
      <i class="fa fa-home" aria-hidden="true"></i>
    </a>
    <a>
      <i class="fa fa-cog" aria-hidden="true"></i>
    </a>
    <a href="">
      <i class="fa fa-bar-chart" aria-hidden="true"></i> 
    </a>
  </div>
</template>


<style lang="scss" scoped>
.left-bar {
  height: 100vh;
  width: 40px;
  margin-left: 2rem;
  text-align: center;
  padding-top: 2rem;
  a {
    display: block;
    padding-top: 1rem;
    img {
      display: block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    i{
        font-size: 1.2rem;
        color: grey;
    }

    i:hover{
        color:indianred;
    }
  }
}
</style>


<script>
export default {
  methods: {}
};
</script>