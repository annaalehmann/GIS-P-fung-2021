"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    document.getElementById("allRecipes").innerHTML = "";
    for (let i = 0; i <= length - 1; i++) {
        let div = document.createElement("div");
        div.id = "currentRecipeDiv" + i;
        div.classList.add("currentRecipeClass");
        div.setAttribute("counter", i.toString());
        document.getElementById("allRecipes").appendChild(div);
        let zutaten = document.createElement("p");
        zutaten.innerHTML = "Zutaten: " + localStorage.getItem("zutaten" + i);
        div.appendChild(zutaten);
        let zubereitung = document.createElement("p");
        zutaten.innerHTML = "Zubereitung: " + localStorage.getItem("zutaten" + i);
        div.appendChild(zubereitung);
        let autor = document.createElement("p");
        autor.innerHTML = "Autor: " + localStorage.getItem("autor" + i);
        div.appendChild(autor);
        let button = document.createElement("button");
        button.innerHTML = "löschen";
        button.classList.add("buttonRezepte");
        div.appendChild(button);
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=favoriten.js.map