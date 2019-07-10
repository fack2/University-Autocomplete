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
            listItem.appendChild(ul)

            console.log(data);

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