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
import autoprefixer  from 'autoprefixer';
import imagemin      from 'gulp-imagemin';
import postcss       from 'gulp-postcss';
import pxtorem       from 'postcss-pxtorem';

const sass = require('gulp-sass')(require('sass-embedded'));
const uncss = require('postcss-uncss');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
function loadConfig() {
  const unsafe = require('js-yaml-js-types').all;
  const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile, {schema});
}
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

console.log(UNCSS_OPTIONS);

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
  gulp.series(clean, gulp.parallel(pages, javascript, images, copy), subbanner, productType, productTabPanel, productimage, productTilePanel, productCompare, rateChartPanel, generalcontent, hometabpanel, error, fivestarpanel, twoColumnVideo, sassBuild, styleGuide, productHighlight, heroslider, socialPanel, inlinevideo, promotionalRates, personWeek, locations, ourteampanel, biodetails, testimonial, newsdetails, newslist, featuredarticlepanel, eventgallerysliderpanel, alreadypanel, contactpanel, ourmissionpanel, fivstarservicepanel, ourcommitmentpanel, bankingdrivenpanel, bankingtextpanel, bankingvideopanel, finacialresourcepanel, benefitspanel, schoolsliderpanel, searchpanel, faqpanel)
);

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch)
);

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
 
function sassBuild() {

  const postCssPlugins = [
    // Autoprefixer
    autoprefixer(),
     pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),
    // UnCSS - Uncomment to remove unused styles in production
    // PRODUCTION && uncss(UNCSS_OPTIONS),
  ].filter(Boolean);

  return gulp.src('src/assets/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass({
    includePaths: PATHS.sass,
  }).on('error', sass.logError))
  .pipe(postcss(postCssPlugins))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(PATHS.dist + '/assets/css/global'))
  .pipe(browser.reload({ stream: true }));
}
function heroslider() {
     const postCssPlugins = [
      // Autoprefixer
      autoprefixer(),
      pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),
      // UnCSS - Uncomment to remove unused styles in production
      // PRODUCTION && uncss(UNCSS_OPTIONS),
    ].filter(Boolean);
  
    return gulp.src('src/assets/scss/heroslider.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      includePaths: PATHS.sass
    }).on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.dist + '/assets/css/heroslider'))
    .pipe(browser.reload({ stream: true }));
 };

 function productHighlight() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productHighlight.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productHighlight'))
 .pipe(browser.reload({ stream: true }));
};

function twoColumnVideo() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/twoColumnVideo.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/twoColumnVideo'))
 .pipe(browser.reload({ stream: true }));
};


function hometabpanel() {
  const postCssPlugins = [
   // Autoprefixer
   autoprefixer(),
   // UnCSS - Uncomment to remove unused styles in production
   // PRODUCTION && uncss(UNCSS_OPTIONS),
 ].filter(Boolean);

 return gulp.src('src/assets/scss/hometabpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/hometabpanel'))
 .pipe(browser.reload({ stream: true }));
}; 

function fivestarpanel() {
  const postCssPlugins = [
   // Autoprefixer
   autoprefixer(),
   // UnCSS - Uncomment to remove unused styles in production
   // PRODUCTION && uncss(UNCSS_OPTIONS),
 ].filter(Boolean);

 return gulp.src('src/assets/scss/fivestarpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/fivestarpanel'))
 .pipe(browser.reload({ stream: true }));
};

function error() {
  const postCssPlugins = [
   // Autoprefixer
   autoprefixer(),
   // UnCSS - Uncomment to remove unused styles in production
   // PRODUCTION && uncss(UNCSS_OPTIONS),
 ].filter(Boolean);

 return gulp.src('src/assets/scss/error.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/error'))
 .pipe(browser.reload({ stream: true }));
};

function socialPanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/socialPanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/socialPanel'))
 .pipe(browser.reload({ stream: true }));
};


function inlinevideo() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/inlinevideo.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/inlinevideo'))
 .pipe(browser.reload({ stream: true }));
};


function promotionalRates() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/promotionalRates.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/promotionalRates'))
 .pipe(browser.reload({ stream: true }));
};

function personWeek() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/personWeek.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/personWeek'))
 .pipe(browser.reload({ stream: true }));
};

function subbanner() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/subbanner.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/subbanner'))
 .pipe(browser.reload({ stream: true }));
};

