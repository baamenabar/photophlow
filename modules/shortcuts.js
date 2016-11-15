const lists = require('./list');
const glob = require('glob');
const fs = require('fs');

const Shortcuts = (() => {
	const rawFormats = ['dng','nef','cr2', 'DNG','NEF','CR2'];
	const imagesFormats = rawFormats.concat(['jpg','jpeg','psd','JPG','JPEG','PNG','PSD']);

	const _moveExistingJpgNamesFromRawToHD = () => {
		rawFormats.forEach((format, index) => {
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

	const _moveRawToRawFolder = () => {
		lists.createFolders(['RAW','HD']);
		let globPattern = '@(*.' + rawFormats.join('|*.') + ')';
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

	const _initLightRoom = () => {
		lists.createFolders(['sources','to_process','exports']);
		let globPattern = '@(*.' + imagesFormats.join('|*.') + ')';
		//console.log('globPattern:', globPattern);
		glob(globPattern, {nocase:true}, (err, fileList) => {
				if (err) {
					console.error('A glob error', err)
					return;
				}
				lists.moveListOfFiles(fileList, './sources',() => {console.log('Done moving source files.')});
			}
		);
	};

	return {
		cleanRaw :    _moveExistingJpgNamesFromRawToHD,
		separateRaw : _moveRawToRawFolder,
		initLightRoom: _initLightRoom
	};

})();

module.exports = Shortcuts;
