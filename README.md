# mp-cz-mobx
基于 三方库 https://github.com/dao42/wechat-weapp-mobx，增加组件的数据绑定

Fixed:
observer.js: 86行(如果传入的没有props，会mobx报错)
    var _props = mobx.observable(page.props) || {};
修改为
    var _props = mobx.observable(page.props || {}) || {};
