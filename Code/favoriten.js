"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    handleFavoriten();
    //Mithilfe des localStorage-Counters können die im localStorage gespeicherten Rezepte identifiziert und nacheinander aufgerufen sowie aufgebaut werden 
    function handleFavoriten() {
        for (let i = 0; i < localStorage.counter; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("favoriteRecipes").appendChild(div);
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + localStorage.getItem("zutaten" + i);
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + localStorage.getItem("zubereitung" + i);
            div.appendChild(zubereitung);
            let autor = document.createElement("p");
            autor.innerHTML = "Autor: " + localStorage.getItem("autor" + i);
            div.appendChild(autor);
            let button = document.createElement("button");
            button.innerHTML = "entfernen";
            button.classList.add("buttonRezepte");
            div.appendChild(button);
            button.addEventListener("click", handleDelete);
        }
    }
    function handleDelete(_event) {
        let i = _event.currentTarget.parentElement.getAttribute("counter");
        let iNr = parseInt(i);
        let iPlusOne = 0;
        document.getElementById("currentRecipeDiv" + i)?.remove();
        /*Bei jedem zu entfernenden Rezept wird der localStorage-Counter um 1 verringert und die Position des Rezeptes im localStorage wird gelöscht. */
        localStorage.counter--;
        localStorage.removeItem("zutaten" + i);
        localStorage.removeItem("zubereitung" + i);
        localStorage.removeItem("autor" + i);
        /*Im localStorage werden ab dem gelöschten Rezept alle Lücken aufgefüllt*/
        for (iNr; iNr < localStorage.counter; iNr++) {
            iPlusOne = iNr + 1;
            localStorage.setItem("zutaten" + iNr, localStorage.getItem("zutaten" + iPlusOne));
            localStorage.setItem("zubereitung" + iNr, localStorage.getItem("zubereitung" + iPlusOne));
            localStorage.setItem("autor" + iNr, localStorage.getItem("autor" + iPlusOne));
        }
        console.log(localStorage.counter);
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=favoriten.js.map