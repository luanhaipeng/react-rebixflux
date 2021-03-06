(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRebixflux"] = factory(require("react"));
	else
		root["ReactRebixflux"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
var keysFunc = Object.keys;

var undefinedOnly = false;
function objectAssign(obj) {

    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!undefinedOnly || obj[key] === undefined) {
                obj[key] = source[key];
            }
        }
    }
    return obj;
}

function createIsType(type) {
    return function (x) {
        return Object.prototype.toString.call(x) === '[object ' + type + ']';
    };
}

var extend = Object.assign || objectAssign;

exports.extend = extend;
var isArray = Array.isArray || createIsType('Array');

exports.isArray = isArray;
var isFunction = createIsType('Function');

exports.isFunction = isFunction;
var isString = createIsType('String');

exports.isString = isString;
var forEach = function forEach(obj, it) {
    if (isArray(obj)) {
        Array.prototype.forEach.call(obj, it);
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                it(value, key);
            }
        }
    }
};
exports.forEach = forEach;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var EventBus = __webpack_require__(2);

var ActionEvent = "ActionEvent";
exports.ActionEvent = ActionEvent;
var CommandEvent = "CommandEvent";

exports.CommandEvent = CommandEvent;
exports["default"] = new EventBus("ActionDispatcher", function (listener, m1, m2, m3, m4, m5) {

    try {
        listener(m1, m2, m3, m4, m5);
    } catch (e) {
        console.log(e);
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PRIVATE_LISTENERS_NAME = "$$listeners$$";
var PRIVATE_LISTENER_WRAPPER = 'listenerWrapper';

function EventBusClass(name, listenerWrapper) {
    var that = this;
    that.name = name;
    that[PRIVATE_LISTENER_WRAPPER] = listenerWrapper;
    that[PRIVATE_LISTENERS_NAME] = [];
}

var EventBusClassPrototype = EventBusClass.prototype;

EventBusClassPrototype.on = function (eventName, listener) {
    this[PRIVATE_LISTENERS_NAME].push({
        eventName: eventName,
        listener: listener
    });
};

EventBusClassPrototype.off = function (eventName, listener) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var result = [];
    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener === listener) {
            //skip
        } else {
                result.push(m);
            }
    }
    that[PRIVATE_LISTENERS_NAME] = result;
};

EventBusClassPrototype.emit = function (eventName, m1, m2, m3, m4, m5) {
    var that = this;
    var listeners = that[PRIVATE_LISTENERS_NAME];
    var listenerWrapper = that[PRIVATE_LISTENER_WRAPPER];

    for (var i = 0; i < listeners.length; i++) {
        var m = listeners[i];
        if (m.eventName === eventName && m.listener) {
            if (listenerWrapper) {
                listenerWrapper(m.listener, m1, m2, m3, m4, m5);
            } else {
                m.listener(m1, m2, m3, m4, m5);
            }
        }
    }
};

module.exports = EventBusClass;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toArray = toArray;

