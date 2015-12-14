const path = require('path');
const BASE = path.resolve(__dirname, '..', 'front');

module.exports = {
    port: 3000,
    appDir: BASE,
    public: path.resolve(BASE, 'public'),
    index: path.resolve(BASE, 'pages', 'index.html'),
    login: path.resolve(BASE, 'pages', 'login.html')
};
