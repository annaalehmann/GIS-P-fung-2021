"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let rezeptArray;
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handleInsert);
    handlePublishMyRecipes();
    //Rezept in Datenbank einfügen
    async function handleInsert() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/insertRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);
        location.reload();
    }
    //Rezepte des Nutzers anzeigen
    async function handlePublishMyRecipes() {
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publishMyRecipe";
        let response = await fetch(_url);
        let responseJSON = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));
        document.getElementById("myRecipes").innerHTML = "";
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("myRecipes").appendChild(div);
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);
            let autor = document.createElement("p");
            autor.innerHTML = "Autor: " + rezeptArray[i].autor;
            div.appendChild(autor);
            let button = document.createElement("button");
            button.innerHTML = "löschen";
            button.classList.add("buttonRezepte");
            div.appendChild(button);
            button.addEventListener("click", handleRezeptLoeschen);
        }
    }
    async function handleRezeptLoeschen(_event) {
        let i = _event.currentTarget.parentElement.getAttribute("counter");
        document.getElementById("currentRecipeDiv" + i)?.remove();
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/deleteMyRecipe" + "?" + "counter=" + i;
        await fetch(_url);
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=meine-rezepte.js.map