const search = document.getElementById("search");
search.addEventListener("keyup", event => {
  console.log(event.target.value);
  fetch(`/search?q=${event.target.value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
});
