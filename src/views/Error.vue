<template>
  <div class="main">
    <p>
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </p>
    <p>迷路啦(´･ω･`)</p>
    <a href="/">回到主页</a>
  </div>
</template>

<style lang="scss">
body {
  background-color: #ececec;
  font-family: "Open Sans", sans-serif;
  color: #3c3c3c;
}
</style>

<style lang="scss" scoped>
.main {
  margin-top: 20%;
  p:first-child {
    text-align: center;
    span {
      text-align: center;
      font-family: cursive;
      font-size: 10rem;
      font-weight: bold;
      line-height: 6rem;
      letter-spacing: 0.5rem;
      color: #fff;
    }
  }
  p:not(:first-child) {
    margin-top: 4rem;
    text-align: center;
    color: #666;
    font-family: cursive;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    line-height: 2em;
  }
  a {
    margin-top: 4rem;
    font-size: 1.2rem;
    text-align: center;
    display: block;
    font-weight: bolder;
    color: #0f1516;
  }
}
</style>


<script>
export default {};
</script>