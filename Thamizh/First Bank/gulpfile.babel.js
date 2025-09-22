'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import sherpa        from 'style-sherpa';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import uncss         from 'uncss';
import autoprefixer  from 'autoprefixer';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')


function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}



// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, javascript, images, copy), sass, styleGuide, fourcolumnpanel, fourcolumn_skewpanel, chatbot, heroslider, findlocation, inlinevideo, error, followuspanel, tabpanel, findbranch, subbanner, alternative, ratetable, counterpanel, contentboxpanel, iconpanel, newsdetails, contact, locations, locationdetails, whowearepanel, ourvaluespanel, workwithuspanel, timelinepanel, generalcontent, fourcolumnboxpanel, videopanel, downloadpanel, iconboxpanel, lenderspanel, searchresults, teambiopanel, ourteampanel, accordion, sitemap, calculatorpanel));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa('src/styleguide/index.md', {
    output: PATHS.dist + '/styleguide.html',
    template: 'src/styleguide/template.html'
  }, done);
}

var imagemin = require('gulp-imagemin');
gulp.task('image', function() {
  gulp.src(app.srcPath + 'image/**/*')
  .pipe(gulp.dest(app.devPath + 'image'))
  .pipe(imagemin())
  .pipe(gulp.dest(app.prdPath + 'image'))
})

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {

  const postCssPlugins = [
    // Autoprefixer
    autoprefixer(),

    // UnCSS - Uncomment to remove unused styles in production
    // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
  ].filter(Boolean);
          return gulp.src('src/assets/scss/style.scss')
 
   
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    // .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css/global'))
    .pipe(browser.reload({ stream: true }));
}
function fourcolumnpanel() {
  return gulp.src('src/assets/scss/fourcolumnpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/fourcolumnpanel'));
};
function heroslider() {
 return gulp.src('src/assets/scss/heroslider.scss')
    .pipe($.sass({
      includePaths: PATHS.sass
    })).pipe(gulp.dest(PATHS.dist + '/assets/css/heroslider'));
};
function fourcolumn_skewpanel() {
  return gulp.src('src/assets/scss/fourcolumn_skewpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/fourcolumn_skewpanel'));
};
function inlinevideo() {
  return gulp.src('src/assets/scss/inlinevideo.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/inlinevideo'));
};
function error() {
  return gulp.src('src/assets/scss/error.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/error'));
};
function chatbot() {
  return gulp.src('src/assets/scss/chatbot.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/chatbot'));
};
function followuspanel() {
  return gulp.src('src/assets/scss/followuspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/followuspanel'));
};
function subbanner() {
  return gulp.src('src/assets/scss/subbanner.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/subbanner'));
};
function alternative() {
  return gulp.src('src/assets/scss/alternative.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/alternative'));
};
function tabpanel() {
  return gulp.src('src/assets/scss/tabpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/tabpanel'));
};
function findlocation() {
  return gulp.src('src/assets/scss/findlocation.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/findlocation'));
};
function findbranch() {
  return gulp.src('src/assets/scss/findbranch.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/findbranch'));
};
function counterpanel(){
  return gulp.src('src/assets/scss/counterpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/counterpanel'));
};
function contentboxpanel(){
  return gulp.src('src/assets/scss/contentboxpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/contentboxpanel'));
};
function iconpanel(){
  return gulp.src('src/assets/scss/iconpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/iconpanel'));
};
function ratetable(){
  return gulp.src('src/assets/scss/ratetable.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/ratetable'));
};
function newsdetails(){
  return gulp.src('src/assets/scss/newsdetails.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/newsdetails'));
};
function contact(){
  return gulp.src('src/assets/scss/contact.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/contact'));
};
function locations(){
  return gulp.src('src/assets/scss/locations.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/locations'));
};
function locationdetails(){
  return gulp.src('src/assets/scss/locationdetails.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/locationdetails'));
};
function whowearepanel(){
  return gulp.src('src/assets/scss/whowearepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/whowearepanel'));
};
function ourvaluespanel(){
  return gulp.src('src/assets/scss/ourvaluespanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/ourvaluespanel'));
};
function workwithuspanel(){
  return gulp.src('src/assets/scss/workwithuspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/workwithuspanel'));
};
function timelinepanel(){
  return gulp.src('src/assets/scss/timelinepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/timelinepanel'));
};
function generalcontent(){
  return gulp.src('src/assets/scss/generalcontent.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/generalcontent'));
};
function fourcolumnboxpanel(){
  return gulp.src('src/assets/scss/fourcolumnboxpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/fourcolumnboxpanel'));
};
function iconboxpanel(){
  return gulp.src('src/assets/scss/iconboxpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/iconboxpanel'));
};
function videopanel(){
  return gulp.src('src/assets/scss/videopanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/videopanel'));
};
function downloadpanel(){
  return gulp.src('src/assets/scss/downloadpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/downloadpanel'));
};
function lenderspanel(){
  return gulp.src('src/assets/scss/lenderspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/lenderspanel'));
};
function searchresults(){
  return gulp.src('src/assets/scss/searchresults.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/searchresults'));
};
function teambiopanel() {
  return gulp.src('src/assets/scss/teambiopanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/teambiopanel'));
};
function ourteampanel() {
  return gulp.src('src/assets/scss/ourteampanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/ourteampanel'));
};
function accordion() {
  return gulp.src('src/assets/scss/accordion.scss')
      .pipe($.sass({
          includePaths: PATHS.sass
      })).pipe(gulp.dest(PATHS.dist + '/assets/css/accordion'));
};
function sitemap() {
  return gulp.src('src/assets/scss/sitemap.scss')
      .pipe($.sass({
          includePaths: PATHS.sass
      })).pipe(gulp.dest(PATHS.dist + '/assets/css/sitemap'));
};
function calculatorpanel() {
  return gulp.src('src/assets/scss/calculatorpanel.scss')
      .pipe($.sass({
          includePaths: PATHS.sass
      })).pipe(gulp.dest(PATHS.dist + '/assets/css/calculatorpanel'));
};
let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },

  devtool: !PRODUCTION && 'source-map'
 
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.terser()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js/'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin([
      $.imagemin.jpegtran({ progressive: true }),
    ])))
    .pipe(gulp.dest(PATHS.dist + '/assets/images'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  }, done);
}

