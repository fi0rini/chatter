var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');

// CONSTANTS
const MEGA_BYTES = 1000000;
const GIGA_BYTES = 1000000000;

function logerror (err) {
    console.error(err);
}

module.exports = (function(options) {
    options = options || {};

    // Output file
    var output = path.resolve(__dirname, 'public', 'js', 'bundle.js');

    var b = browserify({
        entries: [
            path.resolve(__dirname, 'public', 'js','app')
        ],
        paths: [
            path.resolve(__dirname, 'public', 'js')
        ],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    b.on('bundle', bundle);
    b.on('update', update);

    update();

    function update() {
        b.bundle().pipe(fs.createWriteStream(output));
    }

    function bundle(bundle) {
        var string = '';
        var bytes = 0;

        bundle.on('data', chunk => bytes += chunk.length );

        bundle.on('end', () => {
            console.log (bytes/MEGA_BYTES + 'MB written to ' + output);

            options.onUpdate && options.onUpdate();
        });

        bundle.on('error', logerror);
    }

    return {};
}());
