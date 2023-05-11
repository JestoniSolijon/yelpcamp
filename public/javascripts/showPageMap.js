
const campgroundParse = JSON.parse(campground); 
const campgroundCoordinates = campgroundParse.geometry.coordinates;
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campgroundCoordinates,
    zoom: 10, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campgroundCoordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${campgroundParse.title}</h3>
            <p>${campgroundParse.location}</p>`
        )
    )
    .addTo(map)