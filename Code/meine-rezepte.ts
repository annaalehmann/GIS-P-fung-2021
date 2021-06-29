namespace pruefungsabgabe {

    interface Rezepte {
        zutaten: string;
        zubereitung: string;
        autor: string;
    }

    let rezeptArray: Rezepte[];

    let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
    publishButton.addEventListener("click", handleInsert);



    handlePublishMyRecipes();

    //Rezept in Datenbank einfügen
    async function handleInsert(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/insertRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);

        location.reload();
    }

    //Rezepte des Nutzers anzeigen
    async function handlePublishMyRecipes(): Promise<void> {

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publishMyRecipe";

        let response: Response = await fetch(_url);
        let responseJSON: string = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));

        document.getElementById("myRecipes").innerHTML = "";

        for (let i: number = 0; i < rezeptArray.length; i++) {

            let div: HTMLDivElement = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("myRecipes").appendChild(div);

            let zutaten: HTMLElement = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);

            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);

            let autor: HTMLElement = document.createElement("p");
            autor.innerHTML = "Autor: " + rezeptArray[i].autor;
            div.appendChild(autor);

            let buttonEdit: HTMLElement = document.createElement("button");
            buttonEdit.innerHTML = "bearbeiten";
            buttonEdit.classList.add("buttonRezepte");
            div.appendChild(buttonEdit);
            buttonEdit.addEventListener("click", handleRezeptBearbeiten);

            let buttonDelete: HTMLElement = document.createElement("button");
            buttonDelete.innerHTML = "löschen";
            buttonDelete.classList.add("buttonRezepte");
            div.appendChild(buttonDelete);
            buttonDelete.addEventListener("click", handleRezeptLoeschen);
        }
    }

    async function handleRezeptLoeschen(_event: Event): Promise<void> {

        let i: string = (<HTMLElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("counter")!;
        document.getElementById("currentRecipeDiv" + i)?.remove();

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/deleteMyRecipe" + "?" + "counter=" + i;
        await fetch(_url);
    }

    async function handleRezeptBearbeiten(_event: Event): Promise<void> {
        
        let div: HTMLDivElement = document.createElement("div");
        div.id = "editCurrentRecipeDiv";
        div.classList.add("editCurrentRecipeClass");
        document.getElementById("editRecipes").appendChild(div);

        let ueberschrift: HTMLElement = document.createElement("p");
        ueberschrift.innerHTML = "Bearbeitungsmodus";
        ueberschrift.classList.add("ueberschrift");
        ueberschrift.appendChild(ueberschrift);

        let zutatenliste: HTMLElement = document.createElement("input");
        zutatenliste.setAttribute("type", "text");
        div.appendChild(zutatenliste);

        let zubereitung: HTMLElement = document.createElement("textarea");
        zubereitung.setAttribute("type", "text");
        div.appendChild(zubereitung);

        let buttonUpdate: HTMLElement = document.createElement("button");
        buttonUpdate.innerHTML = "aktualisieren";
        buttonUpdate.classList.add("buttonRezepte");
        div.appendChild(buttonUpdate);

    }
}
