// 引入登录、退出登录。获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token、设置token、删除token的接口函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块中重置路由的方法
import { resetRouter,asyncRoutes,anyRoutes,constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: '',
    // 存储用户头像
    avatar: '',
    routes:[],
    buttons:[],
    roles:[],
    resultAsyncRoutes:[],
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO:(state,userInfo)=>{
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限标记
    state.buttons = userInfo.buttons
    // 角色标记
    state.roles = userInfo.roles
  },
  // 最终计算出的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    // 保存当前用户的异步路由，注意一个用户不止展示异步路由，需要合并
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数，对比出当前用户到底哪些显示异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  // 过滤出当前用户需要展示的异步路由
  return asyncRoutes.filter(item=>{
    // 数组当中没有这个元素返回索引值-1，如果有返回的一定不是-1
    if(routes.indexOf(item.name)!=-1){
      // 递归，还有2,3,4.。。等路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true;
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if(result.code==20000){
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：返回的数据包含：用户名name，用户头像avatar，routes：[返回的标志，不同的用户应该返回不同的标志]、roles用户角色信息，buttons[按钮权限信息]
        const { data } = response
        // 存储用户全部信息
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

