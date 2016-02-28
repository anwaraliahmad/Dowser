var request = require("request")
//Using a sample server for Geometry Services
var url = "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/areasAndLengths"


function getArea(polygons) {
    
  url += "?";

  url += polygons;

  url+="f=json";

  request({
      url:,
      json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      
    }
  })
}