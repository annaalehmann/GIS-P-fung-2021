namespace pruefungsabgabe {

handleFavoriten();
console.log(localStorage);

function handleFavoriten(): void {

    for (let i: number = 0; i < localStorage.counter; i++) {

        let div: HTMLDivElement = document.createElement("div");
        div.id = "currentRecipeDiv" + i;
        div.classList.add("currentRecipeClass");
        div.setAttribute("counter", i.toString());
        document.getElementById("favoriteRecipes").appendChild(div);

        let zutaten: HTMLElement = document.createElement("p");
        zutaten.innerHTML = "Zutaten: " + localStorage.getItem("zutaten" + i);
        div.appendChild(zutaten);

        let zubereitung: HTMLElement = document.createElement("p");
        zubereitung.innerHTML = "Zubereitung: " + localStorage.getItem("zubereitung" + i);
        div.appendChild(zubereitung);

        let autor: HTMLElement = document.createElement("p");
        autor.innerHTML = "Autor: " + localStorage.getItem("autor" + i);
        div.appendChild(autor);

        let button: HTMLElement = document.createElement("button");
        button.innerHTML = "entfernen";
        button.classList.add("buttonRezepte");
        div.appendChild(button);
        button.addEventListener("click", handleDelete);
    }
}

function handleDelete(_event: Event): void {

    let i: string = (<HTMLElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("counter")!;
    let iNr: number = parseInt(i);
    let iPlusOne: number = 0; 
    document.getElementById("currentRecipeDiv" + i)?.remove(); 

    localStorage.counter--;
    localStorage.removeItem("zutaten" + i);
    localStorage.removeItem("zubereitung" + i);
    localStorage.removeItem("autor" + i);

    for (iNr; iNr < localStorage.counter; iNr++) {
        iPlusOne = iNr + 1; 
        localStorage.setItem("zutaten" + iNr, localStorage.getItem("zutaten" + iPlusOne));
        localStorage.setItem("zubereitung" + iNr, localStorage.getItem("zubereitung" + iPlusOne));
        localStorage.setItem("autor" + iNr, localStorage.getItem("autor" + iPlusOne));
    }
}
}