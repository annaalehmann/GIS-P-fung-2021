namespace pruefungsabgabe {

    //Interface und Array um die Inhalte der Rezepte aus der Datenbank zu laden
    interface Rezepte {
        _id: string; 
        zutaten: string;
        zubereitung: string;
        autor: string;
    }

    let rezeptArray: Rezepte[];

    handlePublishAllRecipes();

    if (!localStorage.counter) {
        localStorage.counter = 0;
    }
    
    async function handlePublishAllRecipes(): Promise<void> {

        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publishAllRecipes";

        //Die von dem Server gefundenen Inhalte der Datenbank werden in ein Objekt umgewandelt 
        let response: Response = await fetch(_url);
        let responseJSON: string = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));

        //Aufbau der einzelnen Rezepte
        document.getElementById("allRecipes").innerHTML = "";

        for (let i: number = 0; i < rezeptArray.length; i++) {

            let div: HTMLDivElement = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("allRecipes").appendChild(div);

            let zutaten: HTMLElement = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);

            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);

            let autor: HTMLElement = document.createElement("p");
            autor.innerHTML = "Autor: " + rezeptArray[i].autor;
            div.appendChild(autor);

            let button: HTMLElement = document.createElement("button");
            button.innerHTML = "favorisieren";
            button.classList.add("buttonRezepte");
            div.appendChild(button);
            button.addEventListener("click", handleFavorisieren);
        }
    }

    //Der Inhalt der Rezepte wird im localStorage abgespeichert.
    //Bei jedem abgespeicherten Rezept wird der localStorage-Counter um 1 erhöht.
    async function handleFavorisieren(_event: Event): Promise<void> {

        let i: string = (<HTMLElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("counter")!;
        let iNr: number = parseInt(i);

        localStorage.setItem("zutaten" + localStorage.counter, rezeptArray[iNr].zutaten);
        localStorage.setItem("zubereitung" + localStorage.counter, rezeptArray[iNr].zubereitung);
        localStorage.setItem("autor" + localStorage.counter, rezeptArray[iNr].autor);
        localStorage.counter = Number(localStorage.counter) + 1;
    }
}