document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos los elementos del DOM
    const colorBox = document.getElementById('color-box');
    const hexCodeSpan = document.getElementById('hex-code');
    const colorPicker = document.getElementById('color-picker');
    
    // Controles deslizantes e inputs de texto
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');

    /**
     * Actualiza el color y los valores de los sliders e inputs basándose en los valores
     * de los sliders (rojo, verde, azul).
     */
    function updateColorFromSliders() {
        let r = parseInt(redSlider.value);
        let g = parseInt(greenSlider.value);
        let b = parseInt(blueSlider.value);

        // Validar y ajustar valores a un rango de 0-255
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        // Sincronizar los valores de los sliders e inputs
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;

        // Actualizar el color del cuadro y el código hexadecimal
        const hex = rgbToHex(r, g, b);
        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCodeSpan.textContent = hex;
        colorPicker.value = hex;
    }

    /**
     * Actualiza el color y los controles basándose en el valor del color picker.
     */
    function updateColorFromPicker() {
        const hex = colorPicker.value;
        const rgb = hexToRgb(hex);

        // Si el valor es válido, actualizar todos los controles
        if (rgb) {
            redSlider.value = rgb.r;
            greenSlider.value = rgb.g;
            blueSlider.value = rgb.b;
            redInput.value = rgb.r;
            greenInput.value = rgb.g;
            blueInput.value = rgb.b;

            // Actualizar el color del cuadro y el código hexadecimal
            colorBox.style.backgroundColor = hex;
            hexCodeSpan.textContent = hex.toUpperCase();
        }
    }

    // Funciones de conversión
    function toHex(c) {
        const hex = Number(c).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + toHex(r) + toHex(g) + toHex(b);
    }

    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Agregamos eventos de escucha
    redSlider.addEventListener('input', updateColorFromSliders);
    greenSlider.addEventListener('input', updateColorFromSliders);
    blueSlider.addEventListener('input', updateColorFromSliders);

    redInput.addEventListener('input', () => {
        redSlider.value = redInput.value;
        updateColorFromSliders();
    });
    greenInput.addEventListener('input', () => {
        greenSlider.value = greenInput.value;
        updateColorFromSliders();
    });
    blueInput.addEventListener('input', () => {
        blueSlider.value = blueInput.value;
        updateColorFromSliders();
    });

    colorPicker.addEventListener('input', updateColorFromPicker);

    // Inicializamos el color al cargar la página
    updateColorFromSliders();
});