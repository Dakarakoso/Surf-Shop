mapboxgl.accessToken = 'pk.eyJ1IjoiZGFrYXJha29zbyIsImEiOiJja200Njl2ZTgwMWpuMm9vamo2N2g0cmF2In0.HM1PmvieXxXIhVZGIUQWiw';
 
  
 var map = new mapboxgl.Map({
 container: 'map',
 style: 'mapbox://styles/mapbox/light-v10',
 center: post.coordinates,
 zoom: 5
 });
  
 
 // create a HTML element for each feature
 var el = document.createElement('div');
 el.className = 'marker';
  
 // make a marker for each feature and add it to the map
 new mapboxgl.Marker(el)
 .setLngLat(post.coordinates)
 .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
 .setHTML('<h3>' + post.title + '</h3><p>' + post.description + '</p>' ))
 .addTo(map);
 

 // Toggle edit review form
 $('.toggle-edit-form').on('click', function() {
  // toggle the edit button text on click
  $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
  // toggle visibility of the edit review form
  $(this).siblings('.edit-review-form').toggle();
});

// Add click listener for cleaning of raring from edit/new form
$('.clear-rating').click(function () {
  $(this).siblings('.input-no-rate').click();
});