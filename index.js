const pathToRegexp = require('path-to-regexp');

module.exports = function vhost(hostname, server, opts){
	if (!hostname) throw new Error('vhost hostname required');
	if (!server) throw new Error('vhost server required');
	var kel = [];
	var regexp = pathToRegexp(hostname, kel, opts);
	if (server.onvhost) server.onvhost(hostname);
	return function vhost(req, res, next){
		if (!req.headers.host) return next();
		var host = regexp.exec(req.headers.host.split(':')[0]);
		if (!host) return next();
		kel.forEach(function (key, i){
			req.keys[ key.name ] = host[ i + 1 ] ;
		});
		if ('function' == typeof server) return server(req, res, next);
		server.emit('request', req, res);
	};
};