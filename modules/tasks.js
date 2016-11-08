const lists = require('./list.js');
const shortcuts = require('./shortcuts.js');
const path = require('path');
const fs = require('fs');

var Tasks = (() => {

	const _findAndCallTask = (name, taskAguments ) => {
		if(typeof taskIndex[name] === 'object' &&  typeof taskIndex[name].fn === 'function') {
			taskIndex[name].fn.apply(this,taskAguments);
		} else {
			console.error('This task does not exist');
		}
	};

	const _help = () => {
		Object.keys(taskIndex).forEach((key) => {
			console.log('* ' + key + ' : ' + taskIndex[key].description + '\n');
		});
	};

	const taskIndex = {
		help: {
			fn: _help,
			description: 
			 '          Shows this message text.'
		},
		orphans: {
			fn:lists.listBaseOrphans,
			description: 
			    '       @parents @children - Compares all the matching @children to @parents globs and lists the files without a match in @parent',
		},
		sameBN: {
			fn:lists.listSameBaseName,
			description: 
			   '        @parents @children - Compares all the matching @children to @parent globs and lists the files WITH the same baseName in @parent',
		},
		moveSameBNto: {
			fn:lists.moveSameBaseNameTo,
			description: 
			         '  @parents @children @destinationPath - Move the matching basenames to a destinationPath',
		},
		cleanraw: {
			fn:shortcuts.cleanRaw,
			description: 
			     '      Moves RAW files from RAW to HD if matching the basenames of JPG files in current folder.',
		},
		separateraw: {
			fn:shortcuts.separateRaw,
			description: 
			        '   Creates HD and RAW folders and moves RAW files inside',
		},
	};

	return {
		callTask:_findAndCallTask
	}
})();

module.exports = Tasks;
