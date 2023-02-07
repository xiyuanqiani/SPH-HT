<template>
  <div>
    <el-card>
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0">
      <!-- 三个不同的展示 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table border style="width: 100%" :data="records">
          <el-table-column
            label="序号"
            type="index"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="spu名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="spu描述"
            width="width"
          ></el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- hint-button是封装的 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="参看当前spu全部sku列表"
                @click="lookSkuList(row)"
              ></el-button> 
              <el-popconfirm title="这是一段内容确定删除吗?" @onConfirm="deleteSpu(row)" >
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                slot="reference"
              ></el-button>
              </el-popconfirm>   
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next,jumper,->,sizes,total"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" style="width: 100%" border  v-loading="loading">
        <el-table-column prop="skuName"  label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price"  label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight"  label="重量" width="width">
        </el-table-column>
        <el-table-column   label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      total: 0,
      // spu列表数据
      records: [],
      // 控制不同展示
      scene: 0,
      // 控制dialog展示
      dialogTableVisible:false,
      spu:{},
      // 存储的是sku列表
      skuList:[],
      loading:true,
    };
  },
  methods: {
    currentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    addSpu() {
      this.scene = 1;
      // 通知子组件SpuForm发请求，两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    editSpu(row) {
      this.scene = 1;
      // spuform子组件发请求不写在mounted中，因为mounted只能执行一次，v-show只是控制展示与消失
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件回调(spuform)
    changeScene({ scene, flag }) {
      this.scene = scene;
      // 子组件通知父组件回到场景0，再次发请求
      // flag是判断保存按钮是修改还是添加
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList(1);
      }
    },
    // 删除Spu
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'})
        this.getSpuList(this.records.length>1?this.page:this.page-1)
      }
    },
    // 添加sku回调
    addSku(row){
      this.scene = 2
      // 父组件调用子组件的方法，让子组件发请求，3个请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    // 自定义事件回调(skuform)
    changeScenes(scene){
      this.scene = 0
    },
    // 查看spu的sku列表
    async lookSkuList(spu){
      this.dialogTableVisible = true
      this.spu = spu
      let result =  await this.$API.spu.reqSkuList(spu.id)
      if(result.code==200){
        this.skuList = result.data
        this.loading =false
      }
    },
    //关闭dialog
    close(done){
      this.loading = true
      this.skuList = []
      done()

    }
  },
};
</script>

<style></style>
