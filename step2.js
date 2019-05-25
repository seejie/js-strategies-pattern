// 同样的需求，更好的打开方式：策略模式实现
// 声明全局策略对象，建立不同的策略

// 策略对象
const strategies = {
  // 策略S
  'S': (name, salary) => {
    salary *= 10
    console.log(`${name}：年终奖 ${salary}`)
    return salary
  },
  // 策略B
  'B': (name, salary) => {
    salary *= 3
    console.log(`${name}：年终奖 ${salary}`)
    return salary
  },
  // 策略D
  'D': (name, salary) => {
    salary *= 0
    console.log(`${name}：年终奖 ${salary}`)
    return salary
  },
}

function $ ({name, salary, kpi}) {
  return strategies[kpi](name, salary)
}

const 小员工 = {
  name: '小明',
  salary: 5000,
  kpi: 'S',
}

const 老板 = {
  name: '张三',
  salary: 30000,
  kpi: 'B',
}

const 背锅侠 = {
  name: '李四',
  salary: 10000,
  kpi: 'D',
}

$(小员工) // 50000
$(老板) // 90000
$(背锅侠) // 0

// 优点：
// 1. 业务函数体$()代码量减少，条件分支被拆为不同的策略，互不影响
// 2. 每个人都可以在自己开辟的策略中写各自的逻辑，不用看别人的代码
// 3. 统一策略源，多出引用调用

// 思考：实际场景有哪些地方可以用到策略模式？