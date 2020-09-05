// 组合策略模式：better coding style

const strategies = {
  // 策略：不能为空
  isNotEmpty: (value, errMsg) => { 
    // 三目改写成了一行，可是之前没有 else 会 return 什么？
    // js函数没有显式 return 语句
    // js解析器会自动在函数末尾隐式添加 return undefined
    return value === '' ? errMsg : undefined
  },
  // 策略：最小长度限制
  minLength: (value, length, errMsg) => {
    return value.length < length ? (errMsg + length) : undefined
  },
  // 策略：手机格式判断
  isMobile: (value, errMsg) => {
    return !/^1[0-9]{10}$/.test(value) ? errMsg : undefined
  }
}

// 策略组合对象
function Validate () {
  // 缓存策略
  this.cache = []
}

// 添加新策略
Validate.prototype.add = function(data, rule, errMsg) {
  let arr = rule.split(':')
  this.cache.push(() => {
    let rule = arr.shift()
    arr.unshift(data)
    arr.push(errMsg)
    return strategies[rule].apply(null, arr)
  })
  // 把自己 return 回去，就可以完成链式调用了
  return this
}

// 逐一执行缓存的策略
Validate.prototype.run = function () {
  // 根据某本算法书说，这样写时间空间复杂度最低
  // 这样写连长度都不用计算，也不用做长度比较
  // 但是 eslint 规则 for循环 里不允许赋值和运算同时进行
  // 不适用全部场景，数组元素强转布尔值不能为false
  // for (let i = 0; rule < this.cache.length; i++) {
  // for (let i = 0, len = this.cache.length; i < len; i++) {
  for (let i = 0, rule; rule = this.cache[i++];) {
    let msg = rule()
    if (msg) return msg
  }
}

// vm.$data
const from = {
  // username: '',
  username: 'admin',
  password: 'admin',
  // password: 'abcdef',
  // password: '12345678',
  // tel: '18888888888',
  tel: '1234567890'
}

// before submit hook/event
// 创建实例对象省去，pipe链式调用
const errMsg = new Validate()
  .add(from.username, 'isNotEmpty', '用户名不能为空')
  .add(from.password, 'minLength:6', '密码长度不能小于')
  .add(from.tel, 'isMobile', '手机格式不符合')
  .run()

// 短路运算，省去if判断
// webpack打包出来的js会把 某些if运算 压缩成短路运算；把某些 if else 运算 压缩成三目运算
errMsg && console.log(errMsg)

// 思考：
// vue中哪里用到了策略模式？恩，似曾相识的props校验
const props = {
  a: String,
  b: [String, Number],
  c: {
    type: Number,
    require: true
  }
}

// props是用于父传子的属性，子组件可以编写校验规则，不符合规则的vue在运行时会报错提示
// 这里props可以看做策略模式中的策略对象
// a,b,c可以看做策略对象中的策略，名字当然可以随便取