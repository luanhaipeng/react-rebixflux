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
                obj[key] = source[key]
            }
        }
    }
    return obj;
}


function createIsType(type){
    return function (x){
        return Object.prototype.toString.call(x) === '[object ' + type + ']';
    }
}

export const extend = Object.assign || objectAssign;

export const isArray = Array.isArray || createIsType('Array');

export const isFunction = createIsType('Function');

export const isString = createIsType('String');

export const forEach = function (obj, it) {
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
