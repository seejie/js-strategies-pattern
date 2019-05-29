// 需求：根据不同人的底薪和绩效考核，结算薪酬

function $ ({name, salary, kpi}) {
  // 常见实现方式:
  // if... else if... else...
  // if... if... if...
  // switch... case...
  // condition ? true : false

  if (kpi === 'A') {
    salary *= 5
  } else if (kpi === 'B') {
    salary *= 3
  } else if (kpi === 'C') {
    salary *= 1
  } else if (kpi === 'D') {
    salary *= 0
  } else if (kpi === 'S') {
    salary *= 10
  }

  console.log(`${name}: 年终奖 ${salary}`);
  return salary
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


// 优点：符合常规逻辑易懂，一眼能看明白（逻辑简单时）
// 思考：会有哪些问题？

// 缺点：
// 1. 逻辑复杂时，嵌套过多，函数体庞大，不易维护。后人维护前人代码，要小心不会影响祖传代码
// 2. 函数缺乏弹性，如果新增绩效考核kpi为 E 时，kpi系数改变时。遇到复杂逻辑更复杂
// 3. 一个系统，可能有多个页面需要计算薪酬，明智的人也许会提炼到utils供多个页面引用，通常 copy + paste 到各页面挖坑
// 4. 如果被多页面使用，且并没有统一引用，一朝规则改 contorl + F => contorl + replace all
// 5. 违反设计模式的：开闭原则