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
import postcss from 'postcss';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';

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
 gulp.series(clean, gulp.parallel(pages, javascript, images, copy), clamp, videolistpanel, videosliderpanel, sitemap, generalContent, alumniTitleDescription, alumnijobopportunities, alumniupdateprofile, alumnidescription, careerdevelopment, careertrainingprogram, careercolleague, careerprogramdevelop, careerparalegalqualified, careerbusinesscontact, careerbusinesscontent, careerbusinesspolicy, careerparalegal, careerstaff, careerAccordion, careerrecruitment, careerbenefits, careerapplicationprocess, careersalary, careersummerprogram, careersummerprogramlocation, careereverify, careersummerassociate, careerinsight, careerrecentnews, inclusionwomenleader, inclusionwomennumber, inclusionprogram, inclusiontransforming, inclusionstrategic, inclusionworkingPanel, inclusionoursupplier, inclusionracialPanel, inclusionscholarshipPanel, inclusionpipeline, inclusiondiversityPanel, inclusioncurriculum, inclusiongenderPanel, inclusioncontentpanel, timelinepanel, partnercontentpanel, tabphorizonpanel, alumninewspanel, alumnifaq, alumninetwork, alumnispot, alumnicontentpanel, firmLeadersPanel, firmcontentimagepanel, firmcontentpanel,  firmBulletPanel , insightspanel, searchResult, contactPanel, videoDetail, signatoriespanel, sharepanel, publicEvent, practicePanel, locationLanding, recentnewspanel, contentpanel, lawyerspanel, locations, sass, styleGuide,  searchpanel, practice_ares_panel, statics, herobanner, insights, newspanel, error, homelocation,  findbranch,  firmnews, subbanner, twocolumscontentpanel, quotateboxpanel, awardscontentpanel, recognitionpanel, recentengamentpanel, podcastoverviewpanel, spotlightfaqpanel, threequestiondetailspanel, inclutionculturepanel, whypaulweisspanel, inclusionnetworkPanel, inclusionNumbersPanel, inclusionrecognition, inclusioncolleaguepanel));

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
    // Other plugins can go here...
  ].filter(Boolean);

  return gulp.src('src/assets/scss/style.scss')
    .pipe($.sass({ includePaths: PATHS.sass }).on('error', $.sass.logError))
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe(gulp.dest(PATHS.dist + '/assets/css/global'))
    .pipe(browser.reload({ stream: true }));
}
function searchpanel() {
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/searchpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
    .pipe($.postcss(postCssPlugins))
    .pipe(gulp.dest(PATHS.dist + '/assets/css/searchpanel'));
};
function herobanner() {
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
    // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
  ]
 return gulp.src('src/assets/scss/herobanner.scss')
    .pipe($.sass({
      includePaths: PATHS.sass
    }))
    .pipe($.postcss(postCssPlugins))
    .pipe(gulp.dest(PATHS.dist + '/assets/css/herobanner'));
};
function practice_ares_panel() {
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
    }),]
  return gulp.src('src/assets/scss/practice_ares_panel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/practice_ares_panel'));
};
function newspanel() {
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
    }),]
  return gulp.src('src/assets/scss/newspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/newspanel'));
};
function error() {
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
    }),]
  return gulp.src('src/assets/scss/error.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/error'));
};
function statics() {
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
    }),]
  return gulp.src('src/assets/scss/statics.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/statics'));
};
function homelocation() {
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
    }),]
  return gulp.src('src/assets/scss/homelocation.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/homelocation'));
};
function subbanner() {
  const postCssPlugins = [
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
    // Other plugins can go here...
  ]
  return gulp.src('src/assets/scss/subbanner.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/subbanner'));
};
function firmnews() {
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
    }),]
  return gulp.src('src/assets/scss/firmnews.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/firmnews'));
};
// function tabpanel() {
//   return gulp.src('src/assets/scss/tabpanel.scss')
//      .pipe($.sass({
//        includePaths: PATHS.sass
//      })).pipe(gulp.dest(PATHS.dist + '/assets/css/tabpanel'));
// };
function insights() {
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
    }),]
  return gulp.src('src/assets/scss/insights.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/insights'));
};
function findbranch() {
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
    }),]
  return gulp.src('src/assets/scss/bioPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/bioPanel'));
};
function twocolumscontentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/twocolumscontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/twocolumscontentpanel'));
};
function quotateboxpanel(){
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
    }),]
  return gulp.src('src/assets/scss/quotateboxpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/quotateboxpanel'));
};
function awardscontentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/awardscontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/awardscontentpanel'));
};
function recognitionpanel(){
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
    }),]
  return gulp.src('src/assets/scss/recognitionpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/recognitionpanel'));
};
function recentengamentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/recentengamentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/recentengamentpanel'));
};
function locations(){
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
    }),]
  return gulp.src('src/assets/scss/locations.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/locations'));
};
function lawyerspanel(){
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
    }),]
  return gulp.src('src/assets/scss/lawyerspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/lawyerspanel'));
};
function contentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/contentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/contentpanel'));
};
function recentnewspanel(){
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
    }),]
  return gulp.src('src/assets/scss/recentnewspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/recentnewspanel'));
};
function practicePanel(){
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
    }),]
  return gulp.src('src/assets/scss/practicePanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/practicePanel'));
};
function locationLanding(){
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
    }),]
  return gulp.src('src/assets/scss/locationLanding.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/locationLanding'));
};
function publicEvent(){
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
    }),]
  return gulp.src('src/assets/scss/publicEvent.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/publicEvent'));
};
function sharepanel(){
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
    }),]
  return gulp.src('src/assets/scss/sharepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/sharepanel'));
};
function signatoriespanel(){
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
    }),]
  return gulp.src('src/assets/scss/signatoriespanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/signatoriespanel'));
};
function videoDetail(){
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
    }),]
  return gulp.src('src/assets/scss/videoDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/videoDetail'));
};
function contactPanel(){
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
    }),]
  return gulp.src('src/assets/scss/contactPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/contactPanel'));
};
function searchResult(){
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
    }),]
  return gulp.src('src/assets/scss/searchResult.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/searchResult'));
};
function insightspanel(){
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
    }),]
  return gulp.src('src/assets/scss/insightspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/insightspanel'));
};
function firmBulletPanel(){
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
    }),]
  return gulp.src('src/assets/scss/firmBulletPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/firmBulletPanel'));
};
function firmcontentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/firmcontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/firmcontentpanel'));
};
function firmcontentimagepanel(){
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
    }),]
  return gulp.src('src/assets/scss/firmcontentimagepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/firmcontentimagepanel'));
};
function firmLeadersPanel(){
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
    }),]
  return gulp.src('src/assets/scss/firmLeadersPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/firmLeadersPanel'));
};
function alumnicontentpanel(){
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
    }),]
  return gulp.src('src/assets/scss/alumnicontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumnicontentpanel'));
};
function alumninetwork(){
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
    }),]
  return gulp.src('src/assets/scss/alumninetwork.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumninetwork'));
};
function alumnispot(){
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
    }),]
  return gulp.src('src/assets/scss/alumnispot.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumnispot'));
};
function alumnifaq(){
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
    }),]
  return gulp.src('src/assets/scss/alumnifaq.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumnifaq'));
};
function alumninewspanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/alumninewspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumninewspanel'));
};
function tabphorizonpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/tabphorizonpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/tabphorizonpanel'));
};
function partnercontentpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/partnercontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/partnercontentpanel'));
};
function timelinepanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/timelinepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/timelinepanel'));
};
function podcastoverviewpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/podcastoverviewpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/podcastoverviewpanel'));
};
function spotlightfaqpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/spotlightfaqpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/spotlightfaqpanel'));
};
function threequestiondetailspanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/threequestiondetailspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/threequestiondetailspanel'));
};
function inclusioncontentpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusioncontentpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusioncontentpanel'));
};
function inclutionculturepanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclutionculturepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclutionculturepanel'));
};
function whypaulweisspanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/whypaulweisspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/whypaulweisspanel'));
};
function inclusionnetworkPanel(){
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
    }),]
  return gulp.src('src/assets/scss/inclusionnetworkPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionnetworkPanel'));
};
function inclusionNumbersPanel(){
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
    }),]
  return gulp.src('src/assets/scss/inclusionNumbersPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionNumbersPanel'));
};
function inclusionrecognition(){
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
    }),]
  return gulp.src('src/assets/scss/inclusionrecognition.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionrecognition'));
};
function inclusioncolleaguepanel(){
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
    }),]
  return gulp.src('src/assets/scss/inclusioncolleaguepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusioncolleaguepanel'));
};
function inclusiongenderPanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusiongenderPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusiongenderPanel'));
};
function inclusioncurriculum(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusioncurriculum.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusioncurriculum'));
};
function inclusiondiversityPanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusiondiversityPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusiondiversityPanel'));
};
function inclusionscholarshipPanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionscholarshipPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionscholarshipPanel'));
};
function inclusionracialPanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionracialPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionracialPanel'));
};
function inclusionoursupplier(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionoursupplier.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionoursupplier'));
};
function inclusionworkingPanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionworkingPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionworkingPanel'));
};
function inclusionpipeline(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionpipeline.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionpipeline'));
};
function inclusionwomenleader(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionwomenleader.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionwomenleader'));
};
function inclusionprogram(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionprogram.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionprogram'));
};
function inclusiontransforming(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusiontransforming.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusiontransforming'));
};
function inclusionstrategic(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionstrategic.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionstrategic'));
};
function inclusionwomennumber(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/inclusionwomennumber.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/inclusionwomennumber'));
};
function careerinsight(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerinsight.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerinsight'));
};
function careerrecentnews(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerrecentnews.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerrecentnews'));
};
function careersummerassociate(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careersummerassociate.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careersummerassociate'));
};
function careersummerprogramlocation(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careersummerprogramlocation.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careersummerprogramlocation'));
};
function careereverify(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careereverify.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careereverify'));
};
function careersummerprogram(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careersummerprogram.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careersummerprogram'));
};
function careerapplicationprocess(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerapplicationprocess.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerapplicationprocess'));
};
function careersalary(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careersalary.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careersalary'));
};
function careerbenefits(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerbenefits.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerbenefits'));
};
function careerrecruitment(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerrecruitment.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerrecruitment'));
};
function careerAccordion(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerAccordion.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerAccordion'));
};
function careerstaff(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerstaff.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerstaff'));
};
function careerparalegal(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerparalegal.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerparalegal'));
};
function careerbusinesscontact(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerbusinesscontact.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerbusinesscontact'));
};
function careerbusinesscontent(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerbusinesscontent.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerbusinesscontent'));
};
function careerbusinesspolicy(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerbusinesspolicy.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerbusinesspolicy'));
};
function careerparalegalqualified(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerparalegalqualified.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerparalegalqualified'));
};
function careerprogramdevelop(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerprogramdevelop.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerprogramdevelop'));
};
function careertrainingprogram(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careertrainingprogram.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careertrainingprogram'));
};
function careerdevelopment(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careerdevelopment.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careerdevelopment'));
};
function careercolleague(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/careercolleague.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/careercolleague'));
};
function alumnidescription(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/alumnidescription.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumnidescription'));
};
function alumniupdateprofile(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/alumniupdateprofile.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumniupdateprofile'));
};
function alumnijobopportunities(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/alumnijobopportunities.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumnijobopportunities'));
};
function alumniTitleDescription(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/alumniTitleDescription.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/alumniTitleDescription'));
};
function sitemap(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/sitemap.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/sitemap'));
};
function generalContent(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/generalContent.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/generalContent'));
};
function videosliderpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/videosliderpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/videosliderpanel'));
};
function videolistpanel(){
  const postCssPlugins = [ 
    autoprefixer(),
    pxtorem({ // Configure options for postcss-pxtorem
      rootValue: 16, // Set the root font-size; adjust as needed
      unitPrecision: 5, // Decimal precision of rem units
      propList: ['*'], // Properties to convert
      selectorBlackList: [], // Selectors to ignore
      replace: true, // Replace pixels with rems
      mediaQuery: false, // Enable/Disable conversion in media queries
      minPixelValue: 0 // Minimum pixel value to replace
    }),]
  return gulp.src('src/assets/scss/videolistpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     }))
     .pipe($.postcss(postCssPlugins))
     .pipe(gulp.dest(PATHS.dist + '/assets/css/videolistpanel'));
};
function clamp(){
  return gulp.src('src/assets/scss/clamp.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/clamp'));
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
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(searchpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(herobanner, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(insights, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(findbranch, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(newspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(error, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(homelocation, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(statics, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(practice_ares_panel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(firmnews, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(subbanner, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(twocolumscontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(quotateboxpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(awardscontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(recognitionpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(recentengamentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(locations, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(lawyerspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(recentnewspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(locationLanding, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(practicePanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(publicEvent, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(signatoriespanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sharepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(videoDetail, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contactPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(searchResult, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(insightspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(firmBulletPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(firmcontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(firmcontentimagepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(firmLeadersPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumnicontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumninetwork, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumnispot, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumnifaq, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumninewspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(timelinepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(partnercontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(tabphorizonpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusioncontentpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(podcastoverviewpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(spotlightfaqpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(threequestiondetailspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclutionculturepanel, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(whypaulweisspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionnetworkPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionNumbersPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionrecognition, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusioncolleaguepanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusiongenderPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionworkingPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusioncurriculum, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusiondiversityPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionscholarshipPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionracialPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionoursupplier, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionpipeline, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionwomenleader, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionprogram, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusiontransforming, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionstrategic, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inclusionwomennumber, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerinsight, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerrecentnews, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careersummerassociate, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careersummerprogramlocation, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careereverify, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careersummerprogram, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerapplicationprocess, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careersalary, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerbenefits, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerrecruitment, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerAccordion, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerstaff, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerparalegal, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerbusinesscontact, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerbusinesscontent, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerbusinesspolicy, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerparalegalqualified, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerprogramdevelop, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careerdevelopment, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careertrainingprogram, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(careercolleague, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumnidescription, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumniupdateprofile, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumnijobopportunities, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(alumniTitleDescription, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(clamp, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sitemap, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(generalContent, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(videolistpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(videosliderpanel, browser.reload));
}
