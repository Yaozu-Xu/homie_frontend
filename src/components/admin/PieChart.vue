<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["piedata"],
  mounted() {
    this.renderChart(this.piedata);
  }
};
</script>