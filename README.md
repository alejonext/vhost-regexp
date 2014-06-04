# vhost Regular Expression

Install

``console
$ npm install vhost-regexp
``

## Use

``javascript
var connect = require('connect');
var vhost = require('vhost');

var app = connect();

app.use(vhost('mail.example.com', function(req, res){
	// more code ....
}));
app.use(vhost(':bar(foo|bar).example.com', function(req, res){
	// foo.example.com
	// req.vhost
	// => { bar : 'foo' }
})); 
app.use(vhost('([a-z0-9]{5,15}).example.com', connect())); 
// abcdef1234567890.example.com
app.use(vhost('*.example.com', connect()));
app.use(connect());
``