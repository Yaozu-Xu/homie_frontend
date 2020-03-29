<template>
  <div class="ans-container" id="analysis">
    <div class="ans-chart">
      <BarChart v-if="loaded" :chartdata="chartData"></BarChart>
    </div>
    <div class="ans-chart">
      <RadarChart v-if="loaded" :radardata="radarData"></RadarChart>
    </div>
    <div class="ans-chart">
      <PieChart v-if="loaded" :piedata="pieData"></PieChart>
    </div>
  </div>
</template>

<style lang="scss">
#bar-chart {
  max-height: 400px;
  max-width: 400px;
  margin: 0 auto;
}

#radar-chart {
  margin: 0 auto;
  max-height: 400px;
  max-width: 400px;
}

#pie-chart {
  margin: 0 auto;
  max-height: 400px;
  max-width: 400px;
}
</style>

<style lang="scss" scoped>
.ans-container {
  background: #fff;
  border-radius: 4px 4px 0 0;
  width: 100%;
  overflow-y: scroll;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  .ans-chart {
    padding: 1rem;
  }
}

@media screen and (min-width: 360px) {
  .ans-container {
    max-height: 280px;
  }
}

@media screen and (min-width: 992px) {
  .ans-container {
    max-height: 420px;
  }
}
</style>

<script>
import Apis from "@/service/api";
import { analysisApi } from "@/service/api";
import BarChart from "./BarChart";
import RadarChart from "./RadarChart";
import PieChart from "./PieChart";

export default {
  components: {
    BarChart,
    RadarChart,
    PieChart
  },
  data() {
    return {
      uid: "",
      loaded: false,
      radarData: null,
      pieData: null
    };
  },
  created() {
    this.uid = this.$store.state.id;
    this.initData();
  },
  methods: {
    async initRadar() {
      try {
        const res = await Apis.getOnesCategory(this.uid);
        const radarlabel = [];
        const radarcount = [];
        const categoryList = res.data;
        categoryList.forEach(obj => {
          radarlabel.push(obj.cName);
          radarcount.push(obj.publish.length);
        });
        this.radarData = {
          labels: radarlabel,
          datasets: [
            {
              label: "写作分类数对比",
              data: radarcount,
              backgroundColor: "rgba(54, 162, 235, 0.2)"
            }
          ]
        };
      } catch (error) {
        console.log(error);
      }
    },
    async initPieChart() {
      try {
        const res = await analysisApi.getWritingStamp(this.uid);
        this.pieData = {
          labels: ["早晨写作", "下午写作", "晚上写作"],
          datasets: [
            {
              data: res.map,
              backgroundColor: [
                "rgba(255, 255, 0, 0.6)",
                "rgba(220, 20, 60, 0.6)",
                "rgba(0, 191, 255, 0.6)"
              ]
            }
          ]
        };
        this.chartData = {
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          datasets: [
            {
              label: "月写作柱状图",
              maxBarLength: 300,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              data: res.bar
            }
          ]
        };
      } catch (error) {
        console.log(error);
      }
    },
    async initData() {
      await this.initRadar();
      await this.initPieChart();
      this.loaded = true;
    }
  }
};
</script>