var express = require('express');
var app = express();
//var bodyParser = require("body-parser");

var os = require('os');
var net = require('net');

var PORT = 9000;

//-------------bascially find and save the IP address of the laptop. instead of having me run ifconfig
var ip = null;
var save_first_ipv4 = function (iface) {
  if (!ip && !iface.internal && 'IPv4' === iface.family) {
    ip = iface.address;
  }
};
var interfaces = os.networkInterfaces();
for (var ifName in interfaces) {
  if (!ip) {
    interfaces[ifName].forEach(save_first_ipv4);
  }
}
//--------------End of trying to find IP
console.log("OK I'm listening on port " + PORT + " here at IP address " + ip + "!");
console.log("Now run the following curl command in another window,");
console.log("replacing <DEVICE_ID> and <ACCESS_TOKEN>.");
console.log("curl https://api.particle.io/v1/devices/<DEVICE_ID>/connect -d access_token=<ACCESS_TOKEN> -d ip=" + ip);

var conns = [];
var incoming = "";

var server1 = net.createServer(function(socket){ //stupid anon functions.
  console.log("Someone connected from " + socket.remoteAddress + ":" + socket.remotePort + " to my TCP client!");
  conns.push(socket);
});
server1.listen(PORT);
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.post('/ledon', function (req, res) {
      //console.log(req);
      sock = conns[0];
      sock.write('a');
	  //console.log(req.body.args);		// Provisions to actually read JSON data from the requester
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end( "Turning LED ON (*)\n" );
});

app.post('/ledoff', function (req, res) {
      //console.log(req);
      sock = conns[0];
      sock.write('b');
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end( "Turning LED OFF ( )\n" );
});

app.post('/button', function(req, res) {
	var sock = conns[0];
	sock.write('c');
	res.writeHead(200, {"Content-Type": "text/plain; charset = utf-8"});
	var dataFlag = false;
	sock.once('data', function(data) {
		dataFlag = true;
		if (dataFlag) {
			console.log(data[0] + " from button");
			res.end(data[0] + "\n");
		}
	});
});

app.post('/button2', function(req, res) {
	var sock = conns[0];
	sock.write('c');
	res.writeHead(200, {"Content-Type": "text/plain; charset = utf-8"});
	var dataFlag = false;
	sock.once('data', function(data) {
		dataFlag = true;
		if (dataFlag) {
			console.log(data[0] + " from button2");
			res.end(data[0] + "\n");
		}
	});
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})