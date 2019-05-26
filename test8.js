const props = {
  a: String,
  b: [String, Number],
  // b: [String, Number, Boolean],
  c: {
    type: Number,
    require: true
  }
}


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
  },
  // 为了迎合 策略b 的情况，就写了新的策略
  oneOfTheType: function(value, name, types) {
    types.forEach((val, idx, arr) => {
      arr[idx] = val.name.toLowerCase()
    });
    const isOneOfTheType = types.includes(typeof value)
    if (!isOneOfTheType) {
      return console.error('vaiable：'+name+' must be one of the types')
    }
  }
}

function Vaildator (){
  this.cache = []
}

Vaildator.prototype.validate = function (data) {
  for (let attr in props) {
    let rule = props[attr];
    let value = data[attr];

    if (typeof rule === 'function') {
      if (!value) return
      let ruleName = rule.name;
      this.cache.push(() => {
        return strategies[ruleName].apply(null, [value, attr])
      })

    // 添加了 策略b 情况的判断
    } else if (rule.length) {

      this.cache.push(() => {
        return strategies.oneOfTheType.apply(null, [value, attr, rule])
      })
      
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
  a: 'str',
  // a: 123,
  // b: 'str',
  // b: 123,
  b: true,
  c: 123
  // c: 'str'
}

// 恩，这个可能是 initState(vm) 在created hook调用之前
// https://ustbhuangyi.github.io/vue-analysis/data-driven/new-vue.html
const err = new Vaildator().validate(data);
err && console.log(err)