const lists = require('./list');
const glob = require('glob');
const fs = require('fs');

const Shortcuts = (() => {
	let formats = ['dng','nef','cr2', 'DNG','NEF','CR2'];

	const _moveExistingJpgNamesFromRawToHD = () => {
		formats.forEach((format, index) => {
			let currentFormat = './RAW/*.' + format;
			if(glob.sync(currentFormat).length) {
				lists.moveSameBaseNameTo('./@(*.jpg|*.JPG)', currentFormat, './HD', () => {
					console.log('done with: ' + format);
				})
			} else {
				console.log('No .' + format + ' found.');
			}
		});
	};

	const _setupBasicFolderStructure = () => {
		var rawStat = false;
		var hdStat = false;
		try {
			rawStat = fs.statSync('./RAW');
		} catch(e) {
			console.log('RAW not a file or folder. Creating folder RAW.');
		}
		if(!rawStat || !rawStat.isDirectory()) {
			fs.mkdirSync('RAW');
		}
		try {
			hdStat = fs.statSync('./HD');
		} catch(e) {
			console.log('HD not a file or folder. Creating folder HD.');
		}
		if(!hdStat || !hdStat.isDirectory()) {
			fs.mkdirSync('HD');
		}
	};

	const _moveRawToRawFolder = () => {
		_setupBasicFolderStructure();
		let globPattern = '@(*.' + formats.join('|*.'). + ')';
		//console.log('globPattern:', globPattern);
		glob(globPattern, {nocase:true}, (err, fileList) => {
				if (err) {
					console.error('A glob error', err)
					return;
				}
				lists.moveListOfFiles(fileList, './RAW',() => {console.log('Done moving RAW files.')});
			}
		);
	};

	return {
		cleanRaw :    _moveExistingJpgNamesFromRawToHD,
		separateRaw : _moveRawToRawFolder
	};

})();

module.exports = Shortcuts;
