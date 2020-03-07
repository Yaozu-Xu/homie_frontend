<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>


<style>

html{
  scroll-behavior: smooth;
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  cursor: pointer;
}
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}

div{
  margin: 0;
  padding: 0;
}

</style>
