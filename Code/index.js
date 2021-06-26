"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let rezeptArray;
    handlePublishAllRecipes();
    async function handlePublishAllRecipes() {
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publishAllRecipes" + "?";
        let response = await fetch(_url);
        let responseJSON = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));
        document.getElementById("allRecipes").innerHTML = "";
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("zaehler", i.toString());
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
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=index.js.map