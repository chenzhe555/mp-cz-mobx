# mp-cz-mobx
</br>基于三方库 https://github.com/dao42/wechat-weapp-mobx</br>
1.增加组件的数据绑定</br>
2.修复部分问题,见Fixed</br>

</br>Fixed</br>
1.</br>
observer.js: 86行(如果传入的没有props，会mobx报错)</br>
    var _props = mobx.observable(page.props) || {};</br>
修改为</br>
    var _props = mobx.observable(page.props || {}) || {};

