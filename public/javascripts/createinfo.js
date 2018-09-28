const createInfo = (username, level, date, time, photo, marker) => {
  var infowindow = new google.maps.InfoWindow({
      content: `<img src='${photo}' style="width:280px;border-radius:10%">
      <h3 style="color: black;">Host: ${username}</h3><h3 style="color: black;">level: ${level}</h3>
      <h4 style="color: black;">${date}||${time}</h4>`,
  });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
  });
}