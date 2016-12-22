var gulp = require( 'gulp' );
/***================= JSDOC TASKS =====================*/
var jsdoc = require('gulp-jsdoc3');

// build paths where we output our results
var outPath = {
    docs: "./docs/"
};

// adapt this to your source code location
var jsDocInput = {
    src: "src",
    readme: "./README.md",
    jsDoc: "./jsdoc/config"
};

/**
 * Create the docs
 */
gulp.task("docs", function (cb) {

    // use require to load the jsdoc config;
    // note the extension is discarted when loading json with require!
    var config = require(jsDocInput.jsDoc)
    config.opts.destination = outPath.docs;

    gulp.src([jsDocInput.readme, jsDocInput.src + "/**/*.js"])
        .pipe(jsdoc(config, cb));

});
/***================= JSDOC TASKS END =====================*/