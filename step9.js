// 恩，没看过vue关于props校验的源码
// 纯属个人对策略模式的理解，对props检验的一种猜测解读
// 若跟vue的实现方式雷同，纯属巧合，有了解的小伙伴可以补充
// 目的是为了能继续偷学大家的知识，跟大家交换一下

// 剩下的校验逻辑，我大概已经猜到了
// 附曾一个更全的版本，留给大家有兴趣的挑战一下吧
const props = {
  // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
  propA: Number,
  // 多个可能的类型
  propB: [String, Number],
  // 必填的字符串
  propC: {
    type: String,
    required: true
  },
  // 带有默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  // 带有默认值的对象
  propE: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return { message: 'hello' }
    }
  },
  // 自定义验证函数
  propF: {
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
}
