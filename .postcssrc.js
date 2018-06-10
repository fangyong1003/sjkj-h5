// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path');

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {
      path: path.resolve(__dirname, 'src/assets/styles')
    },
    "precss": {},
    "autoprefixer": {}
  }
}
