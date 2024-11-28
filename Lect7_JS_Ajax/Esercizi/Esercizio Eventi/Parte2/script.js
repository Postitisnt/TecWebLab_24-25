function getEventi(){
    // Creazione di un nuovo oggetto XMLHttpRequest per effettuare richieste HTTP asincrone al server.
    let request = new XMLHttpRequest();

    // Inizializzazione di una richiesta HTTP di tipo GET all'URL specificato.
    request.open("GET", "http://diiorio.nws.cs.unibo.it/twe/07.06.2022a/api/index.php");

    // Invio della richiesta al server.
    request.send();

    // Definizione di una funzione di callback da eseguire quando la risposta è stata completamente ricevuta.
    request.onload = () => {
        // Stampa dell'oggetto request nella console per scopi di debug.
        console.log(request);

        // Controllo dello stato della risposta HTTP; se è 200, la richiesta è andata a buon fine.
        if (request.status == 200) {
            // Parsing della risposta JSON ricevuta dal server e conversione in un oggetto JavaScript.
            var eventi = JSON.parse(request.response);

            // Stampa dell'array 'eventi' nella console per scopi di debug.
            console.log(eventi);

            // Selezione del primo elemento HTML con la classe 'elenco' dove verranno inseriti gli eventi.
            var divElenco = document.getElementsByClassName('elenco')[0];

            // Iterazione attraverso l'array di eventi ricevuti.
            for(var i=0; i < eventi.length; i++){
                // Controlla se l'evento corrente è in evidenza (proprietà 'evidenza' = True).
                if(eventi[i].evidenza){
                    // Creazione di un nuovo elemento 'div' per rappresentare una riga dell'evento.
                    var divRow = document.createElement('div');
                    divRow.setAttribute('class', 'evento row');
                    
                    // Creazione della prima colonna per il titolo e il numero di biglietti disponibili.
                    var divCol = document.createElement('div');
                    divCol.setAttribute('class', 'col-md-12 col-lg-3');

                    // Creazione di un elemento 'a' che contiene il titolo dell'evento.
                    var h4 = document.createElement('a');
                    h4.innerHTML = "<h4>" + eventi[i].title + "</h4>";
                    h4.setAttribute('href', eventi[i].id); // Impostazione dell'attributo 'href' con l'id dell'evento.

                    // Creazione di un paragrafo che mostra il numero di biglietti disponibili.
                    var p = document.createElement('p');
                    p.innerText = eventi[i].n_biglietti + " Biglietti disponibili";
                    
                    // Aggiunta del titolo e del paragrafo alla colonna.
                    divCol.appendChild(h4);
                    divCol.appendChild(p);
                    // Aggiunta della colonna alla riga dell'evento.
                    divRow.appendChild(divCol);
                    
                    // Creazione della seconda colonna per l'orario dell'evento.
                    divCol = document.createElement('div');
                    divCol.setAttribute('class', 'col-md-12 col-lg-3');
                    p = document.createElement('p');
                    p.innerText = eventi[i].time; // Data dell'evento.
                    divCol.appendChild(p);
                    p = document.createElement('p');
                    p.innerText = eventi[i].ora_min + ":00"; // Ora di inizio.
                    divCol.appendChild(p);
                    p = document.createElement('p');
                    p.innerText = "-"; // Separatore.
                    divCol.appendChild(p);
                    p = document.createElement('p');
                    p.innerText = eventi[i].ora_max + ":00"; // Ora di fine.
                    divCol.appendChild(p);
                    divRow.appendChild(divCol);
                    
                    // Creazione della terza colonna per il luogo dell'evento.
                    divCol = document.createElement('div');
                    divCol.setAttribute('class', 'col-md-12 col-lg-3');
                    p = document.createElement('p');
                    p.innerText = eventi[i].place; // Luogo dell'evento.
                    divCol.appendChild(p);
                    divRow.appendChild(divCol);
                    
                    // Creazione della quarta colonna per il pulsante 'Acquista Biglietti'.
                    divCol = document.createElement('div');
                    divCol.setAttribute('class', 'col-md-12 col-lg-3');
                    var a = document.createElement('a');
                    a.setAttribute('class', 'btn btn-primary');
                    a.setAttribute('href', 'ticket-detail.com'); // URL per l'acquisto dei biglietti.
                    a.innerHTML = "Acquista Biglietti";
                    divCol.appendChild(a);
                    divRow.appendChild(divCol);
                    
                    // Aggiunta della riga completa al contenitore 'elenco'.
                    divElenco.appendChild(divRow);
                }
            }
        } else {
            // Se lo stato della risposta non è 200, stampa un messaggio di errore con lo stato e il testo dello stato.
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}
