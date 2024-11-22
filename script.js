function calcularIMC() {
    const nombre = document.getElementById('nombre').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    let altura = document.getElementById('altura').value;

    if (!nombre || !peso || !altura || peso <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    if (altura.includes('.')) {
        altura = parseFloat(altura);
    } else {
        altura = parseFloat(altura) / 100;
    }

    if (altura <= 0) {
        alert("La altura debe ser mayor a 0.");
        return;
    }

    const imc = peso / (altura ** 2);
    let categoria = "";

    if (imc < 18.5) {
        categoria = "Peso insuficiente";
    } else if (imc >= 18.5 && imc < 24.9) {
        categoria = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        categoria = "Sobrepeso";
    } else if (imc >= 30 && imc < 39.9) {
        categoria = "Obesidad";
    } else {
        categoria = "Obesidad extrema";
    }

    document.getElementById('resultadoTexto').textContent = `${nombre}, tu IMC es ${imc.toFixed(2)} - ${categoria} - INSTITUTO INEC - AEC20012025A`;
    resaltarCategoria(categoria);
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('botonCaptura').disabled = false; // Habilitar el botón de captura
}

function resaltarCategoria(categoria) {
    const filas = document.querySelectorAll('tbody tr');
    filas.forEach(fila => {
        fila.classList.remove('highlight');
        if (fila.getAttribute('data-clasificacion') === categoria) {
            fila.classList.add('highlight');
        }
    });
}

function capturarResultado() {
    const nombre = document.getElementById('nombre').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    
    html2canvas(resultadoDiv).then(canvas => {
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL();
        enlace.download = nombre ? `${nombre}_IMC.png` : 'resultado_IMC.png';
        enlace.click();
    });
}

function reiniciarFormulario() {
    // Limpiar todos los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('botonCaptura').disabled = true;
}
