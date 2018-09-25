const createInfo = (username, level, date, time, photo, marker) => {
  var infowindow = new google.maps.InfoWindow({
      content: `<img src='${photo}' style="width:300px;border-radius:10%"><h1>Host: ${username}</h1><br>LV: ${level}<br>${date}||${time}`,
  });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
  });
}