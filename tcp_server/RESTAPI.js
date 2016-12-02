var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
var os = require('os');
var net = require('net');

var PORT = 9001; // Port for Photon's TCP server

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/photon', function(req, res) {
	var sock = conns[0];
	var dataFlag = false;
	sock.once('data', function(data) {
		res.end(data[0] + "\n");
	});
	console.log(req.body.func);
	res.writeHead(200, {"Content-Type": "text/plain; charset = utf-8"});
	switch (req.body.func) {
		case "ledOn":
			sock.write('a');
			break;
		case "ledOff":
			sock.write('b');
			break;
		case "button":
			sock.write('c');
			break;
        case "shake":
            sock.write('d');
			break;
        case "idle":
            sock.write('e');
			break;
		case "vibrate":
			sock.write('f');
			break;
		case "photoCheck":
			sock.write('g');
			break;
		case "magCheck":
			sock.write('h');
			break;
		case "servoUp":
			sock.write('i');
			break;
		case "servoDown":
			sock.write('j');
			break;
		case "vibrateLongRed":
			sock.write('k');
			break;
		case "vibrateLongGreen":
			sock.write('l');
			break;
		case "punch":
			sock.write('m');
			break;
		case "servoMid":
			sock.write('n');
			break;
		default:
			res.end("Invalid function call");
			break;
	}	
});

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("API listening at http://%s:%s", host, port)
})
