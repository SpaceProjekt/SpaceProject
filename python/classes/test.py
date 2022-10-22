import matplotlib.pyplot as plt
from solarSystem import SolarSystem, SolarSystemBody, Sun, Planet

plt.style.use('dark_background')
solar_system = SolarSystem(400)
sun = Sun(solar_system)
planets = (
    Planet(
        solar_system,
        position=(150, 50, 0),
        velocity=(0, 5, 5),
    )    
)

while True:
    solar_system.calculate()
    solar_system.update()
    solar_system.draw()
    