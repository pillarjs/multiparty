/**
* Usage:
*   $ node ajax-upload
*/
var http          = require('http')
    , fs          = require('fs')
    , util        = require('util')
    , multiparty  = require('../../')
    , PORT        = process.env.PORT || 27372
;

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname+'/home.html'));
  } else if (req.url === '/upload') {
    var form = new multiparty.Form(), msg = '';

    form.parse(req, function(err, fields, files) {
      if (err) {
        res.writeHead(400, {'content-type': 'text/plain'});
        msg = JSON.stringify({error: 'invalid request: '+err.message});
        res.end(msg);
        return
      }
      msg = JSON.stringify({
          'fields': fields,
          'files': files
      });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end(msg)
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});

server.listen(PORT, function() {
  console.info('listening on http://0.0.0.0:'+PORT+'/');
});
