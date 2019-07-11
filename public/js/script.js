const search = document.getElementById("search");
search.addEventListener("keyup", event => {
  console.log(event.target.value);
  fetch(`/search?q=${event.target.value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let listItem = document.getElementById("list");
      let ul = document.createElement("ul");
      listItem.appendChild(ul);

      for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("class", "item");
        const valueOfArr = document.createTextNode(data[i]);
        li.appendChild(valueOfArr);
        ul.appendChild(li);
      }

      list.textContent = "";
      list.appendChild(ul);
    });
});

let button = document.getElementById("button");

button.addEventListener("click", () => {
  fetch(
    `https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      let y = search.value;
      const answer = data.map(function(x) {
        if (x.name === y) {
          return x.web_pages;
        }
      });
      const answer2 = answer.filter(x => x != undefined);

      const div = document.getElementById("universitiesLink");
      div.setAttribute(
        "style",
        "  background-color: ghostwhite ;text-align: center; font-size: 20px; margin-top: 20px; padding: 20px;"
      );

      const anchor = document.createElement("A");
      const links = document.createTextNode(search.value);
      anchor.setAttribute("href", answer2);
      anchor.appendChild(links);
      div.appendChild(anchor);
    });
});
