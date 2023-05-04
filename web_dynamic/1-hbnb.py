#!/usr/bin/python3
"""
This module starts a Flask web application that
displays a list of states, cities, amenities, and places.

The module imports the following classes from models:
    - Amenity
    - Place
    - State

The module uses the following Flask methods:
    - Flask
    - render_template

The module contains the following functions:
    - close_db: Removes the current SQLAlchemy session.
    - hbnb: Renders the 0-hbnb.html template with the list of states,
            cities, amenities, and places.
"""
import uuid
from flask import Flask, render_template

from models import storage
from models.amenity import Amenity
from models.place import Place
from models.state import State

app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """
    Remove the current SQLAlchemy Session.

    Args:
        error: The error that occurred.

    Returns:
        None.
    """
    storage.close()


@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """
    Renders the 0-hbnb.html
    template with the list of states,
    cities, amenities, and places.

    Returns:
        rendered template (str): The HTML template with
        the list of states, cities, amenities, and places.
    """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
