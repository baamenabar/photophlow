const fs = require('fs');
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

	return {
		listMatching: _listMatchingGlob,
		listTwoMatching: _listTwoMatchingPatterns
	};
})();

module.exports = Lists;
