from pathlib import Path
from flask import Flask, request, jsonify , abort
from flask_cors import CORS
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/all_movies")
def get_movies():
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    # Get the current working directory
    current_directory = Path.cwd()

    # Navigate to the file using Path objects
    file_path =  current_directory / static_folder / filename
    res = {}
    with open(file_path,'r') as filmovi:
        filmovi_dict = json.load(filmovi)

    
    return filmovi_dict

@app.route("/movies/<id>/<date>/ticket", methods=['POST'])
def book_ticket(id,date):
    film,filmovi_dict = get_movie(id)
    
    payload_data = request.json
    seats_list = payload_data.get('seats','')
    if not film:
        return jsonify({"error": "Movie not found"}), 404
    
    if date not in film["schedule"]:
        return jsonify({"error": "Movie is not scheduled for this date"}), 404
    schedule_matrix = film["schedule"][date]

    for seat in seats_list:
        row = seat['x']
        col = seat['y']
        if schedule_matrix[int(row)][int(col)] != 0:
            return jsonify({"error": "Seat {} is already booked".format(seat)}), 409
        else:
            schedule_matrix[row][col] = 1

        film["schedule"][date] = schedule_matrix
    
    # Save the updated movie data back to the file
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    current_directory = Path.cwd()

    file_path =  current_directory / static_folder / filename

    ovajOvde = {}

    with open(file_path,'r') as filmovi:
        filmovi_dict = json.load(filmovi)
        for film in filmovi_dict:
            if film["id"] == int(id):
                ovajOvde.update(film)

    file_path =  current_directory / backend_folder / static_folder / filename

    with open(file_path, 'w') as filmovi:
        json.dump(filmovi_dict, filmovi, indent=4)
    
    return jsonify({"success": "Tickets booked successfully"}), 200
            

    

@app.route("/movies/<id>")
def get_single_movie(id):
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    current_directory = Path.cwd()

    file_path =  current_directory / static_folder / filename

    ovajOvde = {}

    with open(file_path,'r') as filmovi:
        filmovi_dict = json.load(filmovi)
        for film in filmovi_dict:
            if film["id"] == int(id):
                ovajOvde.update(film)

    # Create a response object with the movie data
    response = jsonify(ovajOvde)

    # Set the Access-Control-Allow-Origin header to allow requests from all origins
    response.headers.add('Access-Control-Allow-Origin', '*')

    # Return the response
    return response

@app.route("/program/<day>")
def get_program_day(day):
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    current_directory = Path.cwd()

    file_path =  current_directory/ backend_folder / static_folder / filename

    with open(file_path,'r') as file:
        filmovi_dict = json.load(file)
        result_json = []
        for film in filmovi_dict:
            schedule = film.get("schedule",{})

            if day in schedule:
                result_json.append(film)



    return jsonify(result_json)
        


def get_movie(id):
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    current_directory = Path.cwd()

    file_path =  current_directory/ backend_folder / static_folder / filename

    with open(file_path,'r') as filmovi:
        filmovi_dict = json.load(filmovi)
        for film in filmovi_dict:
            if film["id"] == int(id):
                return film, filmovi_dict

if __name__ == '__main__':
    app.run(debug=True)