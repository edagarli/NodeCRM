
/*
 * GET home page.
 */
var http = require('http');
var querystring = require('querystring');
exports.index = function(req, res){
  res.redirect('/admin');
};

exports.install = function(req, res){
	var datas={		
		sns:'',
		screenName:'',
		name:'admin',
		description:'admin',
		roleId:'512ad7577f50eaf00f000045',
		isActived:1,
		mobile:'13513513512',
		phone:'12345678',
		email:'admin@hotmail.com',
		expireTime:'2013-06-24 00:00:00',
		pwd:'adminadmin',
		fatherNode:''
	};
	
	var post_data = querystring.stringify(datas);

	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/admin/account/insert',
	  method: 'POST',
	  headers:{
			'Accept-Encoding':'gzip,deflate,sdch',
			'Accept-Language':'zh-CN,zh;q=0.8',
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
			'Content-Length': post_data.length
		}
	};


	var req = http.request(options, function(response) {
	  console.log('STATUS: ' + response.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(response.headers));
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	  });
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(post_data + "\n");
	req.end();
};

