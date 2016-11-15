const fs = require('fs');
const path = require('path');
const glob = require('glob');


const Lists = (() => {

	let _listTwoMatchingPatterns = (patternA, patternB, cb, errcb) => {
		var listA = [];

		let patternList = new Promise ((resolve, reject) => {
			_listMatchingGlob(patternA, resolve, reject);
		})
		.then((value) => {
			listA = value;
			return new Promise ((resolve, reject) => {
				_listMatchingGlob(patternB, resolve, reject);
			});
		})
		.then((listB) => {
			cb(listA, listB);
		})
		.catch((err) => {
			console.error('Promise error in listing', err, 'patternA:'+patternA, 'patternB:'+patternB)
			if(typeof errcb === 'function') {
				errcb (err);
			}
		});
	}

	let _listMatchingGlob = (globPattern, cb, errcb) => {
		//console.log('glob pattern:', globPattern);
		glob(globPattern, (err, files) => {
			if (err) {
				console.error('error with the parttern: ', err);
				if(typeof errcb === 'function') {
					errcb (err);
				}
				return;
			}
			cb(files);
		});
	};

	let _moveListOfFiles = (fileList, targetPath, cb) => {
		let callback = (typeof cb === 'function') ? cb : () => {console.log('done')};
		let filesToMoveCount = fileList.length;
		fileList.forEach( (filePath) => {
			fs.rename(filePath, targetPath + '/' + path.basename(filePath), () => {
				console.log('Moved to new location, file:' + filePath);
				filesToMoveCount--;
				if (filesToMoveCount < 1) {
					callback();
				}
			});
		});
	};

	let _createFolders = (folderList) => {
		folderList.forEach( element => {
			var dirStat = false;
			try {
				dirStat = fs.statSync('./' + element);
			} catch(e) {
				console.log('"' + element + '" not a file or folder. Creating folder "' + element + '".');
			}
			if(!dirStat || !dirStat.isDirectory()) {
				fs.mkdirSync(element);
				console.log('Creating folder "' + element + '".');
			} else {
				console.log('Folder "' + element + '" already exists, skipping creation.');
			}
		});
	};

/**
 * Returns just the "hay" of the @needels from a "needels+hay haystack" of file paths, using only the basename for comparison.
 * @param  {Array} haystack [list of filepaths]
 * @param  {Array} needels  [list of filepaths]
 * @return {Array}          [list of filepaths]
 */
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
 * Returns just the matching paths in the @pool against the file paths in @source, using only the basename for comparison.
 * @param  {Array} source [list of filepaths]
 * @param  {Array} pool   [list of filepaths]
 * @return {Array}        [list of filepaths]
 */
const _filterBasenameMatching = (source, pool) => {
	//console.log('source:',source, 'pool:', pool);
	let poolExtension =   pool[0].split('.').pop();
	let sourceExtension = source[0].split('.').pop();
	let basePool =  pool.map(item => ({ base:path.basename(item,  '.' + poolExtension), path:item}) );
	let baseSource = source.map(item => ({ base:path.basename(item, '.' + sourceExtension), path:item}) );
	return baseSource.filter(item => {
		return 'undefined' !== typeof basePool.find(ele => ele.base === item.base);
	}).map(item => item.path);
}

/**
 * Compares all the matching @children to @parent globs and lists the files without a match in @parent
 * @param  {string}   parents  Glob pattern 
 * @param  {string}   children Glob pattern
 * @param  {function} cb  Callback that will have an Array of Orphan files.
 */
const _listBaseOrphans = (parents, children, cb) => {
	let callback = (typeof cb === 'function') ? cb : console.log;
	_listTwoMatchingPatterns(parents, children, (parentList, childrenList) => {
		callback(_filterBasenameHay(childrenList, parentList));
	});
};

/**
 * Compares all the matching @children to @parent globs and lists the files WITH the same baseName in @parent
 * @param  {string}   parents  Glob pattern 
 * @param  {string}   children Glob pattern
 * @param  {function} cb  Callback that will have an Array of matching files.
 */
const _listSameBaseName = (parents, children, cb) => {
	let callback = (typeof cb === 'function') ? cb : console.log;
	_listTwoMatchingPatterns(parents, children, (parentList, childrenList) => {
		callback(_filterBasenameMatching(childrenList, parentList));
	});
};

const _moveSameBaseNameTo = (parents, children, targetPath, cb) => {
	let callback = (typeof cb === 'function') ? cb : () => {console.log('done')};
	_listSameBaseName(parents, children, matchingList => {
		console.log('matchingList: ', matchingList);
		_moveListOfFiles(matchingList, targetPath, callback);
	});
};

	return {
		listMatching: _listMatchingGlob,
		listTwoMatching: _listTwoMatchingPatterns,
		moveListOfFiles: _moveListOfFiles,
		filterBasenameHay: _filterBasenameHay,
		filterBasenameMatching: _filterBasenameMatching,
		listBaseOrphans: _listBaseOrphans,
		listSameBaseName: _listSameBaseName,
		moveSameBaseNameTo: _moveSameBaseNameTo,
		createFolders: _createFolders
	};
})();

module.exports = Lists;
