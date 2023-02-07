<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格
        data表格将来要展示的数据，数组类型
        border边框
        lable显示标题
        width宽度
        align对齐方式
        type对应列类型
        prop对应列内容的字段名，
     -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 作用域插槽  row回传的数据-->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 
     current-page当前页数
     total总的数据条数
     page-size每页展示多少数据
     page-sizes代表可以设置每页展示多少条数据
     page-count代表多少个真实按钮，减去开头和结尾就是中间连续按钮个数
     @current-change=>currentPage 改变时会触发
     @size-change => pageSize 改变时会触发
     layout布局
     -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :page-count="7"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next,jumper,->,sizes,total"
    >
    </el-pagination>

    <!-- 对话框 
    visible.sync控制对话框显示与隐藏
    -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 表单信息 model收集表单信息 -->
      <!-- 只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- 这里logo收集信息，不能用v-model
        action图片上传地址
        on-success:图片上传成功
        before-upload：图片上传前
         -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义校验
    var validateTmName = (rule, value, callback) => {
        if(value.length<2||value.length>10){
          callback(new Error('品牌名称2~10位'))
        }else{
          callback()
        }
      };
    return {
      // 当前页数
      page: 1,
      // 每页展示条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表数据
      list: [],
      //   对话框显示与隐藏
      dialogFormVisible: false,

      //收集表单信息.对象身上的属性不能乱写，需要看文档
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      // 表单验证
      rules: {
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            // 自定义校验规则
            { validator: validateTmName, trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌的图片',  }
          ],
    },
    }
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      // 默认为1，当不为1，将参数给page
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 当需要改变每页展示的数据条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 显示添加对话框
    showDialog() {
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = {tmName:'',logoUrl:''}
    },
    // 显示修改对话框
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      //当前用户选中这个品牌的信息
      // 浅/深拷贝？？？？？？？？
      this.tmForm = {...row}
    },
    // 上传图片相关的回调
     handleAvatarSuccess(res, file) {
      // res上传成功后返回前端的数据
      // file上传成功后服务器返回前端数据
        this.tmForm.logoUrl = res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 确定（添加或修改品牌）
       addOrUpdateTradeMark(){
        // 当全部字段验证成功，才进行业务逻辑
        this.$refs.ruleForm.validate(async(success)=>{
          // 如果成功
        if(success){
           this.dialogFormVisible = false
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
            // console.log(result);
            if(result.code==200){
              // 弹出信息
              this.$message({
              type:'success',
              message:this.tmForm.id?'修改品牌成功':'添加品牌成功'
          })
          // 添加品牌停留在第一页，修改留着当前页
            this.getPageList(this.tmForm.id?this.page:1)
        }
        }else{
          console.log('error submit!!');
            return false;
        }
        })
      },
      //删除品牌
      deleteTradeMark(row){
        //  弹框
        this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
         let result =  await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code==200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });   
          }
          this.getPageList(this.list.length>1?this.page:this.page-1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      
      }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
