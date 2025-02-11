const gulp = require("gulp");
const replace = require("gulp-replace");

// HTML

const fileInclude = require("gulp-file-include");
const htmlclean = require("gulp-htmlclean");
// С webpHTML html-файла не оказывается в финальной папке почему-то. Поэтому отключу
// const webpHTML = require("gulp-webp-html");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
// const webpCss = require("gulp-webp-css");

// const server = require("gulp-server-livereload");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const fs = require("fs");
// Здесь sourceMaps, по идее, не нужен. Отключим.
// const sourceMaps = require("gulp-sourcemaps");

// Группировка медиазапросов. Лучше не использовать во время разработки. Потому что, в частности, появляются баги в работе sourceMaps. Плюс, имеет смысл использовать при mobile first (на мой взгляд).
const groupMedia = require("gulp-group-css-media-queries");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");

// Images
// gulp-imagemin - сжимает картинки
const imagemin = require("gulp-imagemin");
// const webp = require("gulp-webp");
// Не работает у меня gulp-changed последней версии. В документации не так, как в видео. Установил версию 4.0.3. Заработало
const changed = require("gulp-changed");

gulp.task("clean:docs", function (done) {
  if (fs.existsSync("./docs/")) {
    return gulp.src("./docs/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("html:docs", function () {
  return (
    gulp
      .src(["./src/html/**/*.html", "!./src/html/blocks/**/*.html"])
      .pipe(changed("./docs/"))
      .pipe(plumber(plumberNotify("HTML")))
      .pipe(fileInclude(fileIncludeSetting))
      .pipe(
        replace(
          /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
          "$1./$4$5$7$1"
        )
      )
      // С webpHTML html-файла не оказывается в финальной папке почему-то. Поэтому отключу
      // .pipe(webpHTML())
      .pipe(htmlclean())
      .pipe(gulp.dest("./docs/"))
      .pipe(browserSync.stream())
  );
});

gulp.task("sass:docs", function () {
  return (
    gulp
      .src("./src/scss/*.scss")
      .pipe(changed("./docs/css/"))
      .pipe(plumber(plumberNotify("SCSS")))
      // .pipe(sourceMaps.init())
      .pipe(sassGlob())
      // .pipe(webpCss())
      .pipe(sass())
      .pipe(
        replace(
          /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
          "$1$2$3$4$6$1"
        )
      )``
      .pipe(autoprefixer())
      // Группировка медиазапросов. Лучше не использовать во время разработки. Потому что, в частности, появляются баги в работе sourceMaps. Плюс, имеет смысл использовать при mobile first (на мой взгляд).
      .pipe(groupMedia())
      .pipe(csso())
      // .pipe(sourceMaps.write())
      .pipe(gulp.dest("./docs/css/"))
      .pipe(browserSync.stream())
  );
});

gulp.task("images:docs", function () {
  return (
    gulp
      .src("./src/img/**/*")
      // Не работает у меня gulp-changed последней версии. В документации не так, как в видео Установил версию 4.0.3
      .pipe(changed("./docs/img/"))
      // .pipe(webp())
      .pipe(gulp.dest("./docs/img/"))
      .pipe(gulp.src("./src/img/**/*"))
      .pipe(changed("./docs/img/"))
      // imagemin - сжимает картинки
      .pipe(imagemin({ verbose: true }))
      .pipe(gulp.dest("./docs/img/"))
      .pipe(browserSync.stream())
  );
});

gulp.task("fonts:docs", function () {
  return gulp
    .src("./src/fonts/**/*")
    .pipe(changed("./docs/fonts/"))
    .pipe(gulp.dest("./docs/fonts/"))
    .pipe(browserSync.stream());
});

gulp.task("files:docs", function () {
  return gulp
    .src("./src/files/**/*")
    .pipe(changed("./docs/files/"))
    .pipe(gulp.dest("./docs/files/"))
    .pipe(browserSync.stream());
});

gulp.task("js:docs", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./docs/js/"))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./docs/js"))
    .pipe(browserSync.stream());
});

// const serverOptions = {
//   livereload: true,
//   open: true,
// };

// gulp.task("server:docs", function () {
//   return gulp.src("./docs/").pipe(server(serverOptions));
// });

gulp.task("browsersync:docs", function () {
  browserSync.init({
    server: {
      baseDir: "./docs/",
    },
  });
});
