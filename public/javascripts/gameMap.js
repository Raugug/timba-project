document.addEventListener('DOMContentLoaded', () => {

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
  });

  geolocalize().then(center => {
    map.setCenter(center);
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(center);
      marker = new google.maps.Marker({
        position: {
          lat:game.location.coordinates[0],
          lng:game.location.coordinates[1]
        },
        map: map,
        title: `<img src="${game.photo}">`+'\n'+game.hostId.username+'\n'+ game.level+'\n'+ game.date+' | '+ game.time,
      });
      console.log("MARKER: ", marker);
      bounds.extend(marker.position);
    
    map.fitBounds(bounds);
    createInfo(game.hostId.username, game.level, game.date, game.time, game.photo, marker);
  });

}, false);

