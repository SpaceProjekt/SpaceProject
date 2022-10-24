# SpaceProject

## Installation

### Testing

To run this program, the following are needed:
```
• npm
• node.js
• Python (3.8 +)
• pip
```
The npm modules can be installed via the command `npm install` and the python dependencies can be installed via the command `pip install -r requirements.txt`. The main python file is placed in the `python` folder named `main.pyw` which will show you an intuitive GUI.

An example for the `config.json` file is given in `example.config.json`. You will need a NASA api key which can be received from [here](https://api.nasa.gov/).

## Features

Due to lack of active members and time, this project does not have all the features which were meant to be present. Some of them are unfinished such as the Keplerian orbit plotter.

### APOD

Uses the NASA API for APOD (Astronomy Picture Of The Day) which is like the Instagram for the universe: [as seen here](https://apod.nasa.gov/apod/astropix.html)
The downloaded images are stored in `cache/apod` for future access and the image data is stored in `cache/apod/info.txt`.

The user can enter a custom date between June 20, 1995 to the present date to get the image instead of getting a random or the present day's image.

### Constellations

Shows the constellations acknowledged by the [IAU](https://www.iau.org/public/themes/constellations/) in the form of an image.

The user has to enter the 3 letter constellation abbreviation to view the constellation. The abbreviations, their full forms and some other relevant data can also be viewed.

### Space Invaders

A simple game made in pygame where you destroy laser-shooting enemies.

## Other features coming soon