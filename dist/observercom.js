var mobx = require('./mobx');
var diff = require('./diff').default;
var autorun = mobx.autorun;
var toJS = require('./observer').toJSWithGetter;

var observercom = function (component) {
    // 获取生命周期
    component.lifetimes = component.lifetimes || {};
    component.methods = component.methods || {};
    component.pageLifetimes = component.pageLifetimes || {};
    // 组件生命周期
    var _ready = component.lifetimes.ready;
    var _detached = component.lifetimes.detached;
    // 获取页面生命周期
    var _pageShow = component.pageLifetimes.show;
    var _pageHide = component.pageLifetimes.hide;

    // 获取props
    var _props = component.props || {};
    delete component.props;
    // 更新数据源
    component.methods._update = function () {
        var diffProps = diff(toJS(_props), this.data.props || {});
        // diff后render改变
        if (Object.keys(diffProps).length > 0) {
            var hash = {};
            for (var key in diffProps) {
                var hash_key = 'props' + '.' + key;
                hash[hash_key] = diffProps[key];
            }
            this.setData(hash);
        }
    };

    // 重写ready方法
    component.lifetimes.ready = function () {
        this._autorun = autorun(() => {
            this._update();
        });
        _ready && _ready.apply(this);
    };

    component.lifetimes.detached = function () {
        this._autorun();
        this._autorun = null;
        _detached && _detached.apply(this);
    };

    // 重写Page show方法
    component.pageLifetimes.show = function () {
        this._autorun = autorun(() => {
            this._update();
        });
        _pageShow && _pageShow.apply(this);
    };

    // 重写Page hide方法
    component.pageLifetimes.hide = function () {
        this._autorun();
        _pageHide && _pageHide.apply(this);
    };

    return component;
};

module.exports = {
    observercom: observercom
};