function toArray(aaa) {
    if (!aaa) {
        return [];
    }

    var argsArray = Array.prototype.slice.call(aaa);
    var args = [].concat(argsArray);
    return args;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toFirstCharUpper = toFirstCharUpper;
exports.startWith = startWith;

function toFirstCharUpper(str) {
    return str.replace(/(^|\s+)\w/g, function (s) {
        return s.toUpperCase();
    });
}

function startWith(str, prefix) {
    str = "" + str;
    return str.indexOf(prefix) === 0;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = shallowEqual;

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createStore = createStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsActionDispatcher = __webpack_require__(1);

var _utilsActionDispatcher2 = _interopRequireDefault(_utilsActionDispatcher);

var _utilsStringUtils = __webpack_require__(4);

var _utilsArrayUtils = __webpack_require__(3);

var _utilsFunctions = __webpack_require__(0);

var EventBus = __webpack_require__(2);

var EVENT_STORE_CHANGE = 'StoreChange';
exports.EVENT_STORE_CHANGE = EVENT_STORE_CHANGE;
var STORE_CLASS_NAME = 'RebixfluxStore';

exports.STORE_CLASS_NAME = STORE_CLASS_NAME;
function getReducer(storeConfig, actionEvent, prefix) {
    var actionName = actionEvent.actionName;
    var actionGroup = actionEvent.actionGroup;

    var reducerReceiveName = prefix + (0, _utilsStringUtils.toFirstCharUpper)(actionName); //onXXX or onCmdXXX
    if (prefix === 'onCmd') {
        return storeConfig[reducerReceiveName];
    }

    var forAction = storeConfig.forAction;

    var reducer = null;
    if (actionGroup === forAction) {
        reducer = storeConfig[reducerReceiveName];
        if (reducer) {
            return reducer;
        }
    }

    //形如:post#onGetPostList
    var reducerReceiveName2 = actionGroup + "#" + reducerReceiveName;
    reducer = storeConfig[reducerReceiveName2];
    if (reducer) {
        return reducer;
    }

    return null;
}

function handleActionOrCommandEvent(that, actionEvent, prefix) {
    var reducer = getReducer(that.$$storeConfig, actionEvent, prefix);
    if (reducer) {
        var result = reducer(that.$$state, actionEvent);
        if (result && that.$$state !== result) {
            that.$$state = result;
            that.$$eventBus.emit(EVENT_STORE_CHANGE, {}, that);
        }
    }
}

/**
 * 创建一个真正执行的时候调用的Get函数
 * @param getterDef 用户配置的以get开否的函数实现
 * @param that
 * @returns {Function}
 */
function createGetterFunction(getterDef, that) {
    return function () {
        var args0 = (0, _utilsArrayUtils.toArray)(arguments);
        //每次执行,都是获取最新的state
        var state = that.$$state;
        var context = (0, _utilsFunctions.extend)({}, that, { state: state });
        return getterDef.apply(context, args0);
    };
}

function buildGetMethod(that, storeConfig) {
    for (var methodName in storeConfig) {
        if (storeConfig.hasOwnProperty(methodName)) {
            if ((0, _utilsStringUtils.startWith)(methodName, 'get') || (0, _utilsStringUtils.startWith)(methodName, 'is') || (0, _utilsStringUtils.startWith)('has')) {
                var handler = storeConfig[methodName];
                that[methodName] = createGetterFunction(handler, that);
            }
        }
    }
}

function RebixfluxStoreClass(storeConfig) {

    if (!storeConfig) {
        throw new Error('NullPointer');
    }

    var initialState = storeConfig.initialState || {};
    var that = this;
    that.$$storeConfig = storeConfig;
    that.$$ClassName = STORE_CLASS_NAME;
    that.$$eventBus = new EventBus('StoreEventBus');
    that.$$state = initialState; //extend({}, initialState);

    that.$$handleActionEvent = function (actionEvent) {
        handleActionOrCommandEvent(that, actionEvent, 'on');
    };
    that.$$handleCommandEvent = function (commandEvent) {
        handleActionOrCommandEvent(that, commandEvent, 'onCmd');
    };

    that.getState = function () {
        return that.$$state;
    };

    that.addChangeListener = function (listener) {
        that.$$eventBus.on(EVENT_STORE_CHANGE, listener);
    };

    that.removeChangeListener = function (listener) {
        that.$$eventBus.off(EVENT_STORE_CHANGE, listener);
    };

    that.enableListener = function () {
        _utilsActionDispatcher2['default'].on(_utilsActionDispatcher.ActionEvent, that.$$handleActionEvent);
        _utilsActionDispatcher2['default'].on(_utilsActionDispatcher.CommandEvent, that.$$handleCommandEvent);
    };
    that.disableListener = function () {
        _utilsActionDispatcher2['default'].off(_utilsActionDispatcher.ActionEvent, that.$$handleActionEvent);
        _utilsActionDispatcher2['default'].off(_utilsActionDispatcher.CommandEvent, that.$$handleCommandEvent);
    };

    buildGetMethod(that, storeConfig);
    that.enableListener();
}

function createStore(storeConfig) {
    return new RebixfluxStoreClass(storeConfig);
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createPureComponent = createPureComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _utilsShallowEqual = __webpack_require__(5);

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

function shallowCompare(component, nextProps, nextState) {
    return !(0, _utilsShallowEqual2['default'])(component.props, nextProps) || !(0, _utilsShallowEqual2['default'])(component.state, nextState);
}

function createPureComponent(renderFunction) {
    return _react2['default'].createClass({

        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            var isOk = shallowCompare(this, nextProps, nextState);
            return isOk;
        },

        //createProxyHandler: function (handlerName) {
        //    var that = this;
        //    var proxyName = '_proxy_' + handlerName;
        //    var foo = that[proxyName];
        //    if (!foo) {
        //        foo = function () {
        //            var props = that.props;
        //            var realHandler = props[handlerName];
        //            realHandler(props);
        //        };
        //        that[proxyName] = foo;
        //    }
        //    return foo;
        //},

        render: function render() {
            var props = this.props;
            //var createProxyHandler = this.createProxyHandler;
            return renderFunction ? renderFunction(props) : null;
        }

    });
}

var PureRenderComponent = createPureComponent();
exports.PureRenderComponent = PureRenderComponent;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _utilsFunctions = __webpack_require__(0);

var _utilsShallowEqual = __webpack_require__(5);

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsActionDispatcher = __webpack_require__(1);

var _utilsActionDispatcher2 = _interopRequireDefault(_utilsActionDispatcher);

var _utilsStringUtils = __webpack_require__(4);

var propTypeAny = _react.PropTypes.any;
var storeShape = propTypeAny;

var STATE_ITEM_NAME = 'state';
var CONST_TRUE = true;
var CONST_FALSE = false;
var CONST_NULL = null;
var DEFAULT_STORE_CONTEXT_NAME = 'RebixFluxContextState';

function getStateParam(state, isArrayStoreIns, storeInsArrayLength) {

    if (!isArrayStoreIns) {
        return state[STATE_ITEM_NAME + 0]; // 参数不是数组,结果也不是数组
    }

    var result = [];
    for (var i = 0; i < storeInsArrayLength; i++) {
        result.push(state[STATE_ITEM_NAME + i]);
    }
    return result;
}

function toContextTypes(contextTypes) {

    if ((0, _utilsFunctions.isArray)(contextTypes) && contextTypes.length > 0) {
        var result = {};
        (0, _utilsFunctions.forEach)(contextTypes, function (contextTypeName) {
            result['' + contextTypeName] = propTypeAny;
        });
        return result;
    }

    return contextTypes || {};
}

function setStateDebounce(that, changeState) {

    // var that = this;

    if (that.stateDebounceHandler) {
        clearTimeout(that.stateDebounceHandler);
        that.stateDebounceHandler = CONST_NULL;
    }

    (0, _utilsFunctions.extend)(that.stateWaiting, changeState);

    that.stateDebounceHandler = setTimeout(function () {
        var stateWaiting = that.stateWaiting;
        that.stateWaiting = {};
        that.stateDebounceHandler = CONST_NULL;
        that.hasStoreStateChanged = CONST_TRUE;
        that.setState(stateWaiting);
    }, 1);
}

var DEFAULT_OPTIONS = {
    pure: CONST_TRUE,
    debounce: CONST_FALSE,
    contextTypes: {},
    exposeStore: DEFAULT_STORE_CONTEXT_NAME,
    requireStore: DEFAULT_STORE_CONTEXT_NAME,
    componentName: null
};

var CONNECT_DEFAULT_OPTIONS = DEFAULT_OPTIONS;
function setConnectDefaultOptions(defaultOptions) {
    CONNECT_DEFAULT_OPTIONS = (0, _utilsFunctions.extend)({}, DEFAULT_OPTIONS, defaultOptions);
}

function getParamStoreInstanceFromContext(connectComponentInstance) {
    var connectComponentInstanceContext = connectComponentInstance.context;
    if (connectComponentInstanceContext) {
        var options = connectComponentInstance.connectOptions;
        var requireStore = options.requireStore;

        var requireStoreInstance = connectComponentInstanceContext[requireStore];
        return requireStoreInstance;
    }
    return null;
}

function getStoreAttribute(paramStoreInstance, connectComponentInstance) {

    if (!paramStoreInstance) {
        paramStoreInstance = getParamStoreInstanceFromContext(connectComponentInstance);
    }

    if (!paramStoreInstance) {
        var connectOptions = connectComponentInstance.connectOptions;
        throw new Error('cannot find paramStoreInstance : ', connectOptions);
    }

    var isArrayStoreIns = (0, _utilsFunctions.isArray)(paramStoreInstance);
    var storeInsArray = isArrayStoreIns ? paramStoreInstance : [paramStoreInstance];
    var storeInsArrayLength = storeInsArray.length;
    return { isArrayStoreIns: isArrayStoreIns, storeInsArray: storeInsArray, storeInsArrayLength: storeInsArrayLength };
}

var connectedComponentIndex = 0;

/**
 * demo：
 * 1. connect(BaseComponent,Store,mapStateToProps,options)
 * 2. connect(BaseComponent,mapStateToProps,options)
 * 3. connect(BaseComponent,null,options)
 * 4. connect(BaseComponent,mapStateToProps)
 * 5. connect(BaseComponent)
 *
 * @param BaseComponent 必须的
 * @param p1
 * @param p2
 * @param p3
 * @returns {StateProviderComponent}
 */
function connect(BaseComponent, p1, p2, p3) {
    var _extend;

    var paramStoreInstance = null;
    var mapStateToProps;
    var options;
    var isWithStoreParam = false;

    //省略第StoreIns参数.for demo:[2,3,4,5]
    if ((0, _utilsFunctions.isFunction)(p1) || !p1) {

        isWithStoreParam = false;
        mapStateToProps = p1;
        options = p2;
    } else {
        isWithStoreParam = true;
        paramStoreInstance = p1;
        mapStateToProps = p2;
        options = p3;
    }

    options = (0, _utilsFunctions.extend)({}, CONNECT_DEFAULT_OPTIONS, options || {});
    var _options = options;
    var pure = _options.pure;
    var debounce = _options.debounce;
    var contextTypes = _options.contextTypes;
    var exposeStore = _options.exposeStore;
    var requireStore = _options.requireStore;
    var componentName = _options.componentName;

    componentName = componentName || "ConnectedComponent" + connectedComponentIndex++;

    var StateProviderComponent = {

        displayName: componentName,

        getInitialState: function getInitialState() {
            // this.state = {};
            var that = this;
            that.stateInited = CONST_FALSE;
            that.stateDebounceHandler = 0; //timeoutHandler
            that.stateWaiting = {};
            that.haveOwnPropsChanged = CONST_TRUE;
            that.hasStoreStateChanged = CONST_TRUE;
            that.connectOptions = options;
            return {};
        },

        shouldComponentUpdate: function shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (!pure || !(0, _utilsShallowEqual2['default'])(nextProps, this.props)) {
                this.haveOwnPropsChanged = CONST_TRUE;
            }
        },

        componentDidMount: function componentDidMount() {
            var that = this;
            _utilsActionDispatcher2['default'].on(_utilsActionDispatcher.CommandEvent, that.handleCommand);

            var _getStoreAttribute = getStoreAttribute(paramStoreInstance, that);

            var storeInsArray = _getStoreAttribute.storeInsArray;

            (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0) {
                StoreIns0.addChangeListener(that.handleAllStoreChange);
            });
            that.handleAllStoreChange();
        },

        componentWillUnmount: function componentWillUnmount() {
            var that = this;

            _utilsActionDispatcher2['default'].off(_utilsActionDispatcher.CommandEvent, that.handleCommand);

            var _getStoreAttribute2 = getStoreAttribute(paramStoreInstance, that);

            var storeInsArray = _getStoreAttribute2.storeInsArray;

            (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0) {
                StoreIns0.removeChangeListener(that.handleAllStoreChange);
            });

            if (that.stateDebounceHandler) {
                clearTimeout(that.stateDebounceHandler);
                that.stateDebounceHandler = CONST_NULL;
            }
        },

        //View层也可以直接接收Command的消息.
        handleCommand: function handleCommand(_ref2) {
            var actionName = _ref2.actionName;
            var actionGroup = _ref2.actionGroup;
            var payload = _ref2.payload;
            var status = _ref2.status;

            var commandHandlerName = "onCmd" + (0, _utilsStringUtils.toFirstCharUpper)(actionName); // onCmdXXX
            var componentIns = this.refs['BaseComponentIns'];
            if (componentIns) {
                if ((0, _utilsFunctions.isFunction)(componentIns[commandHandlerName])) {
                    componentIns[commandHandlerName](payload, status, actionName, actionGroup);
                }
            }
        },

        handleAllStoreChange: function handleAllStoreChange() {

            var that = this;

            var stateMerge = {};

            var _getStoreAttribute3 = getStoreAttribute(paramStoreInstance, that);

            var storeInsArray = _getStoreAttribute3.storeInsArray;

            (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0, index) {
                var stateTmp = StoreIns0.getState();
                stateMerge[STATE_ITEM_NAME + index] = stateTmp;
            });

            that.stateInited = CONST_TRUE;

            if (debounce) {
                //防抖
                setStateDebounce(that, stateMerge);
            } else {
                that.hasStoreStateChanged = CONST_TRUE;
                that.setState(stateMerge);
            }
        },

        render: function render() {

            var that = this;
            if (!that.stateInited) {
                return CONST_NULL;
            }

            that.haveOwnPropsChanged = CONST_FALSE;
            that.hasStoreStateChanged = CONST_FALSE;

            var props = (0, _utilsFunctions.extend)({}, that.props || {});

            if (mapStateToProps) {

                var context = that.context || {};
                var connectState = that.state;

                //如果有Store作为参数,使用Store去Mapper

                var _getStoreAttribute4 = getStoreAttribute(paramStoreInstance, that);

                var isArrayStoreIns = _getStoreAttribute4.isArrayStoreIns;
                var storeInsArrayLength = _getStoreAttribute4.storeInsArrayLength;

                var stateParamForCalc = getStateParam(connectState, isArrayStoreIns, storeInsArrayLength);
                var mapperResult = mapStateToProps(stateParamForCalc, props, context, connectState, that);

                if (mapperResult) {
                    props = (0, _utilsFunctions.extend)(props, mapperResult);
                }
            }

            return _react2['default'].createElement(BaseComponent, _extends({}, props, { ref: 'BaseComponentIns' }));
        }

    };

    if (isWithStoreParam) {
        StateProviderComponent.getChildContext = function () {
            return _defineProperty({}, exposeStore, paramStoreInstance);
        };
        StateProviderComponent.childContextTypes = _defineProperty({}, exposeStore, storeShape);
    }

    StateProviderComponent.contextTypes = (0, _utilsFunctions.extend)((_extend = {}, _defineProperty(_extend, requireStore, storeShape), _defineProperty(_extend, 'router', propTypeAny), _extend), toContextTypes(contextTypes));

    return _react2['default'].createClass(StateProviderComponent);
}

