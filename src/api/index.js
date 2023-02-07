// 将四个模块请求接口统一暴露
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'

// 引入权限管理接口
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
export default {
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission
}
