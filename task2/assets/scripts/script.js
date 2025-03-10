const models = {
    Audi: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q6', 'Q7', 'Q8'],
    BMW: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'i3', 'i4', 'i5', 'i7', 'i8', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8'],
    Mercedes: ['A-class', 'B-class', 'C-class', 'M-class', 'R-class', 'S-class', 'SLC-class', 'SLK-class', 'SLS-class', 'V-class'],
    Volvo: ['C30', 'C70', 'S40', 'S60', 'S80', 'S90', 'V40', 'V50', 'V60', 'V70', 'V90', 'XC40', 'XC60', 'XC70', 'XC90']
};

function updateModels() {
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    
    modelSelect.innerHTML = '<option value="">Выберите модель</option>'; // Сбрасываем модели

    const selectedBrand = brandSelect.value;
    if (selectedBrand) {
        models[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

//Функция расчета стоимости авто:
function calculatePrice() {
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const fuel = document.querySelector('input[name="fuel"]:checked');
    const engine = document.getElementById('engine').value;
    const condition = document.querySelector('input[name="condition"]:checked');
    const owners = document.querySelector('input[name="owners"]:checked');
    
    let price = 0;
    let errorMessage = '';

    if (!brand || !model || !fuel || !engine || !condition) {
        errorMessage = 'Пожалуйста, заполните все обязательные поля.';
    } else if (engine < 1.1 || engine > 3.5) {
        errorMessage = 'Объем двигателя должен быть от 1.1 до 3.5 литров.';
    } else {
        price += (brand === 'Audi' ? 10000 : brand === 'BMW' ? 12000 : brand === 'Volvo' ? 15000 : 20000);
        price += (fuel.value === 'бензин' ? 2000 : fuel.value === 'дизель' ? 3000 : fuel.value === 'газ' ? 1000 : 5000);
        
        if (condition.value === 'подержанный') {
            if (!owners) {
                errorMessage = 'Пожалуйста, выберите количество владельцев для подержанного автомобиля';
            } else {
                price -= (owners.value === '1-2 владельца' ? 2000 : 4000);
            }
        }

        // Добавляем стоимость за объем двигателя
        price += parseFloat(engine) * 500000;
    }

    document.getElementById('priceDisplay').textContent = `Стоимость автомобиля: ${errorMessage ? '-' : price} руб.`;
    document.getElementById('errorDisplay').textContent = errorMessage;

    // Показываем и скрываем поле с количеством владельцев
    document.getElementById('ownersField').style.display = condition && condition.value === 'подержанный' ? 'block' : 'none';
}

function resetCalculator() {
    document.getElementById('brand').selectedIndex = 0;
    updateModels();
    
    document.querySelectorAll('input[type=radio]').forEach(input => input.checked = false);
    
    document.getElementById('engine').value = '';
    
    document.getElementById('ownersField').style.display = 'none';
    
    document.getElementById('priceDisplay').textContent = 'Стоимость автомобиля: -';
    document.getElementById('errorDisplay').textContent = '';
}
