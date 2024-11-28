var position = 0;
var lightArray = ['green', 'yellow', 'red'];

const change = () => {
    // Recupera tutte le luci del semaforo (div con class='light') in un array
    var lights = document.getElementsByClassName('light');
    
    // Rimuove l'id da tutte le luci per spegnerle in modo più efficiente
    for (let i = 0; i < lights.length; i++) {
        lights[i].removeAttribute('id');
    }
    
    // Incrementa la posizione e torna a 0 se supera l'ultimo colore
    /**
    * Infatti:
        - (0 + 1) % 3 = 1 (Passa da green a yellow).
        - (1 + 1) % 3 = 2 (Passa da yellow a red).
        - (2 + 1) % 3 = 0 (Passa da red a green).
    * Vi ricordo che l'operatore % restituisce il resto della divisione intera
    */
    position = (position + 1) % lightArray.length;
    console.log(position)
    console.log(lights[position])
    
    // Assegna l'id alla luce corrispondente per accenderla
    lights[position].setAttribute('id', lightArray[position]);
};

// Listener per il caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
    // Aggiunge l'evento click dinamicamente al pulsante
    const button = document.getElementById('changeButton');
    button.addEventListener('click', change);
});
