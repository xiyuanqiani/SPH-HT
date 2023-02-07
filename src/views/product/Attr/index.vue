<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>

    <el-card>
      <div v-show="isShowTable">
        <!-- 展示 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加与修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table border style="margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column
            prop="prop"
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里注意用row，而不是attrInfo.attrValueList -->
              <!-- 这里用到input和span来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确认删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)" >
                <!-- 此模板用到饿了么2.13，注意版本 -->
               <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 平台属性
      attrList: [],
      // 表格的切换
      isShowTable: true,
      // 添加与修改属性名/值
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，有多个
        ],
        categoryId: 0, //3级分类id
        categoryLevel: 3, //3级
      },
    };
  },
  methods: {
    // 自定义事件回调
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
        // 获取平台属性数据
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某一个属性的时候，可以在已有的属性值基础上新增属性值（把已有的属性id带上）
        valueName: "",
        // 每个属性值都添加一个flag，方便查看与编辑
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性回调
    addAttr() {
      // 控制表格显示与隐藏
      this.isShowTable = false;
      // 清空数据，获得3级id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，有多个
        ],
        categoryId: this.category3Id, //3级分类id
        categoryLevel: 3, //3级
      };
    },
    // 修改属性回调
    updateAttr(row) {
      this.isShowTable = false;
      // 数据里面存在对象里面套数组，数组里面套对象，需要使用深拷贝
      this.attrInfo = cloneDeep(row);
      // 修改某一个属性值时，加上flag这个标记
      // 由于flag不是响应式数据，视图无法更新，用$set
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 切换为查看模式
    toLook(row) {
      // 属性为空不能作为新的属性值
      if (row.valueName.trim() == "") {
        this.$message("请输入正常的属性值");
        return;
      }
      // 属性值不能重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 判断的时候需要把row从数组中去掉
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) return;

      row.flag = false;
    },
    // 切换为编辑模式，自动聚焦
    toEdit(row, index) {
      row.flag = true;
      // 对于浏览器而言，页面重绘和重排需要时间，span和input切换时间，所以不可能马上获取到input
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    //保存按钮
    async addOrUpdateAttr(){
      // 整理参数。1、为空的字段不应保存2、不应该出现flag
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag
          return true
        }
      })
      try {
       await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success',message:'保存成功'})
        this.getAttrList()
      } catch (error) {
        
      }
    }
  },
};
</script>

<style></style>