module.exports = {
    connect: connect,
    setConnectDefaultOptions: setConnectDefaultOptions
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createAction = createAction;
exports.createActions = createActions;
exports.createCommand = createCommand;
exports.dispatchCommand = dispatchCommand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsFunctions = __webpack_require__(0);

var _utilsArrayUtils = __webpack_require__(3);

var _utilsIsPromise = __webpack_require__(12);

var _utilsIsPromise2 = _interopRequireDefault(_utilsIsPromise);

var _utilsActionDispatcher = __webpack_require__(1);

var _utilsActionDispatcher2 = _interopRequireDefault(_utilsActionDispatcher);

var STATUS_PENDING = 'pending';
var STATUS_SUCCESS = 'success';
var STATUS_ERROR = 'error';

function emitActionEvent(actionGroup, actionName, eventName, status, payload, args) {
    _utilsActionDispatcher2['default'].emit(eventName, {
        actionName: actionName,
        actionGroup: actionGroup,
        status: status,
        payload: payload,
        args: args
    });
}

function createAction(actionGroup, actionName, func, actionsConfig, eventName) {

    actionsConfig = actionsConfig || {};
    eventName = eventName || _utilsActionDispatcher.ActionEvent;

    return function () {

        var args = (0, _utilsArrayUtils.toArray)(arguments);
        var result = func.apply(actionsConfig, args);
        if ((0, _utilsIsPromise2['default'])(result)) {

            result.then(function (data) {
                emitActionEvent(actionGroup, actionName, eventName, STATUS_SUCCESS, data, args);
            }, function (data) {
                emitActionEvent(actionGroup, actionName, eventName, STATUS_ERROR, data, args);
            });

            emitActionEvent(actionGroup, actionName, eventName, STATUS_PENDING, result, args);
        } else {
            emitActionEvent(actionGroup, actionName, eventName, STATUS_SUCCESS, result, args);
        }

        return result;
    };
}

/**
 *
 * @param actionGroup 必须是字符串
 * @param actionsConfig 必须是对象
 * @returns {{}}
 */

function createActions(actionGroup, actionsConfig) {

    if (!(0, _utilsFunctions.isString)(actionGroup)) {
        throw new Error('1st param is not string');
    }

    var actions = {};

    (0, _utilsFunctions.forEach)(actionsConfig, function (func, actionName) {
        actions[actionName] = createAction(actionGroup, actionName, func, actionsConfig, _utilsActionDispatcher.ActionEvent);
    });

    return actions;
}

//Command是一个特殊的Action

function createCommand(commandName, func) {
    return createAction("Command", commandName, func, {}, _utilsActionDispatcher.CommandEvent);
}

//广播一个Command

function dispatchCommand(commandName, data, status) {
    status = status || STATUS_SUCCESS;
    emitActionEvent("Command", commandName, _utilsActionDispatcher.CommandEvent, status, data);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createMergedStore = createMergedStore;

var _utilsFunctions = __webpack_require__(0);

var _createStore = __webpack_require__(6);

var EventBus = __webpack_require__(2);

var STORE_CLASS_NAME_CONST = _createStore.STORE_CLASS_NAME;

function mergeStoreState(storeConfig) {
    var result = {};
    (0, _utilsFunctions.forEach)(storeConfig, function (storeIns, name) {
        if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
            result[name] = storeIns.getState();
        }
    });
    return result;
}

function RebixfluxMergedStore(storeConfig) {

    if (!storeConfig) {
        throw new Error('NullPointer');
    }

    var that = this;
    that.$$storeConfig = storeConfig;
    that.$$ClassName = STORE_CLASS_NAME_CONST;
    that.$$eventBus = new EventBus('MergedStoreEventBus');
    that.$$state = mergeStoreState(storeConfig);

    that.enableListener = function () {
        (0, _utilsFunctions.forEach)(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
                storeIns.addChangeListener(that.$$handleSubStoreChange);
            }
        });
    };

    that.disableListener = function () {
        (0, _utilsFunctions.forEach)(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
                storeIns.removeChangeListener(that.$$handleSubStoreChange);
            }
        });
    };

    that.$$handleSubStoreChange = function (changedState, subStore) {
        that.$$state = mergeStoreState(storeConfig);
        that.$$eventBus.emit(_createStore.EVENT_STORE_CHANGE, changedState, subStore, that);
    };

    that.addChangeListener = function (listener) {
        that.$$eventBus.on(_createStore.EVENT_STORE_CHANGE, listener);
    };

    that.removeChangeListener = function (listener) {
        that.$$eventBus.off(_createStore.EVENT_STORE_CHANGE, listener);
    };

    that.getState = function () {
        return that.$$state;
    };

    that.enableListener();
}

