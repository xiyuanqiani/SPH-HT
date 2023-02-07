<template>
  <el-card class="box-card" style="margin:10px 0">
  <div slot="header" class="clearfix">
    <!-- @tab-click="handleClick" -->
    <!-- 头部左侧内容 -->
    <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
    </el-tabs>
    <!-- 头部右侧内容 -->
    <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- ！！！！！！！！！！！！日期数据回显，value-format格式要和传来的格式一样 -->
          <el-date-picker
            v-model="date"
            class="date"
            size="mini"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            
            >
        </el-date-picker>
    </div>
  </div>
    <div>
        <el-row :gutter="10">
            <el-col :span="18">
                <!-- 容器 -->
                <div class="charts" ref="charts"></div>
            </el-col>
            <el-col :span="6">
                <h3>门店{{title}}排名</h3>
                <ul>
                    <li>
                        <span class="rindex">1</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span class="rindex">2</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span class="rindex">3</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span >4</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span >5</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span >6</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                    <li>
                        <span >7</span>
                        <span>肯德基</span>
                        <span>266235</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</el-card>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            activeName:'sale',
            myCharts:null,
            // 收集日历时间
            date:[]
        }
    },
    mounted() {
         this.myCharts = echarts.init(this.$refs.charts)
        this.myCharts.setOption({
            title:{
                text:this.title+"趋势"
            },
            tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: []
    }
  ]
        })
    },
    computed:{
        title(){
            return this.activeName=='sale'?'销售额':'访问量'
        },
        ...mapState({
            listState:state=>state.home.list
        })
    },
    watch:{
        title(){
            // 重新修改图表配置数据
            // 图表配置数据可以再次更改，如果有新的数值就用，没有就还是以前的
            this.myCharts.setOption({
                title:{
                    text:this.title
                },
                xAxis:{
                    data:this.title=='销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
                },
                series:[
                    {
                       name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear
                    }
                ]
            })
        },
        // ??????????为什么监听listState
        // mounted没有数据，因此不显示，监听
        listState(){
            this.myCharts.setOption({
                xAxis:{
                    data:this.listState.orderFullYearAxis
                },
                series:[
                    {
                        data:this.listState.orderFullYear
                    }
                ]
            })
        }
    },
    methods: {
        setDay(){
            const day = dayjs().format('YYYY-MM-DD')
            this.date = [day,day]
        },
        setWeek(){
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date=[start,end]
        },
        setMonth(){
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start,end]
        },
        setYear(){
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start,end]
        }

    },
}
</script>

<style scoped>
.el-card__header{
    border-bottom: none;
}
.clearfix{
    display: flex;
    justify-content: space-between;
    position: relative;
}
.tab{
    width: 100%;
}
.right{
    position: absolute;
    right: 0;
}
.date{
    width: 220px !important;
    margin: 0 20px !important;
}
.right span{
    margin: 0 10px;
}
.charts{
    width: 100%;
    height: 300px;
}
ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}
ul li {
    height: 8%;
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
}
.rindex{
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
    color: #fff;
    text-align: center;
}
</style>