<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu >
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item >双皮奶</el-dropdown-item>
            <el-dropdown-item >蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineChart />
        </el-col>
        <el-col :span="12">
          <lineChart />
        </el-col>
      </el-row>
      <el-table style="width: 100%" border :data="tableData">
    <el-table-column  label="排名"  type="index"   width="180">
    </el-table-column>
    <el-table-column  label="搜索关键字" width="180">
    </el-table-column>
    <el-table-column label="用户数" sortable >
    </el-table-column>
    <el-table-column label="周涨幅" sortable >
    </el-table-column>
  </el-table>
  <el-pagination
  class="pagination"
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineChart from "./lineChart";
export default {
  data() {
    return {
      tableData:[{}]
    }
  },
  components: {
    lineChart,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.pagination{
  float: right;
}
</style>
