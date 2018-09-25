document.addEventListener('DOMContentLoaded', () => {

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
  });

  function createWindow(username, level, date, time, photo){
    var infowindow = new google.maps.InfoWindow({
        content: `<img src='${photo}' style="width:300px;border-radius:10%"><h1>Host: ${username}</h1><br>LV: ${level}<br>${date}||${time}`,
    });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
  }

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
    createWindow(game.username, game.level, game.date, game.time, game.photo);
  });

  function createWindow(username, level, date, time, photo){
    var infowindow = new google.maps.InfoWindow({
        content: `<img src='${photo}' style="width:300px;border-radius:10%"><h1>Host: ${username}</h1><br>LV: ${level}<br>${date}||${time}`,
    });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
  }
  




}, false);

/////
