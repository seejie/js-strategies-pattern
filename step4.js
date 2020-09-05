// 组合策略模式：better coding style

const strategies = {
  // 策略：不能为空
  isNotEmpty: (value, errMsg) => { 
    if (value === '') {
      return errMsg
    }
  },
  // 策略：最小长度限制
  minLength: (value, length, errMsg) => {
    if (value.length < length) {
      return errMsg + length
    }
  },
  // 策略：手机格式判断
  isMobile: (value, errMsg) => {
    if (!/^1[0-9]{10}$/.test(value)) {
      return errMsg
    }
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
}

// 逐一执行缓存的策略
Validate.prototype.run = function () {
  for (let i = 0; i < this.cache.length; i++) {
    let msg = this.cache[i]();
    if (msg) return msg;
  }
}

// vm.$data
const from = {
  username: '',
  // username: 'admin',
  password: 'admin',
  // password: 'abcdef',
  tel: '1234567890'
  // tel: '18888888888',
}

// before submit hook/event
const validatePipe = new Validate()
validatePipe.add(from.username, 'isNotEmpty', '用户名不能为空')
validatePipe.add(from.password, 'minLength:6', '密码长度不能小于')
validatePipe.add(from.tel, 'isMobile', '手机格式不符合')
const errMsg = validatePipe.run()
if (errMsg) {
  console.log(errMsg)
}


// 优点：
// 1. vendor.js直引用一个策略对象，webpack打包js体积减少
// 2. 易于扩展，不区分框架，jquery，vue，react，node都可以使用
// 3. 全局把控，查找方便，项目里的所有策略都可以看到。不会出现：哎，我之前有一个地方用到这个判断了，在哪来着，我找找
// 4. 业务函数体更易读，清晰可见所有的策略

// 思考：
// 1. vaildatePipe虽然叫pipe，不能链式调用，显得有点low
// 2. 代码洁癖患者：也许还能有优化的空间吧