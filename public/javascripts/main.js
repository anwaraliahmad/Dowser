var map; // main map

var feature_layers = []; // Water boundaries by year for Lake Oroville 

var feature_layers_url = [

"http://services6.arcgis.com/bjVEhGT67TTSPHct/arcgis/rest/services/2013_Water_Boundaries/FeatureServer/3",
"http://services6.arcgis.com/bjVEhGT67TTSPHct/arcgis/rest/services/2014_Water_Lines/FeatureServer/3"];

require(
  ["esri/map",
  "esri/tasks/Query" 
  "esri/geometry/geodesicUtils",
  "esri/units",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/renderers/SimpleRenderer",
  "dojo/domReady",
  "dojo/_base/Color"], 
  function(Map, Query, geodesicUtils, Units) {
    map = new Map("map", {
      basemap: "topo",  // For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
      center: [-122.45, 37.75], // longitude, latitude
      zoom: 13
    });

    var query = new Query();
    query.returnGeometry = true;
    map.on("load", init());
    map.on("click", function(e){

    });

    function init() {

      // Loading water boundaries 
      for (var i = 0; i < feature_layers_url.length; i++) { 
        var temp_layer = new esri.layers.FeatureLayer(feature_layers_url[i]);
        feature_layers.push(temp_layer);
        console.log(temp_layer);
      }
     // var areas = geodesicUtils.geodesicAreas(feature_layers, esri.Units.ACRES);
      
      map.addLayers(feature_layers); // Adding layers to map

    }




});


