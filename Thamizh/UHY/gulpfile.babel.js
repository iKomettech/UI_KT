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
 gulp.series(clean, gulp.parallel(pages, javascript, images, copy), sitemap, clientportal, newsroom, location, career, uhyCare, transaction, generalContent, timelinepanel, aboutUs, btnPanel, pattern, featureSlide, deiPanel, bioDetail, leadership, eventDetail, findProfessional, serviceDetail, subService, sass, helpCard, insights, advisory, contact, services, industriesHealthcare, styleGuide, herobanner, nextmove, testiMonial, findlocation, tabpanel, bannertwocolumn, inlinevideo, error, trendingpanel, followuspanel, searchpanel, insightsDetail, industryLanding, authorPanel, bannerPanel, overviewCard, industriesManufacture, industryCard, relatedSlidePanel, teamSlidePanel, industryDetail));

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

function herobanner() {
 return gulp.src('src/assets/scss/herobanner.scss')
    .pipe($.sass({
      includePaths: PATHS.sass
    })).pipe(gulp.dest(PATHS.dist + '/assets/css/herobanner'));
};
function bannertwocolumn() {
  return gulp.src('src/assets/scss/bannertwocolumn.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/bannertwocolumn'));
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
function nextmove() {
  return gulp.src('src/assets/scss/nextmove.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/nextmove'));
};
function followuspanel() {
  return gulp.src('src/assets/scss/followuspanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/followuspanel'));
};
function searchpanel() {
  return gulp.src('src/assets/scss/searchpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/searchpanel'));
};
function trendingpanel() {
  return gulp.src('src/assets/scss/trendingpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/trendingpanel'));
};
function findlocation() {
  return gulp.src('src/assets/scss/findlocation.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/findlocation'));
};
function tabpanel() {
  return gulp.src('src/assets/scss/tabpanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/tabpanel'));
};
function insightsDetail() {
  return gulp.src('src/assets/scss/insightsDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/insightsDetail'));
};
function industryLanding() {
  return gulp.src('src/assets/scss/industryLanding.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/industryLanding'));
};
function authorPanel() {
  return gulp.src('src/assets/scss/authorPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/authorPanel'));
};
function bannerPanel() {
  return gulp.src('src/assets/scss/bannerPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/bannerPanel'));
};
function overviewCard() {
  return gulp.src('src/assets/scss/overviewCard.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/overviewCard'));
};
function industriesManufacture() {
  return gulp.src('src/assets/scss/industriesManufacture.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/industriesManufacture'));
};
function industryCard() {
  return gulp.src('src/assets/scss/industryCard.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/industryCard'));
};
function relatedSlidePanel() {
  return gulp.src('src/assets/scss/relatedSlidePanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/relatedSlidePanel'));
};
function teamSlidePanel() {
  return gulp.src('src/assets/scss/teamSlidePanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/teamSlidePanel'));
};
function industryDetail() {
  return gulp.src('src/assets/scss/industryDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/industryDetail'));
};
function testiMonial() {
  return gulp.src('src/assets/scss/testiMonial.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/testiMonial'));
};
function industriesHealthcare() {
  return gulp.src('src/assets/scss/industriesHealthcare.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/industriesHealthcare'));
};
function services() {
  return gulp.src('src/assets/scss/services.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/services'));
};
function advisory() {
  return gulp.src('src/assets/scss/advisory.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/advisory'));
};
function contact() {
  return gulp.src('src/assets/scss/contact.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/contact'));
};
function insights() {
  return gulp.src('src/assets/scss/insights.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/insights'));
};
function helpCard() {
  return gulp.src('src/assets/scss/helpCard.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/helpCard'));
};
function subService() {
  return gulp.src('src/assets/scss/subService.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/subService'));
};
function serviceDetail() {
  return gulp.src('src/assets/scss/serviceDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/serviceDetail'));
};
function findProfessional() {
  return gulp.src('src/assets/scss/findProfessional.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/findProfessional'));
};
function eventDetail() {
  return gulp.src('src/assets/scss/eventDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/eventDetail'));
};
function leadership() {
  return gulp.src('src/assets/scss/leadership.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/leadership'));
};
function bioDetail() {
  return gulp.src('src/assets/scss/bioDetail.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/bioDetail'));
};
function deiPanel() {
  return gulp.src('src/assets/scss/dei.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/dei'));
};
function featureSlide() {
  return gulp.src('src/assets/scss/featureSlide.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/featureSlide'));
};
function pattern() {
  return gulp.src('src/assets/scss/pattern.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/pattern'));
};
function btnPanel() {
  return gulp.src('src/assets/scss/btnPanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/btnPanel'));
};
function aboutUs() {
  return gulp.src('src/assets/scss/aboutUs.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/aboutUs'));
};
function timelinepanel() {
  return gulp.src('src/assets/scss/timelinepanel.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/timelinepanel'));
};
function transaction() {
  return gulp.src('src/assets/scss/transaction.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/transaction'));
};
function generalContent() {
  return gulp.src('src/assets/scss/generalContent.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/generalContent'));
};
function uhyCare() {
  return gulp.src('src/assets/scss/uhyCare.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/uhyCare'));
};
function career() {
  return gulp.src('src/assets/scss/career.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/career'));
};
function location() {
  return gulp.src('src/assets/scss/location.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/location'));
};
function newsroom() {
  return gulp.src('src/assets/scss/newsroom.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/newsroom'));
};
function clientportal() {
  return gulp.src('src/assets/scss/clientportal.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/clientportal'));
};
function sitemap() {
  return gulp.src('src/assets/scss/sitemap.scss')
     .pipe($.sass({
       includePaths: PATHS.sass
     })).pipe(gulp.dest(PATHS.dist + '/assets/css/sitemap'));
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
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(herobanner, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bannertwocolumn, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(findlocation, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(nextmove, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(inlinevideo, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(error, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(followuspanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(trendingpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(searchpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(tabpanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(insightsDetail, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(industryLanding, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(authorPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bannerPanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(overviewCard, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(industriesManufacture, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(industryCard, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(relatedSlidePanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(teamSlidePanel, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(industryDetail, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(testiMonial, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(industriesHealthcare, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(services, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(advisory, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(contact, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(insights, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(helpCard, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(subService, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(serviceDetail, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(findProfessional, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(eventDetail, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(leadership, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(bioDetail, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(deiPanel, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(featureSlide, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(pattern, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(btnPanel, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(aboutUs, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(timelinepanel, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(generalContent, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(transaction, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(uhyCare, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(career, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(location, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(newsroom, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(clientportal, browser.reload)); 
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sitemap, browser.reload)); 
}
