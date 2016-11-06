// Check that the minimal node version is met.
// this does not work because "let" throws syntax error in older versions. 
$minimalNodeMayorVersion = 6;
if (parseInt(process.versions.node.split('.')[0],10) < $minimalNodeMayorVersion) {
	console.error('Photophlow needs node v6 or higher.');
	process.exit();
}

var lists = require('./modules/list');
var tasks = require('./modules/tasks');


var taskName = process.argv[2];
var taskArgs = process.argv.splice(3);

tasks.callTask(taskName,taskArgs);
