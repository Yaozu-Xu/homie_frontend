<template>
  <div id="calendar">
    <div class="calendar-header">
      <h2>Posting history</h2>
      <div class="calendar-selecter">
        <i class="fa fa-caret-left" aria-hidden="true" @click="monthBefore()"></i>
        <span>{{dayFormatter(current)}}</span>
        <i class="fa fa-caret-right" aria-hidden="true" @click="monthAfter()"></i>
      </div>
    </div>
    <div class="calendar-body">
      <b-row v-for="(row, index) in getMonthDays(current)" :key="index">
        <b-col v-for="(day, index1) in row" :key="index1">{{day}}</b-col>
      </b-row>
      <span>{{today}}</span>
    </div>
    <div class="calendar-bottom">
      <span>本月创作: 3天</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#calendar {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  display: flex;
  max-height: 300px;
  margin-bottom: 2rem;
  flex-direction: column;
  .calendar-header {
    display: flex;
    align-items: center;
    max-height: 3rem;
    padding-top: 0.5rem;
    .calendar-selecter {
      display: flex;
      align-items: center;
      padding-right: 1rem;
      padding-bottom: 0.4rem;
      span {
        color: grey;
        padding: 0 1rem 0 1rem;
      }
      i {
        color: gainsboro;
        cursor: pointer;
      }
      i:hover{
        color: indianred;
      }
    }
    h2 {
      padding: 0 2rem 0 1rem;
      font-size: 1rem;
    }
  }
  .calendar-body {
    margin-top: 1.5rem;
    color: #bbb7b7;
    .row {
      border-bottom: 1px solid rgba(25, 25, 25, 0.1);
      margin: 0 1rem 0 1rem;
    }
    span {
      padding: 1rem 0 0 1.2rem;
      display: block;
      color: grey;
    }
  }
  .calendar-bottom{
    margin: 1rem 0 1rem 1.2rem;
    span{
      font-weight: 400;
    }
  }
}

// 手机
@media screen and (max-width: 576px){
  #calendar{
    .calendar-header{
      h2{
        padding: 0 1rem 0 1rem;
      }
    }
    .calendar-body{
      .row{
        .col{
          padding-right: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 992px){
  #calendar{
    max-width: 78%;
  }
}
</style>

<script>
import { parseTimeStamp, parseToday } from "@/config/utils";

export default {
  data() {
    return {
      createTime: "2019-07-28",
      today: "",
      current: 0,
      calendaList: []
    };
  },

  created() {
    this.calendaList = parseTimeStamp(this.createTime);
    this.current = this.calendaList.length - 1;
    this.today = parseToday();
  },

  methods: {
    dayFormatter(current) {
      return this.calendaList[current]["month"];
    },

    getMonthDays(current) {
      let divide = 6;
      let show = [1, 2, 3, 4, 5, 6];
      let res = [];
      const days = this.calendaList[current]["days"];
      if (days <= 29) {
        divide = 7;
        show = [1, 2, 3, 4, 5, 6, 7];
      }
      res.push(show);
      const rows = Math.ceil(days / divide);
      for (let i = 1; i < rows; i++) {
        let temp = Array.from(res[res.length - 1], x => x + divide);
        res.push(temp.filter(x => x <= days));
      }
      return res;
    },

    monthAfter() {
      if (this.current < this.calendaList.length - 1) this.current++;
    },

    monthBefore() {
      if (this.current > 0) {
        this.current--;
      }
    }
  }
};
</script>