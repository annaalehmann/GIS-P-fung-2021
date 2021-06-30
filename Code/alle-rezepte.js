"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let rezeptArray;
    handlePublishAllRecipes();
    if (!localStorage.counter) {
        localStorage.counter = 0;
    }
    async function handlePublishAllRecipes() {
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publishAllRecipes";
        //Die von dem Server gefundenen Inhalte der Datenbank werden in ein Objekt umgewandelt 
        let response = await fetch(_url);
        let responseJSON = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));
        //Aufbau der einzelnen Rezepte
        document.getElementById("allRecipes").innerHTML = "";
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("allRecipes").appendChild(div);
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
            button.innerHTML = "favorisieren";
            button.classList.add("buttonRezepte");
            div.appendChild(button);
            button.addEventListener("click", handleFavorisieren);
        }
    }
    //Der Inhalt der Rezepte wird im localStorage abgespeichert.
    //Bei jedem abgespeicherten Rezept wird der localStorage-Counter um 1 erhöht.
    async function handleFavorisieren(_event) {
        let i = _event.currentTarget.parentElement.getAttribute("counter");
        let iNr = parseInt(i);
        localStorage.setItem("zutaten" + localStorage.counter, rezeptArray[iNr].zutaten);
        localStorage.setItem("zubereitung" + localStorage.counter, rezeptArray[iNr].zubereitung);
        localStorage.setItem("autor" + localStorage.counter, rezeptArray[iNr].autor);
        localStorage.counter = Number(localStorage.counter) + 1;
        console.log(localStorage);
        console.log(localStorage.counter);
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=alle-rezepte.js.map