var fs = require('fs');
var glob = require('glob');


var Lists = (() => {

	var _listMatchingGlob = (globPattern, cb, errcb) => {
		//console.log('glob pattern:', globPattern);
		glob(globPattern, (err, files) => {
			if (err) {
				console.error('error with the parttern: ', err);
				errcb (err);
				return;
			}
			cb(files);
		});
	};

	return {
		listMatching:_listMatchingGlob
	};
})();

//eval(process.argv[2]+'()')
module.exports = Lists;
