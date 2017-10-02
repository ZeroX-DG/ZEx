const Command = require('./Command');
let glob      = require('glob');
let path      = require('path');
let _         = require('lodash');

glob.sync('./Exploits/**/*.js').forEach((filePath) => {
  let fileFullName = filePath.split("/");
  let moduleName   = fileFullName[fileFullName.length - 2];
  let moduleScript = _.last(fileFullName);
  if(moduleScript == "index.js"){
    global[moduleName] = require(path.resolve(filePath));
  }
});

let Commands = [
	Command({
		name: "Exit program", 
		regex: [/^exit$/,/^quit$/], 
		action: () => { process.exit(); },
		description: "Use to exit the program"
	}),
	Command({
		name: "Hash function",
		regex: [/^hash \w+( \w+)?$/],
		action: StringConvert,
		description: "Use to hash strings !"
	})
];

module.exports = Commands;