function createMergedStore(storeConfig) {
    return new RebixfluxMergedStore(storeConfig);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isPromise;

function isPromise(p) {
    return p && typeof p.then === 'function' && typeof p['catch'] === 'function';
}

module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = __webpack_require__(6);

var _createMergedStore = __webpack_require__(11);

var _utilsShallowEqual = __webpack_require__(5);

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _createActions = __webpack_require__(10);

var _utilsActionDispatcher = __webpack_require__(1);

var _utilsActionDispatcher2 = _interopRequireDefault(_utilsActionDispatcher);

var _utilsFunctions = __webpack_require__(0);

var functions = _interopRequireWildcard(_utilsFunctions);

var _utilsStringUtils = __webpack_require__(4);

var StringUtils = _interopRequireWildcard(_utilsStringUtils);

var _utilsArrayUtils = __webpack_require__(3);

var ArrayUtils = _interopRequireWildcard(_utilsArrayUtils);

var _componentsPureRenderComponent = __webpack_require__(8);

var EventBus = __webpack_require__(2);

var connectFunctions = __webpack_require__(9);

var exportObject = {
    dispatchCommand: _createActions.dispatchCommand,
    createCommand: _createActions.createCommand,
    createAction: _createActions.createAction,
    createActions: _createActions.createActions,
    createStore: _createStore.createStore,
    createMergedStore: _createMergedStore.createMergedStore,
    PureRenderComponent: _componentsPureRenderComponent.PureRenderComponent,
    createPureComponent: _componentsPureRenderComponent.createPureComponent,
    shallowEqual: _utilsShallowEqual2['default'],
    EventBus: EventBus,
    ActionDispatcher: _utilsActionDispatcher2['default']
};

//把它用到的工具函数,也暴漏给外界。
var extend = functions.extend;
extend(exportObject, functions, StringUtils, ArrayUtils, connectFunctions);

exports['default'] = exportObject;
module.exports = exports['default'];

/***/ })
/******/ ]);
});