// 常见场景：表单提交

// from 表单
const from = {
  username: 'amdin',
  password: 'admin',
  tel: '188xxxx888',
  email: '',
  // ...
}

// 登陆页
function loginPage () {
  if (from.username === '') {
    // 必填项
    // 设置input框聚焦
    // 设置input框变为红色
    // alert提示或者input框下红字提示
    return 
  }
  if (from.password.length < 6) {
    // 长度过短
    // ...
    return
  }
  submitFrom();
}

// 注册页
function loginPage () {
  if (from.username === '') {
    // 必填项
    // 设置input框聚焦
    // 设置input框变为红色
    // alert提示或者input框下红字提示
    return 
  }
  if (from.password.length <= 6) {
    // 长度过短
    // ...
    return
  }
  // 正则匹配电话号码格式
  if (from.tel){ return }
  // 正则匹配邮箱格式
  if (from.email){ return }
  // ...
  submitFrom();
}

// 用户信息修改页
function loginPage () {
  if (from.username === '') {
    // 必填项
    // 设置input框聚焦
    // 设置input框变为红色
    // alert提示或者input框下红字提示
    return 
  }
  if (from.password.length <= 6) {
    // 长度过短
    // ...
    return
  }
  // 正则匹配电话号码格式
  if (from.tel){ return }
  // 正则匹配邮箱格式
  if (from.email){ return }
  // ...
  submitFrom();
}

// 项目中弥漫着copy + paste，写登录页去注册页复制，写修改页去登陆页复制
// vendor.js 被webpack打包3遍，js体积较大
// 优化方式：统一封装业务组件，多处引用；或封装utils公共函数
// node提供接口，要再写一遍

// 思考：策略升级，如何用策略模式重构？