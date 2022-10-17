# SpaceProject

## Install git and learn the absolute basics
[Here is the link to download git](https://git-scm.com/downloads)

[Here is the link to download Github Desktop (easier to use for new people)](https://desktop.github.com/)

[Here is the tutorial link](https://www.freecodecamp.org/news/how-to-use-basic-git-and-github-commands/)

## If you can, learn a bit of js and node.js

Completely optional, not really needed but might help when you use it with python.

## Usage

### Testing

You just need to run `node .` in the terminal to run it. You will need to install node and npm to test this. But before that you will need to run the command `npm install`. Not preferred since I've done most of the testing but not an issue if you do try it out. You can make a pull request on the repository for all changes.

There is a folder named `exampleCache` from where you can use the images/text.

### APOD
Uses [this](https://apod.nasa.gov/apod/astropix.html) if you guys are interested. Check if out before you try using this.

You just need to add the parameters to the json file like so to make a request:
```
{
    "type": "apod",
    "request": "" (can take in values like "today", "random" and a UNIX timestamp in double quotes only, single quotes dont work)
}
```
Saves a `.png` file in the `cache` (use `exampleCache` for your testing) directory along with the information with the date in the format
```
10/17/2022, 11:25:46 PM
X-Ray Rings Around a Gamma Ray Burst
Why would x-ray rings appear around a gamma-ray burst?  The surprising answer has little to do with the explosion itself but rather with light reflected off areas of dust-laden gas in our own Milky Way Galaxy.  GRB 221009A was a tremendous explosion -- a very bright gamma-ray burst (GRB) that occurred far across the universe with radiation just arriving in our Solar System last week.  Since GRBs can also emit copious amounts of x-rays, a bright flash of x-rays arrived nearly simultaneously with the gamma-radiation. In this case, the X-rays also bounced off regions high in dust right here in our Milky Way Galaxy, creating the unusual reflections. The greater the angle between reflecting Milky Way dust and the GRB, the greater the radius of the X-ray rings, and, typically, the longer it takes for these light-echoes to arrive.
Link to the high resolution image: https://apod.nasa.gov/apod/image/2210/GrbRings_SwiftMiller_1458.jpg
```
You guys need to make a GUI to get the input from the user for the date or if the user wants the present day's image or a random one and then display the image, date, information and the link to the image somewhere. Also ask if the user wants to make it his wallpaper and then do it if specified.

### Other features coming soon