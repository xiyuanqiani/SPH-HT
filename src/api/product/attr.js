// 平台属性管理模块
import request from '@/utils/request.js'

// 1级分类
export const  reqCategory1List = () => request({url:'/admin/product/getCategory1',method:'get'})
// 2级分类
export const reqCategory2List = (category1Id) => request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
// 3级分类
export const reqCategory3List = (category2Id) => request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

//获取平台属性数据
export const reqAttrList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加或修改属性名与属性值
export const reqAddOrUpdateAttr = (data) => request({url:'/admin/product/saveAttrInfo',method:'post',data})