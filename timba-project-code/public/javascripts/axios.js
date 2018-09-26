const BASE_URL = "http://localhost:3000";

document.getElementById("status").onclick = function(elem) {
  
  
  let status = elem.value
  let text = elem.innerHTML;
  
  axios.put(this.BASE_URL+`/game/ready/{{game._id}}`, status, text)
    .then(res => {
      if (elem.classList.contains('btn-warning')) {
       elem.classList.remove('btn-warning');
       elem.classList.add('btn-primary');
      }
      elem.value = res.value;
      elem.innerHTML = "CLOSE GAME"
    })
    .catch(error => {
      console.log(error)
    })
};
