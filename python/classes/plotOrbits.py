import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button
from scipy import constants
import math

# Constant definitions
kGC = constants.G
pi = np.pi


def rDef(x, y):
    return math.sqrt(x^2 + y^2)

def thetaDef(a, b):
    if b > 0:
        return math.acos(a/rDef(a, b))
    elif b < 0:
        return 2*pi - math.acos(a/rDef(a, b))
    elif b == 0: 
        if a >= 0:
            return 0
        elif a < 0:
            return - pi

def vR(x, y, theta):
    return y*math.sin(theta) + x*math.cos(theta)

def vTheta(x, y, theta):
    return y*math.cos(theta) - x*math.sin(theta)

def m(kGC, r, vR):
    return kGC/((r**2)*(vR**2))

def n(kGC, r, vR, vTheta):
    return math.sqrt((1/r - m(kGC, r, vR)**2 + (vR/(r*vTheta))**2))

def C(kGC, r, vR, vTheta, theta):
    np.sign(vR*vTheta)*math.acos((1/r - m(kGC, r, vR))/n(kGC, r, vR, vTheta))

def i(x, m, n, C):
    return 1/(m + n*math.cos(x + C))

def eP(m, n):
    return n/m

t = np.linspace(0, 1, 1000)

initY = 0.03
initX = 1
initVx = 1.003 - initX
initVy = 0.076 - initY

fig, ax = plt.subplots()
line, = ax.plot([1000, 10], [10, 1000], lw=2)
ax.set_xlabel('Keplerian Orbit')

fig.subplots_adjust(left=0.35, bottom=0.35)

axX = fig.add_axes([0.25, 0.15, 0.65, 0.03])
x_slider = Slider(
    ax=axX,
    label='X Coordinates',
    valmin=0.1,
    valmax=10,
    valinit=initX,
)

axY = fig.add_axes([0.25, 0.25, 0.0225, 0.63])
y_slider = Slider(
    ax=axY,
    label="Y Coordinates",
    valmin=0.03,
    valmax=10,
    valinit=initY,
    orientation="vertical"
)

axVX = fig.add_axes([0.25, 0.05, 0.65, 0.03])
vx_slider = Slider(
    ax=axVX,
    label='Velocity X',
    valmin=0.1,
    valmax=10,
    valinit=initX,
)

axVY = fig.add_axes([0.07, 0.25, 0.0225, 0.63])
vy_slider = Slider(
    ax=axVY,
    label='Velocity Y',
    valmin=0.03,
    valmax=10,
    valinit=initY,
    orientation="vertical"
)

# Variables

def update(val):
    line.set_ydata(0)
    fig.canvas.draw_idle()

x_slider.on_changed(update)
y_slider.on_changed(update)

resetax = fig.add_axes([0.8, 0.015, 0.1, 0.03])
button = Button(resetax, 'Reset', hovercolor='0.975')

def reset(event):
    x_slider.reset()
    y_slider.reset()

button.on_clicked(reset)

plt.show()
