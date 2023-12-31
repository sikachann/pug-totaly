const SSI = require('./node_modules/browser-sync');

module.exports = {
	"files": './app/**/*.css, ./app/**/*.html',
	"server": {
		baseDir: 'app/dist/',
		index: 'index.html'
	},
	"online": true,
	"open": 'external',
	"proxy": false,
	"port": 3000
}
