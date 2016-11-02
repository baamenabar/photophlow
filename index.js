var lists = require('./modules/list');
var tasks = require('./modules/tasks');


//lists.listMatching(process.argv[2], console.log);

let taskName = process.argv[2];
let taskArgs = process.argv.splice(3);

tasks.callTask(taskName,taskArgs);
