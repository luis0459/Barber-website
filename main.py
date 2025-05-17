from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated data: booked slots and available slots
booked_slots = {
    "2025-05-15": [9, 10]
}

available_slots = {
    "Mon": [9, 10, 11, 12],
    "Tue": [9, 10, 11]
}

@app.route('/get-availability', methods=['GET'])
def get_availability():
    return jsonify(available_slots)

@app.route('/book-appointment', methods=['POST'])
def book_appointment():
    data = request.json
    date = data['date']
    hour = data['hour']

    # Check if the time slot is already booked
    if date not in booked_slots:
        booked_slots[date] = []

    if hour in booked_slots[date]:
        return jsonify({"status": "error", "message": "Slot already booked."}), 400
    
    booked_slots[date].append(hour)
    return jsonify({"status": "success", "message": "Appointment booked successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
