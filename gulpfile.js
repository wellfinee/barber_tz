import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";
import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import clean from "gulp-clean";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

const { src, dest, watch, parallel, series } = gulp;
const scss = gulpSass(dartSass);
const bs = browserSync.create();

// 📌 Автосервер
export function browsersync() {
    bs.init({
        server: { baseDir: "app/" },
        notify: false,
        online: true
    });
}

export function styles() {
    return src("app/scss/style.scss")
      .pipe(scss({ outputStyle: "compressed" })) // минификация CSS
      .pipe(concat("style.min.css"))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 10 versions"],
          grid: true,
        })
      )
      .pipe(dest("app/css"))
      .pipe(bs.stream());
  }
// 📌 Минификация JS
export function scripts() {
    return src([
        "node_modules/gsap/dist/gsap.min.js",
        "node_modules/gsap/dist/ScrollTrigger.min.js",
        "app/js/**/*.js", 
        "!app/js/main.min.js"
    ])
    .pipe(concat("main.min.js"))  // Собираем все файлы в один
    .pipe(uglify.default())       // Минифицируем JS
    .pipe(dest("app/js"))         // Кладём в итоговую папку
    .pipe(bs.stream());           // Обновляем браузер
}


// 📌 Оптимизация изображений
export function images() {
    return src("app/img/*")
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75, progressive: true }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]))
        .pipe(dest("app/img"));
}

// 📌 Конвертация изображений в WebP
export function webpImages() {
    return src("app/img/*.{jpg,jpeg,png}")
        .pipe(webp({  quality: 90, lossless: true}))
        .pipe(dest("app/img/webp"))
        // .pipe(dest("dist/img/webp"));
}

// 📌 Очистка папки `dist`
export function cleanDist() {
    return src("dist", { allowEmpty: true }).pipe(clean());
}

// 📌 Копирование файлов в `dist`
export function build() {
    return src([
        "app/css/style.min.css",
        "app/js/main.min.js",
        "app/*.html",
        "app/fonts/**/*",
    ], { base: "app" })
        .pipe(dest("dist"));
}

// 📌 Автообновление при изменении файлов
export function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on("change", bs.reload);
}

// 📌 Экспорт команд
export default parallel(styles, scripts, browsersync, watching);
export const buildProject = series(cleanDist, styles, scripts, images, webpImages, build);
