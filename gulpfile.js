const { src, dest } = require('gulp');
const clean = require('gulp-clean');

const cleandist = () =>{
    return src('dist').pipe(clean());
}
const copy= () => {
    return src('src/routes/build/**/*')
    .pipe(dest('dist/routes/build'));
}

exports.copy = copy;
exports.cleandist = cleandist; 