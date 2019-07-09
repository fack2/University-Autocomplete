const search = document.getElementById("search");
const searchValue = search.value;
console.log("search vakjdf", searchValue);
search.addEventListener("keydown", univerName => {
  univerName = searchValue;
  fetch(`/search?q=${univerName}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
});
