L.esri.Support.cors = false;

var geometry_service = L.esri.service({url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/", 
});

var map = L.map("map").setView([37.75, -122.23], 8);



L.esri.basemapLayer("Imagery").addTo(map);
var water_area_2014 = L.esri.featureLayer({
url: 'http://services6.arcgis.com/bjVEhGT67TTSPHct/arcgis/rest/services/2014_Water_Lines/FeatureServer/3',

style: function(f) {
  return {color: 'red', weight: 2}
}
}).addTo(map);


var water_area_2013 = L.esri.featureLayer({
url: 'http://services6.arcgis.com/bjVEhGT67TTSPHct/arcgis/rest/services/2013_Water_Boundaries/FeatureServer/3',
style: function(f) {
  return {color: 'green', weight: 1}
}

}).addTo(map);


water_area_2013.on("load", function(e) {
  var bounds = L.latLngBounds([]);
  // loop through the features returned by the server
  water_area_2013.eachFeature(function(layer) {
    // get the bounds of an individual feature
    var layerBounds = layer.getBounds();
    // extend the bounds of the collection to fit the bounds of the new feature
    bounds.extend(layerBounds);
  })
  map.fitBounds(bounds);
  water_area_2013.off("load");

});


water_area_2013.on("click", function(e) {
  var bounds = L.latLngBounds([])
  // loop through the features returned by the server
  water_area_2013 .eachFeature(function(layer) {
    // get the bounds of an individual feature
    var layerBounds = layer.getBounds();
    // extend the bounds of the collection to fit the bounds of the new feature
    bounds.extend(layerBounds)
  })
  map.fitBounds(bounds);


  document.getElementById('sb').classList.toggle('hide')

  document.getElementById('water_title').textContent = "Lake Oroville"

});


var query_2013  = L.esri.query({
  url: "http://services6.arcgis.com/bjVEhGT67TTSPHct/arcgis/rest/services/2013_Water_Boundaries/FeatureServer/3"
});

var query_2014= L.esri.query({
  url: "http://services6.arcgis.com/bjVEhGT67TTSPHct/ArcGIS/rest/services/2014_Water_Lines/FeatureServer/3"
});



map.on('click', function(e) {

  query_2013.intersects(e.latlng).run(function(error, featureCollection, response){
    var poly2013 = featureCollection.features[0].geometry['coordinates'];
    
    poly2013.push(poly2013[0][0]);
    for (var i = 0; i < poly2013[0].length;i++ ) {

     console.log(poly2013[0][i]);
    }
    geometry_service.get('areasAndLengths', {
      sr: 102100,
      polygons: [{rings: [poly2013]}]}, 
      function (error, response){});
   document.getElementById('area').textContent = 'Current Area:' + '16000';
  })
  


  document.getElementById('loss').textContent = 'Loss: '+ '15%';  
  //Using a sample server for Geometry Services
  var url = "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/areasAndLengths?"+"s"+"&f=json";




});