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
    bg1= ImageTk.PhotoImage(Image.open(f"{path}/assets/tkbg.jpg"))
    label1 = Label( root, image = bg1)
    label1.place(x = 0, y = 0 ,relwidth=1, relheight=1)    
    txt=Label(root, text='MAIN MENU', font='Helvetica 18', bg='#6495ED')    
    txt.pack(ipadx= 30, ipady=20)

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
        emptyVar = ''

        with open(f'{path}/exampleCache/input.json','w') as myj:            
            data = {
                "type": "const",
                "request": f"{emptyVar}"
            }
            json.dump(data,myj,indent=4)  
            myj.truncate()

        constWin.mainloop()

    AP = tk.Button(root, text='APOD', bg='#6495ED')
    f=font.Font(family='Comicsans',weight='bold')
    AP.place(x=335, y=200, width=130, height=47)
    AP['font']=f

    CON = tk.Button(root, text='Constellations', bg='#6495ED', command=constPack)
    CON.place(x=335,y=270,width=130, height=50)
    CON['font']=f

    LDATA = tk.Button(root, text='Launch Data', bg='#6495ED')
    LDATA.place(x=335,y=340,width=130, height=50)
    LDATA['font']=f   

    SP=tk.Button(root, text="Space Invaders",bg='#6495ED', command = lambda: spaceGame(root))
    SP.place(x=335,y=410,width=130, height=50)
    SP['font']=f

    QBTN = tk.Button(root, text="Quit", bg="#6495ED", command=quit)
    QBTN.place(x=335,y=480,width=130, height=50)
    QBTN['font']=f

    c.pack()
    root.mainloop()

main()