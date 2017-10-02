const readline = require('readline');
const Commands = require('./Commands/Commands');
const Table    = require('cli-table');

function display_banner(){
	console.log(`
  __________      
 |__  / ____|_  __
   / /|  _| \\ \\/ /
  / /_| |___ >  < 
 /____|_____/_/\\_\\

		`);
}

function display_help(){
	console.log("| Use help to print this help");
	console.log("| Use commands to print all the commands");
}

function display_all_command(){
	var table = new Table({
	    head: ['Name', 'Regex', 'Description'],
	    style: {head: ['cyan'], border: ['cyan']}
	});
	for(let i = 0; i < Commands.length; i++){
		let cmd = Commands[i];
		let cmd_name = cmd.name;
		let cmd_description = cmd.description;
		let cmd_regex = cmd.regex;
		
		table.push([cmd_name, cmd_regex, cmd_description]);
	}

	console.log(table.toString());
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "[*]-> "
});

//-----------------------------------
// Start running

display_banner();

rl.prompt();

rl.on("line", function(input) {
	let executed = false;
	let args = input.split(" ");
	args.shift();
	for(let i = 0; i < Commands.length; i++){
		if(Commands[i].is(input)){
			Commands[i].execute(args);
			executed = true;
		}
	}
	if(!executed){
		if(input == "help"){
			display_help();
		}
		else if(input == "commands"){
			display_all_command();
		}
		else{
			console.log("Command " + input + " not found !");
		}
	}
	rl.prompt();
});