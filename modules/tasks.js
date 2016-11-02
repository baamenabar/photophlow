let lists = require('./list.js');
const path = require('path');

const _filterBasenameHay = (haystack, needels) => {
	//console.log('haystack:',haystack, 'needels:', needels);
	let needelExt =   needels[0].split('.').pop();
	let haystackExt = haystack[0].split('.').pop();
	let baseNeedels =  needels.map(item => ({ base:path.basename(item,  '.' + needelExt), path:item}) );
	let baseHaystack = haystack.map(item => ({ base:path.basename(item, '.' + haystackExt), path:item}) );
	return baseHaystack.filter(item => {
		return 'undefined' === typeof baseNeedels.find(ele => ele.base === item.base);
	}).map(item => item.path);
}

/**
 * Compares all the matching @children to @parent globs and lists the files without a match in @parent
 * @param  {string}   parents  Glob pattern 
 * @param  {string}   children Glob pattern
 * @param  {function} cb  Callback that will have an Array of Orphan files.
 */
const _listBaseOrphans = (parents, children, cb) => {
	let orphanFiles = [];
	var parentsFiles = [];
	var childrenFiles = [];

	lists.listTwoMatching(parents, children, (parentList, childrenList) => {
		console.log(_filterBasenameHay(childrenList, parentList));
	});

	//cb (orphanFiles);
};

var Tasks = (() => {

	const _findAndCallTask = (name, taskAguments ) => {
		if(typeof taskIndex[name] === 'function') {
			taskIndex[name].apply(this,taskAguments);
		} else {
			console.error('This task does not exist');
		}
	};

	const taskIndex = {
		orphans: _listBaseOrphans
	};

	return {
		callTask:_findAndCallTask
	}
})();

module.exports = Tasks;
