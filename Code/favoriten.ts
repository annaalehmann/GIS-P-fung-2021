namespace pruefungsabgabe {

    document.getElementById("favoriteRecipes").innerHTML = "";

    for (let i: number = 1; i <= localStorage.counter; i++) {

        let div: HTMLDivElement = document.createElement("div");
        div.id = "currentRecipeDiv" + i;
        div.classList.add("currentRecipeClass");
        div.setAttribute("counter", i.toString());
        document.getElementById("favoriteRecipes").appendChild(div);

        let zutaten: HTMLElement = document.createElement("p");
        zutaten.innerHTML = "Zutaten: " + localStorage.getItem("zutaten" + i);
        div.appendChild(zutaten);

        let zubereitung: HTMLElement = document.createElement("p");
        zutaten.innerHTML = "Zubereitung: " + localStorage.getItem("zubereitung" + i);
        div.appendChild(zubereitung);

        let autor: HTMLElement = document.createElement("p");
        autor.innerHTML = "Autor: " + localStorage.getItem("autor" + i);
        div.appendChild(autor);

        let button: HTMLElement = document.createElement("button");
        button.innerHTML = "löschen";
        button.classList.add("buttonRezepte");
        div.appendChild(button);
    }

}