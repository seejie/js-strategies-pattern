
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
    if(typeof value !== 'string') {
      return console.error('value must be string')
    }
  },
  b: function(value){
    if (!/number/.test(typeof value)){
      return console.error('value must be number')
    }
  },
  c: function(value) {
    if (value === undefined) {
      return console.error('this value is require')
    } else if (value.constructor !== Number) {
      return console.error('value must be number')
    }
  }
}

function Vaildator (){
  this.cache = []
}

// vue里没有链式调用，链式调用也可以更自动化一下就更好
// 因此我模拟一下，for循环 把所有属性全部添加到策略缓存
// 因为不使用链式调用，而且我把所有属性都自动添加好了
// 最后改为自动运行，改个名字，岂不更逼真
Vaildator.prototype.validate = function (data) {
  for (let attr in data) {
    this.cache.push(() => {
      return strategies[attr].apply(null, [data[attr], attr])
    })
  }
  
  return this.run()
}

Vaildator.prototype.run = function () {
  for(let i = 0, item; item = this.cache[i++];) {
    if (item()) return item();
  }
}

const data = {
  a: '111',
  // b: 'str',
  // b: 123,
  // c: 123
  c: '123'
}

const err = new Vaildator().validate(data);
err && console.log(err)