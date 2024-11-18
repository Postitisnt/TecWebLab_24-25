function mutate(a) {
    var b = "3";
    for (var i = 1; i < 7; i=i+1) {
        b = b + a[i];
    }
    return b;
}
var c = mutate("0,8,3,5,1,9,7,2,4,6");
console.log(c); // Stampa il risultato nella console del browser
console.log(typeof c); // Stampa il datatype