## about

`yalazy` (Yet Another Lazy Loader) is a super simple lazy loader for modules and directories, It's borderline too small to merit its own module but, here it is

## installation
```bash
npm install --save yalazy
```
## example
```javascript
const yalazy = require('yalazy')
const getSomeModule = yalazy('someModules')
getSomeModule()
const myModules = yalazy.directory('direcotryPath')
myModules['moduleByFileOrDirectoryName']()
```


## API

#### yalazy(path, method)

* `path` - full or relative path to module file or directory
* 'method' (optional) - specific method to load from within the module

#### yalazy.directory(path, options = {})

* `path` - full or relative path to modules directory
* `options.camelCase` - convert module filenames to camelCase
* `options.requireWith` - allow manually requiring and optionally adjusting the module before assignment: eg: `requireWith: (modules, filename) => require(filename)`
* `options.lazyProperties` - an object defining additional properties to lazyLoad, eg: `lazyProperties: { client: (modules) => { return 'clientObject' }`


License: MIT
