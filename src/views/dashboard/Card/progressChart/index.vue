<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let progressCharts = echarts.init(this.$refs.charts);
    progressCharts.setOption({
      xAxis: {
        show: false,
        // 最大值与最小值设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        // 使柱状图横过来
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "cyan",
          // 柱状图宽度
          barWidth: 10,
          // 背景颜色设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本标签
          label: {
            show: true,
            //改变文本内容
            formatter: "|",
            // 位置
            position: "right",
          },
        },
      ],
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
