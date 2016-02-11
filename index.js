var app = require('./server.js');

console.log("process ", process.env.PORT);
var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
