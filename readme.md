git init - инициализация git-репозитория

Команды:

npm i - чтобы установить gulp локально и все другие зависимости, указанные в package.json

gulp - запустить сборку

gulp docs - запустить сборку на продакшен (финальная версия файлов, с минификацией, группировкой медиазапросов и т.д., то, что будет размещено в Интернете)

====================================================

Gulp умееть только создавать и организовывать задачи:

gulp.task() - определить задачу
gulp.src() - взять исходные файлы
pipe() - "закинуть в трубу", внутри которой применить плагин для обработки файлов
gulp.dest() - получить сохранившийся результат
gulp.parallel() - запустить несколько задач параллельно (одновременно)
gulp.series() - запустить несколько задач последовательно
gulp.watch() - следить за файлами

Пакеты, которые нужно установить

Команда для установки всех пакетов:

npm i gulp gulp-sass sass gulp-file-include gulp-clean gulp-server-livereload gulp-sourcemaps gulp-plumber gulp-notify gulp-group-css-media-queries --save-dev

Описание пакетов:

gulp - собственно Gulp
gulp-sass - Сборка SASS / SCSS
sass - Необходим для сборки SASS / SCSS
gulp-file-include - Подключение файлов друг в друга. HTML include
gulp-clean - Удаление файлов
gulp-server-livereload - Сервер с автообновлением страницы
gulp-sourcemaps - Исходные карты для CSS
gulp-plumber - Фикс ошибок при сборке
gulp-notify - Нотификации
gulp-group-css-media-queries - Группировка CSS-медиазапросов
