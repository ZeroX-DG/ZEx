const stampit  = require('stampit');
let Command = stampit()
.props({
	name: "no name",
	regex: null,
	action: null,
	description: "no description"
})
.methods({
	is(input){
		let regex = this.regex.reduce((final, next) => {
			return new RegExp(final.source + "|" + next.source);
		}, new RegExp("//"));
		return regex.test(input);
	},
	execute(args){
		this.action.apply(this.action, args);
	}
})
.init(function({name, action, regex, description}) {
	this.name = name || this.name;
	this.regex = regex || this.regex;
	this.action = action || this.action;
	this.description = description || this.description;
});

module.exports = Command;