var express = require('express');
var app = express();

var os = require('os');
var net = require('net');

var PORT = 9000;

//bascially find and save the IP address of the laptop. instead of having me run ifconfig
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
// End of trying to find IP
console.log("OK I'm listening on port " + PORT + " here at IP address " + ip + "!");
console.log("Now run the following curl command in another window,");
console.log("replacing <DEVICE_ID> and <ACCESS_TOKEN>.");
console.log("curl https://api.particle.io/v1/devices/<DEVICE_ID>/connect -d access_token=<ACCESS_TOKEN> -d ip=" + ip);

//stupid anon functions. where has my C structure gone?
var conns = [];
var server1 = net.createServer(function(socket){
  console.log("Someone connected from " + socket.remoteAddress + ":" + socket.remotePort + " to my TCP client!");
  conns.push(socket);
});
server1.listen(PORT);

app.get('/on', function (req, res) {
      sock = conns[0];
      sock.write('7h');
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end( "<html><body> turning LED ON (*)</body> </html>" );
});

app.get('/off', function (req, res) {
      sock = conns[0];
      sock.write('7l');
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end( "<html><body> turning LED OFF ( )</body> </html>" );
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})