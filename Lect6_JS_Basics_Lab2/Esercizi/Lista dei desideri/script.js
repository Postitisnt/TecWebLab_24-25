// Esegui il codice solo quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function () {

    // Riferimento al contenitore che mostrerà i prodotti aggiunti
    const containerProdotti = document.getElementById('containerProdotti');

    // Oggetto che mappa i pulsanti ai rispettivi prodotti
    const productData = {
        btnP1: { name: 'Prodotto 1' }, // btnP1 corrisponde a "Prodotto 1"
        btnP2: { name: 'Prodotto 2' }, // btnP2 corrisponde a "Prodotto 2"
        btnP3: { name: 'Prodotto 3' }, // btnP3 corrisponde a "Prodotto 3"
    };

    /**
     * Funzione per aggiungere o aggiornare un prodotto nella lista
     * @param {string} buttonId - ID del pulsante che è stato cliccato
     */
    function addOrUpdateProduct(buttonId) {
        // Ottieni le informazioni sul prodotto in base al pulsante premuto
        const product = productData[buttonId];
        //console.log(product)

        // Verifica se il prodotto è già presente nel contenitore
        const existingProduct = Array.from(containerProdotti.children).find(
            (child) => child.getAttribute('data-product') === product.name
        );
        //console.log(existingProduct)
        // Spiegazione (più dettagliata nelle slide):
        // 1. `containerProdotti.children`: Ottiene tutti i figli del contenitore come HTMLCollection.
        // 2. `Array.from(containerProdotti.children)`: Converte l'HTMLCollection in un array per usare metodi degli array come `.find()`.
        // 3. `.find()`: Scorre l'array e cerca il primo elemento (figlio del contenitore) che ha un attributo `data-product` uguale a `product.name` Il product lo abbiamo definito subito sopra).
        // Risultato:
        // - Se il prodotto è già presente, restituisce l'elemento `<p>` corrispondente.
        // - Se il prodotto non esiste ancora, restituisce `undefined`.

        if (existingProduct) { // Cioè se non viene ritornato Undefined dal metodo find
            // Se il prodotto esiste, incrementa il conteggio
            const countSpan = existingProduct.querySelector('span'); // Trova lo <span> con il conteggio
            let count = parseInt(countSpan.textContent, 10); // Converte il testo del conteggio in un numero
            count++; // Incrementa il conteggio
            countSpan.textContent = count; // Aggiorna il valore nel DOM

            // Se il conteggio raggiunge 10, disabilita il pulsante
            if (count === 10) {
                document.getElementById(buttonId).disabled = true; // Disabilita il pulsante
            }
        } else {
            // Se il prodotto non esiste, crealo
            const newProduct = document.createElement('p'); // Crea un nuovo elemento <p>
            newProduct.setAttribute('data-product', product.name); // Imposta un attributo personalizzato per identificarlo
            newProduct.innerHTML = product.name + " : <span>1</span>"; // Imposta il nome del prodotto e il conteggio iniziale
            containerProdotti.appendChild(newProduct); // Aggiunge il prodotto al contenitore
        }

        // Ordina alfabeticamente i prodotti nella lista
        sortProducts();
    }

    /**
     * Funzione per ordinare alfabeticamente i prodotti nel contenitore
     */
    function sortProducts() {
        // Ottiene una lista di tutti i figli del contenitore
        const products = Array.from(containerProdotti.children);

        // Ordina i prodotti in base al valore di 'data-product'
        products.sort((a, b) =>
            a.getAttribute('data-product').localeCompare(b.getAttribute('data-product'))
        );

        // Riaggiunge i prodotti ordinati al contenitore
        // Questo non crea duplicati ma riposiziona gli elementi nell'ordine corretto
        products.forEach((product) => containerProdotti.appendChild(product));
    }

    // Associa gli eventi di click ai pulsanti iterando sull'oggetto contenente gli id dei bottoni e i nomi dei prodotti
    Object.keys(productData).forEach((buttonId) => {
        // Per ogni pulsante definito in productData
        document.getElementById(buttonId).addEventListener('click', function () {
            // Aggiungi o aggiorna il prodotto corrispondente quando il pulsante viene cliccato
            addOrUpdateProduct(buttonId);
        });
    });
});
