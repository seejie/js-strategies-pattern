
const props = {
  a: String,
  b: Number,
  c: {
    type: Number,
    require: true
  }
}

// 还不知道如何上手，但是从字面意思，我先直接翻译一个策略对象
const strategies = {
  a: function(value){
    if (value === undefined) return
    if(typeof value !== 'string') {
      return console.error('value a must be string')
    }
  },
  b: function(value){
    if (value === undefined) return
    if (!/number/.test(typeof value)){
      return console.error('value b must be number')
    }
  },
  c: function(value) {
    if (value === undefined) {
      return console.error('this c value is require')
    } else if (value.constructor !== Number) {
      return console.error('value c must be number')
    }
  }
}

function Vaildator (){
  this.cache = []
}

// 我模拟一下for循环 把所有属性全部添加到策略缓存
Vaildator.prototype.validate = function (data) {
  for (let attr in props) {
    this.cache.push(() => strategies[attr].call(null, data[attr]))
  }
  
  return this.run()
}

Vaildator.prototype.run = function () {
  for(let i = 0, item; item = this.cache[i++];) {
    if (item()) return item();
  }
}

const data = {
  a: 111,
  // a: '111',
  b: 'str',
  // b: 123,
  // c: 123
  // c: '123'
}

const err = new Vaildator().validate(data);
err && console.log(err)