function productType() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productType.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productType'))
 .pipe(browser.reload({ stream: true }));
};
function productTabPanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productTabPanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productTabPanel'))
 .pipe(browser.reload({ stream: true }));
};
function productimage() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productimage.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productimage'))
 .pipe(browser.reload({ stream: true }));
};

function productTilePanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productTilePanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productTilePanel'))
 .pipe(browser.reload({ stream: true }));
};

function productCompare() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/productCompare.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/productCompare'))
 .pipe(browser.reload({ stream: true }));
};

function rateChartPanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/rateChartPanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/rateChartPanel'))
 .pipe(browser.reload({ stream: true }));
};

function generalcontent() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/generalcontent.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/generalcontent'))
 .pipe(browser.reload({ stream: true }));
};

function locations() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/locations.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/locations'))
 .pipe(browser.reload({ stream: true }));
};

function ourteampanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/ourteampanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/ourteampanel'))
 .pipe(browser.reload({ stream: true }));
};

function biodetails() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/biodetails.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/biodetails'))
 .pipe(browser.reload({ stream: true }));
};

function testimonial() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/testimonial.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/testimonial'))
 .pipe(browser.reload({ stream: true }));
};


function newsdetails() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/newsdetails.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/newsdetails'))
 .pipe(browser.reload({ stream: true }));
};

function newslist() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/newslist.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/newslist'))
 .pipe(browser.reload({ stream: true }));
};

function featuredarticlepanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/featuredarticlepanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/featuredarticlepanel'))
 .pipe(browser.reload({ stream: true }));
};

function eventgallerysliderpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/eventgallerysliderpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/eventgallerysliderpanel'))
 .pipe(browser.reload({ stream: true }));
};

function alreadypanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/alreadypanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/alreadypanel'))
 .pipe(browser.reload({ stream: true }));
};

function contactpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/contactpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/contactpanel'))
 .pipe(browser.reload({ stream: true }));
};


function ourmissionpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/ourmissionpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/ourmissionpanel'))
 .pipe(browser.reload({ stream: true }));
};

function fivstarservicepanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/fivstarservicepanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/fivstarservicepanel'))
 .pipe(browser.reload({ stream: true }));
};
function ourcommitmentpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/ourcommitmentpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/ourcommitmentpanel'))
 .pipe(browser.reload({ stream: true }));
};

function bankingdrivenpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/bankingdrivenpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/bankingdrivenpanel'))
 .pipe(browser.reload({ stream: true }));
};

function bankingtextpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/bankingtextpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/bankingtextpanel'))
 .pipe(browser.reload({ stream: true }));
};

function bankingvideopanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/bankingvideopanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/bankingvideopanel'))
 .pipe(browser.reload({ stream: true }));
};



function finacialresourcepanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/finacialresourcepanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/finacialresourcepanel'))
 .pipe(browser.reload({ stream: true }));
};


function benefitspanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/benefitspanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/benefitspanel'))
 .pipe(browser.reload({ stream: true }));
};


function schoolsliderpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/schoolsliderpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/schoolsliderpanel'))
 .pipe(browser.reload({ stream: true }));
};

function searchpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/searchpanel.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/searchpanel'))
 .pipe(browser.reload({ stream: true }));
};


function faqpanel() {
  const postCssPlugins = [ 
   autoprefixer(), 
 ].filter(Boolean);

 return gulp.src('src/assets/scss/faq.scss')
 .pipe(sourcemaps.init())
 .pipe(plumber())
 .pipe(sass({
   includePaths: PATHS.sass
 }).on('error', sass.logError))
 .pipe(postcss(postCssPlugins))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest(PATHS.dist + '/assets/css/faq'))
 .pipe(browser.reload({ stream: true }));
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
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ])))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  }, done);
}

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
  gulp.watch('src/assets/scss/**/*.scss').on('all', sassBuild);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(heroslider, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(promotionalRates, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(socialPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(personWeek, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productHighlight, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(twoColumnVideo, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(fivestarpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(hometabpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(error, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(subbanner, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productType, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productTabPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productimage, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(generalcontent, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productTilePanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(productCompare, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(rateChartPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(locations, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ourteampanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(biodetails, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(testimonial, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(newsdetails, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(newslist, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(featuredarticlepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(eventgallerysliderpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alreadypanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contactpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ourmissionpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(fivstarservicepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(ourcommitmentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bankingdrivenpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bankingtextpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bankingvideopanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(finacialresourcepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(benefitspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(schoolsliderpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(searchpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(faqpanel, browser.reload));
}
