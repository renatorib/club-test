const { resolve } = require('path');

const own = (path) => resolve(__dirname, '..', path); // files from club
const app = (path) => resolve(path); // files from using-club

module.exports = { own, app };
