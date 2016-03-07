//Using a sample server for Geometry Services
var url = "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/areasAndLengths"


var http = require('http');


http.get("http://www.google.com/index.html", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})