const fs = require("fs");

console.log("pre-lectura");
let file = fs.readFileSync("archivo.txt");
console.log("post-lectura");

console.log(file.toString());

console.log("pre-lectura");
fs.readFile("archivo5.txt", function (err, file) {
    if (err) {
        console.error("error", err);
    } else {
        console.log("primero");
        console.log(file.toString());
        fs.readFile("archivo2.txt", (err, data) => {
            console.log(data.toString());
        });
    }
});

fs.readFile("archivo.txt", (err, file) => {
    console.log("segundo");
    console.log(file.toString());
})
console.log("post-lectura");
/*console.log("hello");

console.log("world");
let www = sumar(6, 10);
console.log(www);

let restar = function (x, y) {
    return x - y;
}

console.log(restar(8,5));

function sumar(x, y) {
    return x + y;
}

function saluda(nombre) {
    let texto = "el nombre enviado es: " + nombre;
    return texto;
}*/

