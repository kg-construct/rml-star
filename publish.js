/**
 * Created by bjdmeest on 10/06/2016.
 * Modified by Dylan Van Assche on 12/02/2021.
 */

var fs = require('fs');
var path = require('path');

var dateString = (new Date()).toISOString().split('T')[0].replace(/-/g, '');

try {
    if (!fs.existsSync (path.resolve(__dirname, 'dist'))) {
        fs.mkdirSync (path.resolve(__dirname, 'dist'));
    }
    fs.mkdirSync (path.resolve(__dirname, 'dist', dateString));
} catch (e) {

}

var files = fs.readdirSync (path.resolve(__dirname, 'dist'));
var dirs = [];
for (var i = 0; i < files.length; i++) {
    if (fs.lstatSync (path.resolve(__dirname, 'dist', files[i])).isDirectory()) {
        dirs.push(files[i]);
    }
}

dirs.sort();
dirs.reverse();

if (dirs[0] === "resources") {
    dirs.splice (0, 1);
}

if (dirs[0] === dateString) {
    dirs.splice (0, 1);
}

// First version, set previous version to this one
if (dirs.length == 0) {
    dirs.push (dateString)
}

var html = fs.readFileSync ('./rendered.html', 'utf8');
html = html.replace (/%thisDate%/g, dateString);
html = html.replace (/%prevDate%/g, dirs[0]);
fs.writeFileSync (path.resolve (__dirname, 'dist', 'index.html'), html);
html = html.replace (/\.\/resources/g, '../resources');
fs.writeFileSync (path.resolve(__dirname, 'dist', dateString, 'index.html'), html);

