const lists = require('./list.js');
const shortcuts = require('./shortcuts.js');
const path = require('path');
const fs = require('fs');

var Tasks = (() => {

	const _findAndCallTask = (name, taskAguments ) => {
		if(typeof taskIndex[name] === 'function') {
			taskIndex[name].apply(this,taskAguments);
		} else {
			console.error('This task does not exist');
		}
	};

	const taskIndex = {
		orphans: lists.listBaseOrphans,
		// same baseName
		sameBN: lists.listSameBaseName,
		// move same basename to :
		moveSameBNto: lists.moveSameBaseNameTo,
		// moveSameBNto shortcut for photoprocessing (selectedJpgRaw2HD)
		cleanraw: shortcuts.cleanRaw,
		// separates raw files and puts them in the RAW sub-folder.
		separateraw: shortcuts.separateRaw
	};

	return {
		callTask:_findAndCallTask
	}
})();

module.exports = Tasks;
