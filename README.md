# Earthquakes World Map

![1-Logo](Images/earthquake_header.jpeg)

## Background

The USGS (United States Geological Survey) is responsible for providing scientific data about natural hazards, among other things. This project utilizes a combination of Leaflet, D3, and HTML to create a web-based visualization of earthquakes around the world.


## Deployment Link
Check out the final site here: https://brbbrb.github.io/leaflet-challenge/


## Retrieving Data

![3-Data](Images/3-Data.png)

Earthquake data was retrieved from [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. By selecting [All Earthquakes from the Past 7 Days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) we are given a JSON representation of the earthquake data. The URL of this JSON was used to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

## Import & Visualize the Data

Using the Leaflet library, all of the earthquakes can be plotted from the data set based on their longitude and latitude.
* Each data marker reflects the following:
   * __magnitude__ of the earthquake, reflected by circle size
   * __depth__ of the earthquake, reflected by circle color
* When a marker is clicked, a popup provides additional context about the earthquake including:
   * magnitude
   * Time
   * Location
   * Coordinates
   * Depth
* A legend was added to the map to give context to the color scale

![gif](Images/map_recording1.gif)
For live site, click here: https://brbbrb.github.io/leaflet-challenge/
