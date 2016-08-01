var map = L.map('map').setView([52.87, -1.07], 14);
mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

// load geocode plugin with options
var geocodeKey = '09213753bc050604c9bc923f8b1cebcf';
var options = {
    key: geocodeKey,
    position: 'topleft',
    limit: 10
};
var control = L.Control.openCageSearch(options).addTo(map);

// create entries for rightPanel to contain legend and text and images to display
var Legend = L.Control.extend({  
  options: {
    position: 'topright'
  },
  onAdd: function (map) {
        var legend = L.DomUtil.create('div', 'map-legend', L.DomUtil.get('map'));
        var rightPanel = '<div id="rightPanel"><div id="legendText"></div><div id="displayText"></div><div id="displayImage"></div></div>'
        legend.innerHTML =  rightPanel;
    return legend;
  }
});
map.addControl(new Legend());

// create string to add legend text in the right panel
var legend = '<text class="legend" onclick="selectLayer(this.id)" id="Fossil">Fossil</text><text class="legend" onclick="selectLayer(this.id)" id="Measurement">Measurement</text><text class="legend" onclick="selectLayer(this.id)" id="Rock">Rock</text><text class="legend" onclick="selectLayer(this.id)" id="Borehole">Borehole</text>'
$(legendText).html(legend);


/* Initialize the SVG layer */
map._initPathRoot()    
/* select the SVG from the map object */
var svg = d3.select("#map").select("svg");
var g = svg.append("g")
		.attr("class", "geo_obs");
// read in the data from geojson
d3.json("data//bgs_data.geojson", function(collection) {
    // add a LatLng object to each item in the dataset - used in the update function below
    collection.features.forEach(function(d) {
    	d.LatLng = new L.LatLng(d.geometry.coordinates[1],
    							d.geometry.coordinates[0])
    })

    // create SVG elements for each item in the bgs data
    var feature = g.selectAll("circle")
    	.data(collection.features)
    	.enter()
    	.append("circle")
    	.attr("r", 6)
        .attr("class", function (d) {return d.properties.Type})
        .attr("id", function (d) {return d.properties.Name})
        .style("opacity", "1")
        .on("click", function(d) {
        	lat = d.geometry.coordinates[0]
        	long = d.geometry.coordinates[1]

            // create string to display geo obs attributes
            textString = "<table> <tr><td>" + "<b>" + "Geological observation " + d.properties.Name + "</b>" + "</td></tr>" +
                "<tr><td>" + "Rock name: " + d.properties.Rock_name + "</td></tr>" +
                "<tr><td>" + "Type: " + d.properties.Type + "</td></tr>" +
                "<tr><td>" + "Lat: " + lat.toPrecision(6) + "</td></tr>" +
                "<tr><td>" + "Long: " + long.toPrecision(6) + "</td></tr>" +
                "<tr><td>" + "Date: " + d.properties.Date + "</td></tr>" +
                "<tr><td>" + "Time: " + d.properties.Time + "</td></tr>" +
                "<tr><td>" + "Elevation value: " + d.properties.Z + "</td></tr>" +
                "<tr><td>" + "Porosity: " + d.properties.Porosity + "</td></tr>" +
                "<tr><td>" + "Species: " + d.properties.Species + "</td></tr>" +
                "<tr><td>" + "Recorded By: " + d.properties.Recorded_By + "</td></tr>" +
    			"<tr><td>" + "Drilled depth (m): " + d.properties.Drilled_depth + "</td></tr>" +
                "</table>";

            $('#displayText').html(textString);

            // isolate the image attribute for a geo obs and display within the web document
            // check first if an image file is avialable
        	imageName = d.properties.Image;
            if (imageName === undefined) {
                imageString = "<text> No image available for this sample </text>";
            } else { 
                imageString = "<img src='images/"+imageName + "' alt='No image available' >"
            };
            $('#displayImage').html(imageString);
        
            })

    map.on("viewreset", update);
    update();

    function update() {
    	feature.attr("transform", 
    	function(d) { 
    		return "translate("+ 
    			map.latLngToLayerPoint(d.LatLng).x +","+ 
    			map.latLngToLayerPoint(d.LatLng).y +")";
    		}
    	)
    }
})			 


// function called by the text in the legend to turn geo obs off and on
function selectLayer(id) {
	// Determine if current class is visible or not 
	var status = d3.selectAll("."+id).style()[0][0].style.opacity
	if (status == 1 ) {newOpacity = 0}
	else if (status == 0) {newOpacity = 1};
	// Hide or show the elements
	d3.selectAll("."+id).style("opacity", newOpacity);
	}
