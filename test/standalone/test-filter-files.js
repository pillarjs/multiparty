var assert = require('assert');
var findit = require('findit');
var http = require('http');
var net = require('net');
var fs = require('fs');
var multiparty = require('../../');

var TMP_PATH = process.env.TMPDIR;

var server = http.createServer(function (req, res) {
  var form = new multiparty.Form({
    uploadDir: TMP_PATH,
    filter: function (file) {
      if (file.originalFilename !== 'plain2.txt') { return false; }
      else { return true; }
    }
  });
  form.parse(req, function (err, fields, files) {
    assert(files.hasOwnProperty('file'));
    assert(files.file.length === 1);
    assert(files.file[0].originalFilename = 'plain2.txt');
    
    var tmpWalker = findit(TMP_PATH);
    tmpWalker.on('file', function(file) {
      fs.unlinkSync(file);
    });

    res.end('200');
  });
}).listen(function() {
  var socket = net.connect(server.address().port, 'localhost', function () {
    socket.write('POST / HTTP/1.1\r\n');
    socket.write('Host: localhost\r\n');
    socket.write('Connection: close\r\n');
    socket.write('Content-Type: multipart/form-data; boundary=foo\r\n');
    socket.write('Transfer-Encoding: chunked\r\n');
    socket.write('\r\n');
    socket.write('7\r\n');
    socket.write('--foo\r\n\r\n');
    socket.write('43\r\n');
    socket.write('Content-Disposition: form-data; name="file"; filename="plain.txt"\r\n\r\n');
    socket.write('12\r\n');
    socket.write('\r\nsome text here\r\n\r\n');
    socket.write('7\r\n');
    socket.write('--foo\r\n\r\n');
    socket.write('44\r\n');
    socket.write('Content-Disposition: form-data; name="file"; filename="plain2.txt"\r\n\r\n');
    socket.write('12\r\n');
    socket.write('\r\nsome text here\r\n\r\n');
    socket.write('7\r\n');
    socket.write('--foo\r\n\r\n');
    socket.write('44\r\n');
    socket.write('Content-Disposition: form-data; name="file"; filename="plain3.txt"\r\n\r\n');
    socket.write('12\r\n');
    socket.write('\r\nsome text here\r\n\r\n');
    socket.write('7\r\n');
    socket.write('--foo--\r\n');
    socket.write('2\r\n');
    socket.write('\r\n\r\n');
    socket.write('0\r\n\r\n');
    socket.on('close', function () {
      server.close();
    });
  });
});
