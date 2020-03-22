<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  props: ["radardata"],
  data() {
    return {
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
          }
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.radardata, this.options);
  }
};
</script>