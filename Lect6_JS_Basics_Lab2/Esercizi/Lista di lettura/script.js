// Quando il DOM è completamente caricato, esegui la funzione principale
document.addEventListener('DOMContentLoaded', function () {
    const bookArr = ["Crime and punishment", "Pinocchio", "Gli argonauti", "Tecnologie Web", "La rosa"]; // Array contenente i titoli dei libri
    const counterArr = [0, 0, 0, 0, 0]; // Array per tenere traccia di quante volte ciascun libro è stato aggiunto alla lista di lettura. L'indice di `counterArr` corrisponde all'indice di `bookArr`.
    const bookList = document.getElementById('bookList'); // Riferimento all'elemento `<ul>` dove verranno mostrati i libri aggiunti alla lista di lettura
    const maxClicks = 10; // Numero massimo di volte che un libro può essere aggiunto alla lista di lettura

    // reference rappresenta l'indice del libro nell'array `bookArr` (es. 0 per "Crime and punishment").
    function addBook(reference) {
        const button = document.getElementById('btn' +reference ); // Ottiene il pulsante associato al libro in base all'indice
		counterArr[reference]++; // Incrementa il contatore per il libro selezionato

        // Disabilita il pulsante se il libro è stato aggiunto il numero massimo di volte
        if (counterArr[reference] >= maxClicks) {
            button.disabled = true;
            button.classList.add('disabled'); // Stile nel css che si aggiunge quando il button è disabled
        }

        let listItem = document.getElementById('book-' + reference); // Controlla se il libro è già presente nella lista di lettura
        if (!listItem) { // Se il libro non è nella lista, crea un nuovo elemento `<li>`
            listItem = document.createElement('li'); // Crea un nuovo elemento <li>
            listItem.id = 'book-' + reference; // Assegna un ID univoco basato sull'indice del libro (e.g. id="book-0") all'elemento <li> appena creato
            bookList.appendChild(listItem); // Aggiunge il nuovo elemento alla lista di lettura
        }

        // Aggiorna il testo dell'elemento `<li>` con il nome del libro e il numero di aggiunte
        listItem.textContent = bookArr[reference] + ': ' + counterArr[reference];

        // Riordina la lista alfabeticamente ogni volta che viene aggiunto un libro
        sortList();
    }

    //Funzione per ordinare la lista di lettura alfabeticamente
    function sortList() {   
        const items = Array.from(bookList.children); // Converte i figli dell'elemento `bookList` (elementi `<li>`) in un array
        // Ordina gli elementi dell'array in base al testo contenuto in ciascun `<li>`
        items.sort(function (a, b) {
            return a.textContent.localeCompare(b.textContent);
        });
		/**
		 * items è un array che contiene gli elementi figli (es. <li>) di bookList, che rappresentano i libri nella lista di lettura.
		 * La funzione sort ordina gli elementi di un array.
		 * La funzione di callback passata a sort definisce come confrontare due elementi a e b. Il risultato di questa funzione determina l'ordine degli elementi.
		 * 
		 * Se la funzione di confronto (callback) restituisce:
		 * 		Un valore negativo: a viene prima di b.
		 * 		Zero: a e b rimangono invariati rispetto al loro ordine.
		 * 		Un valore positivo: b viene prima di a.
		 * 
		 * Che cosa fa a.textContent.localeCompare(b.textContent)?
		 * 		"a.textContent" restituisce il testo contenuto nell'elemento HTML a, perciò una stringa con il testo nell'elemento <li> (e.g. "Crime and punishment: 2")
		 * 		"localeCompare" è un metodo delle stringhe di JavaScript che confronta due stringhe (a e b) in base all'ordine alfabetico o lessicografico
		 * 
		 * La funzione "localeCompare":
		 *		Restituisce un numero negativo se la stringa di a precede quella di b in ordine alfabetico.
		 *		Restituisce 0 se le stringhe sono uguali.
		 *		Restituisce un numero positivo se la stringa di b precede quella di a.
		 */

        // Riaggiunge ogni elemento `<li>` ordinato al DOM (li appendiamo di nuovo in ordine corretto)
        items.forEach(function (item) { // Si utilizza il metodo forEach per iterare su tutti gli elementi dell'array items e applicare una funzione a ciascun elemento
            bookList.appendChild(item); // La funzione appende l'elemento (a questo punto ordinato) nella booklist
        });
    }

    //Aggiunge un event listener "click" a ciascun pulsante associato ai libri
    // Itera su ogni elemento di bookArr utilizzando forEach
	// bookArr è l'array che contiene i titoli dei libri
	bookArr.forEach(function (_, index) { 
		// `_` rappresenta il valore dell'elemento corrente di bookArr.
		// In questo caso, il valore non è utilizzato, ma il parametro è obbligatorio per accedere al secondo parametro (index).
		// JavaScript richiede che il primo parametro venga specificato per accedere al secondo (index).

		// Recupera il pulsante associato al libro usando il suo indice
		// Gli ID dei pulsanti sono del tipo "btn0", "btn1", ..., "btnN"
		const button = document.getElementById('btn' + index);

		// Aggiunge un event listener al pulsante
		// Ogni volta che il pulsante viene cliccato:
		button.addEventListener('click', function () {
			// Chiama la funzione addBook con l'indice del libro
			// Questo permette di sapere quale libro è stato selezionato
			addBook(index);
		});
	});

});
