// Переменная для хранения данных с датчиков
let sensorData = {};

// Функция для получения данных с датчиков с сервера
function fetchSensorData() {
    fetch('/sensors_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch sensor data');
            }
            return response.json();
        })
        .then(data => {
            sensorData = data;
            updateSensorData();
        })
        .catch(error => {
            console.error('Error fetching sensor data:', error);
        });
}

// Функция для отправки обновленных приоритетов на сервер
function sendPriorities() {
    fetch('/api/priorities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(priorities)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update priorities');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Приоритеты обновлены');
            }
        })
        .catch(error => {
            console.error('Error updating priorities:', error);
        });
}

function updateSensorData() {
    document.getElementById("temperature").innerHTML = sensorData.temperature;
    document.getElementById("light").innerHTML = sensorData.light;
    document.getElementById("noise").innerHTML = sensorData.noise;
    document.getElementById("co2").innerHTML = sensorData.co2;
}

function sendTtemp() {
    var temp = parseFloat(document.getElementById('temp-threshold').value);
    var req = new XMLHttpRequest;
    req.open("POST", "/temp_threshold", true);
    req.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок Content-Type
    req.send(JSON.stringify({ Threshold: temp })); // Отправляем данные в формате JSON
    req.onload = function (e) {
    };
}

function sendTlight() {
    var temp = parseFloat(document.getElementById('temp-threshold').value);
    var req = new XMLHttpRequest;
    req.open("POST", "/light_threshold", true);
    req.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок Content-Type
    req.send(JSON.stringify({ Threshold: temp })); // Отправляем данные в формате JSON
    req.onload = function (e) {
    };
}

function sendTnoise() {
    var temp = parseFloat(document.getElementById('temp-threshold').value);
    var req = new XMLHttpRequest;
    req.open("POST", "/noise_threshold", true);
    req.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок Content-Type
    req.send(JSON.stringify({ Threshold: temp })); // Отправляем данные в формате JSON
    req.onload = function (e) {
    };
}

function sendTco2() {
    var temp = parseFloat(document.getElementById('temp-threshold').value);
    var req = new XMLHttpRequest;
    req.open("POST", "/co2_threshold", true);
    req.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок Content-Type
    req.send(JSON.stringify({ Threshold: temp })); // Отправляем данные в формате JSON
    req.onload = function (e) {
    };
}

function toggleDevice(comand)
{
    var req = new XMLHttpRequest;
    req.open("POST", "/new_comand", true);
    req.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок Content-Type
    req.send(JSON.stringify({ ccc: comand })); // Отправляем данные в формате JSON
    req.onload = function (e) {
    };
}


function setPriority() {
    var temp_ = parseInt(document.getElementById('temp-priority').value);
    var noise_ = parseInt(document.getElementById('noise-priority').value);
    var co2_ = parseInt(document.getElementById('co2-priority').value);

    var req = new XMLHttpRequest();
    req.open("POST", "/set_priorities", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({
        temperature: temp_,
        noise: noise_,
        co2: co2_
    }));

    req.onload = function () {
    };

}
// Обновляем данные с датчиков каждые 5 секунд для демонстрации
setInterval(fetchSensorData, 3000);

// Инициализация данных при загрузке страницы
fetchSensorData();


