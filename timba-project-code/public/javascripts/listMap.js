document.addEventListener('DOMContentLoaded', () => {

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
  });

  geolocalize().then(center => {
    map.setCenter(center);
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(center);

    games.forEach(game => {
      marker = new google.maps.Marker({
        position: {
          lat:game.location.coordinates[0],
          lng:game.location.coordinates[1]
        },
        map: map,
        title: game.hostId+'\n'+ game.level,
      });

      if (user.level > game.level){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');}
      if (user.level == game.level){marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');}
      console.log("MARKER: ", marker);
      bounds.extend(marker.position);
    })
    
    map.fitBounds(bounds);
  });


}, false);