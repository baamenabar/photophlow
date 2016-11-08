# photophlow
A bunch of console commands for dealing with picture collections. Created for personal use. Fork if you like.

    npm install -g photophlow

To get the list of supported tasks and descriptions:

    photophlow help

## Available tasks

### help
Shows help message text.

### orphans
@parents @children - Compares all the matching @children to @parents globs and lists the files without a match in @parent .

### sameBN
@parents @children - Compares all the matching @children to @parent globs and lists the files WITH the same baseName in @parent .

### moveSameBNto
@parents @children @destinationPath - Move the matching basenames to a destinationPath.

### cleanraw
Moves RAW files from RAW to HD if matching the basenames of JPG files in current folder.

### separateraw
Creates HD and RAW folders and moves RAW files inside


On *zsh* the glob patterns must be passed as strings (whithin quotes), on Windows it's not needed.


<!--
https://github.com/dwyl/learn-travis
https://github.com/dwyl/learn-tdd
https://www.codementor.io/nodejs/tutorial/unit-testing-nodejs-tdd-mocha-sinon
https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
http://javascriptplayground.com/blog/2015/03/node-command-line-tool/
https://bretkikehara.wordpress.com/2013/05/02/nodejs-creating-your-first-global-module/
https://developer.atlassian.com/blog/2015/11/scripting-with-node/ (bash)
-->
