// Calculator logic for Print-Master
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const gotoContactBtn = document.getElementById('gotoContactBtn');
    const resultDiv = document.getElementById('result');

    // Function to show calculate button
    function showCalculateBtn() {
        calculateBtn.style.display = 'block';
        gotoContactBtn.style.display = 'none';
        resultDiv.textContent = '';
    }

    // Initially show calculate button
    showCalculateBtn();

    // Add event listeners to form fields to show button on change
    const formFields = ['category', 'format', 'paper', 'color', 'pages', 'quantity', 'foil', 'uv', 'lamination', 'cutting', 'urgent'];
    formFields.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('change', showCalculateBtn);
        element.addEventListener('input', showCalculateBtn);
    });

    // Add listeners for checkbox buttons styling
    ['foil', 'uv', 'lamination', 'cutting', 'urgent'].forEach(id => {
        const checkbox = document.getElementById(id);
        const label = checkbox.parentElement;
        checkbox.addEventListener('change', function() {
            label.classList.toggle('checked', this.checked);
        });
        // Set initial state
        label.classList.toggle('checked', checkbox.checked);
    });

    // Pricing rates (in rubles)
    const rates = {
        business: { // Визитки / Бланки
            base: 5, // per unit
            foil: 2,
            uv: 3,
            lamination: 1,
            cutting: 1.5,
            urgent: 5
        },
        packaging: { // Упаковка
            base: 15,
            foil: 5,
            uv: 7,
            lamination: 3,
            cutting: 4,
            urgent: 10
        },
        books: { // Книги / Брошюры
            base: 10,
            foil: 4,
            uv: 5,
            lamination: 2,
            cutting: 3,
            urgent: 8
        },
        calendars: { // Календари
            base: 20,
            foil: 6,
            uv: 8,
            lamination: 4,
            cutting: 5,
            urgent: 12
        },
        gifts: { // Подарочная полиграфия
            base: 25,
            foil: 8,
            uv: 10,
            lamination: 5,
            cutting: 6,
            urgent: 15
        }
    };

    // Format multipliers
    const formatMultipliers = {
        '90x50': 1,
        '210x297': 1.5,
        '148x210': 1.2,
        'custom': 2 // Assume larger/custom
    };

    // Paper multipliers
    const paperMultipliers = {
        'standard': 1,
        'glossy': 1.1,
        'matte': 1.05,
        'designer': 1.2
    };

    // Color multipliers
    const colorMultipliers = {
        'bw': 1,
        'color': 1.5
    };

    calculateBtn.addEventListener('click', function() {
        const category = document.getElementById('category').value;
        const format = document.getElementById('format').value;
        const paper = document.getElementById('paper').value;
        const color = document.getElementById('color').value;
        const pages = parseInt(document.getElementById('pages').value) || 1;
        const quantity = parseInt(document.getElementById('quantity').value) || 100;
        const foil = document.getElementById('foil').checked;
        const uv = document.getElementById('uv').checked;
        const lamination = document.getElementById('lamination').checked;
        const cutting = document.getElementById('cutting').checked;
        const urgent = document.getElementById('urgent').checked;

        if (!category || !format) {
            resultDiv.textContent = 'Пожалуйста, выберите категорию и формат.';
            return;
        }

        let total = 0;

        // Base price per unit
        let basePrice = rates[category].base;

        // Apply multipliers
        basePrice *= formatMultipliers[format];
        basePrice *= paperMultipliers[paper];
        basePrice *= colorMultipliers[color];

        // Multiply by pages
        basePrice *= pages;

        // Total for quantity
        total = basePrice * quantity;

        // Add extras
        if (foil) {
            total += rates[category].foil * quantity;
        }
        if (uv) {
            total += rates[category].uv * quantity;
        }
        if (lamination) {
            total += rates[category].lamination * quantity;
        }
        if (cutting) {
            total += rates[category].cutting * quantity;
        }
        if (urgent) {
            total += rates[category].urgent * quantity;
        }

        // Display result
        resultDiv.textContent = `Общая стоимость: ${total.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} руб.`;

        // Hide calculate button and show contact button
        calculateBtn.style.display = 'none';
        gotoContactBtn.style.display = 'block';
    });

    gotoContactBtn.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});