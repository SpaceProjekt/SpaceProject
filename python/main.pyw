import os
import tkinter as tk
from tkinter import *
import tkinter.font as font
import json
import spaceInvaders
from PIL import ImageTk, Image


def win(root):
    root.geometry('800x533')
    root.title('Space')

def spaceGame(root):        
    spaceInvaders.functions.SpaceInvaders(root)        
    main()

def main():
    root=tk.Tk()    
    c=Canvas(root, height=533, width=800)

    win(root)

    a = os.path.abspath(__file__).split('\\')
    del(a[-1])
    path = '/'.join(a)
    bg= ImageTk.PhotoImage(Image.open(f"{path}/assets/tkbg.jpg"))
    label1 = Label( root, image = bg)
    label1.place(x = 0, y = 0 ,relwidth=1, relheight=1)

    c.pack()


    def constPack():
        CONST()
        main()

    def CONST():
        root.destroy()
        constWin = tk.Tk()        
        c2 = Canvas(constWin, bg='gray16', height=533, width=800)
        constWin.geometry = ('800x533')
        constWin.title('Constellations')
        bg2 = ImageTk.PhotoImage(Image.open(f"{path}/assets/tkbg.jpg"))
        labelC = Label(constWin, image = bg2)
        labelC.place(x=0, y=0, relwidth=1, relheight=1)
        c2.pack()      

        with open(f'{path}/exampleCache/input.json','w') as myj:            
            data = {
                "type": "const",
                "request": f"{input}"
            }
            json.dump(data,myj,indent=4)  
            myj.truncate()

        constWin.mainloop()

    AP = tk.Button(root, text='APOD', bg='#6495ED', width = 50)
    AP.place(x=680, y=400, width=70)

    CON = tk.Button(root, text='Constellations', bg='#6495ED', command=constPack, width = 50)
    myfont=font.Font(size=9)
    CON.place(x=52,y=400,width=125)
    CON['font']=myfont

    LDATA = tk.Button(root, text='Launch Data', bg='#6495ED', width=50)
    LDATA.place(x=271,y=400,width=100)
    LDATA['font']=myfont    

    SP=tk.Button(root, text="Space Invaders",bg='#6495ED', command = lambda: spaceGame(root), width = 50)
    SP.place(x=465,y=400,width=125)
    SP['font']=myfont

    QBTN = tk.Button(root, text="QUIT", bg="#6495ED", command=quit, width=50)
    QBTN.place(x=385,y=460,width=70)
    QBTN['font']=myfont

    c.pack()
    root.mainloop()

main()