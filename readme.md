# 手摸手，带你走进JavaScript的设计模式之策略模式：探索vue的props验证原理

---
### 思考

1. 什么是设计模式？

const whatIsDesignPattern = '%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%EF%BC%88Design%20Pattern%EF%BC%89%E6%98%AF%E4%B8%80%E5%A5%97%E8%A2%AB%E5%8F%8D%E5%A4%8D%E4%BD%BF%E7%94%A8%E3%80%81%E7%BB%8F%E8%BF%87%E5%88%86%E7%B1%BB%E7%9A%84%E3%80%81%E4%B8%8D%E5%8C%BA%E5%88%86%E5%BC%80%E5%8F%91%E8%AF%AD%E8%A8%80%E7%9A%84%E3%80%81%E4%BB%A3%E7%A0%81%E8%AE%BE%E8%AE%A1%E7%BB%8F%E9%AA%8C%E7%9A%84%E6%80%BB%E7%BB%93%E3%80%82'

decodeURI(whatIsDesignPattern)

2. 设计模式是用来干嘛的？

const thePurposeOfUsingDesignPattern = '%E4%B8%BA%E4%BA%86%E4%BB%A3%E7%A0%81%E5%8F%AF%E9%87%8D%E7%94%A8%E6%80%A7%E3%80%81%E8%AE%A9%E4%BB%A3%E7%A0%81%E6%9B%B4%E5%AE%B9%E6%98%93%E8%A2%AB%E4%BB%96%E4%BA%BA%E7%90%86%E8%A7%A3%E3%80%81%E4%BF%9D%E8%AF%81%E4%BB%A3%E7%A0%81%E5%8F%AF%E9%9D%A0%E6%80%A7%E3%80%82'

decodeURI(thePurposeOfUsingDesignPattern)

3. 接触过哪些js设计模式？（举例、场景）

const commonDesignPattern = 'js%E5%BC%80%E5%8F%91%E4%B8%AD%E5%B8%B8%E8%A7%81%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%EF%BC%9A%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E3%80%81%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E3%80%81%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F%E3%80%81%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F%E3%80%81%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F%E3%80%81%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F%E3%80%81%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F%E7%AD%89%E7%AD%89'

decodeURI(commonDesignPattern)

4. 是否了解策略模式？

<https://www.runoob.com/design-pattern/strategy-pattern.html>


---
### 目录

1. 先决知识预热
    - step0.js
2. 常见场景回顾
    - step1.js
3. 初识策略模式
    - step2.js  
4. 表单验证演示
    - step3.js
5. 策略模式改进
    - step4.js
    - step5.js
6. 探索vue props校验原理
    - step6.js
    - step7.js
    - step8.js
    - step9.js

