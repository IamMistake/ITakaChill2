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


@app.route("/movies/<id>")
def get_single_movie(id):
    backend_folder = "backend"
    static_folder = "static"
    filename = "filmovi.json"

    current_directory = Path.cwd()

    file_path =  current_directory/ backend_folder / static_folder / filename

    with open(file_path,'r') as filmovi:
        filmovi_dict = json.load(filmovi)
        for film in filmovi_dict:
            if film["id"] == int(id):
                return jsonify(film)

    return jsonify(404,f"Movie with id:{id} Not found")

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
        



if __name__ == '__main__':
    app.run(debug=True)