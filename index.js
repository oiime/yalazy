const fs = require('fs')
const path = require('path')

function lazyLoad (path, method) {
  let __return
  return function __load () {
    if (__return) return __return
    const __module = require(path)
    __return = method ? __module[method] : __module
    return __return
  }
}

lazyLoad.directory = function (modulesPath, options = {}) {
  const modules = {}
  if (options.lazyProperties) {
    for (const name in options.lazyProperties) {
      Object.defineProperty(modules, name, {
        configurable: true,
        writeable: false,
        enumerable: false,
        get: function () {
          const value = options.lazyProperties[name](modules)
          Object.defineProperty(modules, name, {
            enumerable: false,
            value: value
          })
          return value
        }
      })
    }
  }
  fs.readdirSync(modulesPath).filter(file => file.indexOf('.') !== 0 && file !== 'index.js').forEach(file => {
    const name = file.endsWith('.js') ? file.substr(0, file.lastIndexOf('.')) : file
    const propertyName = options.camelCase ? name.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() }) : name
    Object.defineProperty(modules, propertyName, {
      configurable: true,
      enumerable: true,
      writeable: true,
      get: function () {
        const _module = options.requireWith ? options.requireWith(modules, path.join(modulesPath, name)) : require(path.join(modulesPath, name))
        Object.defineProperty(modules, propertyName, {
          enumerable: true,
          value: _module
        })
        return _module
      }
    })
  })
  return modules
}

module.exports = lazyLoad
