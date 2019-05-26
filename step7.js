const props = {
  a: String,
  b: [String, Number],
  c: {
    type: Number,
    require: true
  }
}

// 为了更友好的提示，更精准的定位，我把属性名加上
// 策略名称对应起来，c策略可以更细化
const strategies = {
  String: function(value, name){
    if(typeof value !== 'string') {
      return console.error("the type of variable："+ name + ' must be string')
    }
  },
  Number: function(value, name){
    if (!/number/.test(typeof value)){
      return console.error("the type of variable："+ name + ' must be number')
    }
  },
  require: function(value, name) {
    if (value === undefined) {
      return console.error("vriable："+ name + ' is require')
    } 
  }
}

function Vaildator (){
  this.cache = []
}

// 虽然上一步把所有属性全部添加到了策略缓存
// 但是我并没有区别对待 a, b, c 的情况
// b的情况我暂时没想明白，但是 a和c 看起来好像不难
// 随便写了几种判断变量类型的方法，百度一下有多种方法，各有利弊
// 满足现有需求就好，只写个demo验证一下策略模式，没打算写的很完善
// 算是模拟关联上了props的匹配关系
Vaildator.prototype.validate = function (data) {
  for (let attr in props) {
    let rule = props[attr];
    let value = data[attr];

    // 辨别 策略a 的写法
    if (typeof rule === 'function') {
      if (!value) return
      let ruleName = rule.name;
      this.cache.push(() => {
        return strategies[ruleName].apply(null, [value, attr])
      })

    // 辨别 策略c 的写法
    } else if (rule instanceof Object) {      
      if(rule.require) {
        if (!value) {
          this.cache.push(() => {
            return strategies.require.apply(null, [undefined, attr])
          })
        } else {
          let ruleName = props[attr].type.name
          this.cache.push(() => {
            return strategies[ruleName].apply(null, [value, attr])
          })
        }
      }
    }
  }
  
  return this.run()
}

Vaildator.prototype.run = function () {
  for(let i = 0, item; item = this.cache[i++];) {
    if (item()) return item();
  }
}

const data = {
  a: '123',
  // a: 123,
  // b: 'str',
  // b: 123,
  c: 123
  // c: '123'
}

const err = new Vaildator().validate(data);
err && console.log(err)