from flask import Flask, jsonify, request, render_template, send_from_directory

app = Flask(__name__)

# Мок данные для демонстрации
sensor_data = {
    'temperature': 22,
    'light': 300,
    'noise': 35,
    'co2': 400
}

trashold_data = {
    'temperature': 22,
    'light': 300,
    'noise': 35,
    'co2': 400
}

priorities = {
    'temperature': 1,
    'noise': 3,
    'co2': 4
}

commands = {
     'light_on' : 0,
     'light_off' : 0,
     'curtains_on' : 0,
     'curtains_off' : 0,
     'window_open' : 0,
     'window_close' : 0
}


@app.route('/')
def home():
    return render_template('Main.html')

@app.route('/sensors_data', methods=['GET'])
def sensors():
        return jsonify(sensor_data)

@app.route('/get_trasholds', methods=['GET'])
def send_trasholds():
        global trashold_data
        return jsonify(trashold_data)

@app.route('/get_commands', methods=['GET'])
def send_commands():
        global commands
        a = jsonify(commands)
        commands['light_on'] = 0
        commands['light_off'] = 0
        commands['curtains_on'] = 0
        commands['curtains_off'] = 0
        commands['window_open'] = 0
        commands['window_close'] = 0
        return a

@app.route('/get_priorities', methods=['GET'])
def send_prioritites():
        global priorities
        return jsonify(priorities)

@app.route('/post_sensor_data', methods=['POST'])
def update_data_in_web():
    global sensor_data
    data = request.get_json()
    sensor_data["temperature"] = float(data['temperature'])
    sensor_data["light"] = float(data['light'])
    sensor_data["noise"] = float(data['noise'])
    sensor_data["co2"] = float(data['co2'])
    return jsonify(data), 200



@app.route('/temp_threshold', methods=['POST'])
def rec_temp():
    data = request.get_json()
    trashold_data["temperature"] = float(data['Threshold'])
    return 'OK', 200

@app.route('/light_threshold', methods=['POST'])
def rec_light():
    data = request.get_json()
    trashold_data["light"] = float(data['Threshold'])
    return 'OK', 200

@app.route('/noise_threshold', methods=['POST'])
def rec_noise():
    data = request.get_json()
    trashold_data["noise"] = float(data['Threshold'])
    return 'OK', 200

@app.route('/co2_threshold', methods=['POST'])
def rec_co2():
    data = request.get_json()
    trashold_data["co2"] = float(data['Threshold'])
    return 'OK', 200

@app.route('/new_comand', methods=['POST'])
def rec_comand():
    data = request.get_json()
    commands[data['ccc']] = 1
    print(data['ccc'])
    return 'OK', 200

@app.route('/set_priorities', methods=['POST'])
def set_priorities():
    global priorities
    data = request.get_json()
    priorities['temperature'] = int(data['temperature'])
    priorities['noise'] = int(data['noise'])
    priorities['co2'] = int(data['co2'])

    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)