// Compile Sass & Inject Into Browser
/*gulp.task('sass', function() {
    return gulp.src(['sass/*.scss'])
                .pipe(rename("style.css"))
                .pipe(sass({
                  style           : 'expanded',
                  //sourceComments  : 'map',
                  includePaths    : [paths.styles.src]
                }))
                .pipe(autoprefixer({
                    browsers  : ["last 2 version"],
                    cascade   : false
                }))
                .pipe(gulp.dest("css"))
                .pipe(rename({suffix: '.min'}))
                .pipe(minifycss())
                .pipe(gulp.dest("css"))
                .pipe(browserSync.reload({stream: true}));
});*/

gulp.task('minify-css', () => {
  return gulp.src('dist/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/data/**/*.{js,json,yml}').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/helpers/**/*.js').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(fourcolumnpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(heroslider, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(findlocation, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(findbranch, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inlinevideo, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(error, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(followuspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(tabpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(chatbot, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(subbanner, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(fourcolumn_skewpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alternative, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(counterpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contentboxpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(iconpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ratetable, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(newsdetails, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contact, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(locations, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(locationdetails, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(whowearepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ourvaluespanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(workwithuspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(timelinepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(generalcontent, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(fourcolumnboxpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(videopanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(downloadpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(iconboxpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(lenderspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(searchresults, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(teambiopanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ourteampanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(accordion, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sitemap, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(calculatorpanel, browser.reload));
}
