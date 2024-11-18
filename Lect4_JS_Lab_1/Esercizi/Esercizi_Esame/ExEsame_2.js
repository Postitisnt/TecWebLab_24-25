document.addEventListener('DOMContentLoaded', (event) => {
    function raccogliEManipolaElementi() {
        // Raccoglie tutti gli elementi con classe "C1" e "C2"
        var c1elements = document.getElementsByClassName("C1");
        var c2elements = document.getElementsByClassName("C2");

        // Primo array associativo per conservare i contenuti
        var array_1 = {};
        // Secondo array associativo per conservare i contenuti modificati
        var array_2 = {};

        // Funzione ausiliaria per popolare l'array associativo
        function popolaArray(daElementi, array, indiceBase = 0) {
            for (var i = 0; i < daElementi.length; i++) {
                // Creazione di una chiave univoca per ogni elemento con un indice incrementale basato su indiceBase
                var chiave = 'key_' + (i + indiceBase) + '_';
                // Aggiunta del contenuto dell'elemento all'array associativo
                array[chiave] = daElementi[i].textContent;
            }
        }

        // Popola array_1 con gli elementi di C1
        popolaArray(c1elements, array_1);

        // Calcola l'indice di base per gli elementi C2, che è uguale al numero di elementi C1
        var indiceBaseC2 = c1elements.length; // Indice di base per gli elementi di C2
        popolaArray(c2elements, array_1, indiceBaseC2);

        // Creazione di array_2 con le stesse chiavi di array_1 ma terminanti in "placeholder"
        for (var key in array_1) {
            var chiaveModificata = key + "placeholder";
            array_2[chiaveModificata] = array_1[key];
        }

        // Ritorna entrambi gli array associativi
        return [array_1, array_2];
    }

    // Esempio di come chiamare la funzione e visualizzare il risultato
    var risultati = raccogliEManipolaElementi();
    console.log("Array 1:", risultati[0]);
    console.log("Array 2:", risultati[1]);
});
