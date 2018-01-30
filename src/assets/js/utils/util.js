const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {};

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

export const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export function getPropByPath(obj, path, strict) {  //根据当前form-item 的 prop 从form的rules中查找 到相应的 rule对象（即校验规则）
  path = path.replace(/\[(\w+)\]/g, '.$1');  //去除 [ ]
  path = path.replace(/^\./, '');  //去除 开头 .
  let pathArr = path.split('.');  
  
//console.log(obj,'obj------>')
//console.log(path,'path------>')  
//console.log(pathArr,'pathArr------>')

  let tempObj = obj;
  let i = 0;
  for (let len = pathArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = pathArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  
//console.log(tempObj,'o::tempObj ------>处理后  util.js getPropByPath()')
//console.log(pathArr[i],'k::pathArr[i] ------>处理后  util.js getPropByPath()')
//console.log(tempObj[pathArr[i]],'v::tempObj[pathArr[i]] ------>处理后  util.js getPropByPath()')
  return {
    o: tempObj,        //rules
    k: pathArr[i],				//prop值
    v: tempObj ? tempObj[pathArr[i]] : null    //对应规则
  };
};

export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
