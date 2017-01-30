# json-pkg-merge

Intelligently merge `package.json` files.

This is pretty much built for yeoman. It attempts to combine two separate `package.json` files into one, respecting as much existing content as possible including already existing dependencies and `package.json` formatting.

```javascript
var merge = require('@alphaui/json-pkg-merge');
var fs = require('fs');
var path = require('path');
var dst = require(path.resolve(__dirname,'../', 'package.base.json'));
var src = require(path.resolve(__dirname,'../','package.plugin.json'));

shell.echo("Merging plugin dependencies with base dependencies");
//Merge the package files into a new variable
var packages = merge(dst, src);
//merge returns a json string that can be written to a file
//If you want to use this in code, you should parse the returned json
fs.writeFile(path.resolve(__dirname, "../", 'package.json'), packages, 'utf-8', function(err){
	if(err)
	return console.log('There was an error creating productList.json file: ', err);

})
```

It allows you to do things like define scripts or dependencies that you would like to include as part of a larger project.

Merging:

```json
{
	"name": "my-package",
	"dependencies": {
		"babel": "^5.2.2",
		"lodash": "^3.2.5"
	}
}
```

```json
{
	"dependencies": {
		"babel": "^5.4.1",
		"eslint": "^0.22.1"
	}
}
```

results in:

```json
{
	"name": "my-package",
	"dependencies": {
		"babel": "^5.4.1",
		"lodash": "^3.2.5",
		"eslint": "^0.22.1"
	}
}
```
