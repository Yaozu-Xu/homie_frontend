<template>
  <b-container class="m-0 p-0 main" fluid>
    <leftSideBar></leftSideBar>
    <div class="body-container">
      <div class="body-area">
        <analysisDiv></analysisDiv>
        <settingDiv></settingDiv>
      </div>
      <calendar></calendar>
    </div>
  </b-container>
</template>

<style lang="scss">
body {
  background: #f8fafb;
}
</style>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  .body-container {
    margin-top: 10%;
    display: flex;
    .body-area {
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow-y: scroll;
    }
  }
}

// 电脑屏幕
@media screen and (min-width: 992px) {
  .main {
    .body-container {
      flex-direction: row;
      margin: 6% 2rem 0 2rem;
      .body-area {
        flex: 1;
        margin-right: 2rem;
      }
    }
  }
}

// mobile
@media screen and (max-width: 768px) {
  .main {
    .body-container {
      .body-area {
        max-width: 78%;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .main {
    .body-container {
      align-items: center;
      flex-direction: column;
      .body-area {
        max-width: 80%;
        margin: 0 0 3rem 0;
      }
    }
  }
}
</style>


<script>

import leftSideBar from "@/components/admin/left_side_bar";
import calendar from "@/components/admin/calendar";
import analysisDiv from "@/components/admin/analysis_div";
import settingDiv from "@/components/admin/setting_div";

export default {
  components: {
    leftSideBar,
    calendar,
    analysisDiv,
    settingDiv
  },
};
</script>