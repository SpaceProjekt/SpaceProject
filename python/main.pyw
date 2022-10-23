import os, json, spaceInvaders, subprocess
import tkinter as tk
from tkinter import *
import tkinter.font as font
from PIL import ImageTk, Image
from time import sleep

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
    del(a[-1])
    path = '/'.join(a)
    bg1= ImageTk.PhotoImage(Image.open(f"{path}/python/assets/tkbg.jpg"))
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
        bg2 = ImageTk.PhotoImage(Image.open(f"{path}/python/assets/tkbg.jpg"))
        labelC = Label(constWin, image = bg2)
        labelC.place(x=0, y=0, relwidth=1, relheight=1)
        constVarTk = tk.StringVar()
        def submit():
            constVar = constVarTk.get()
            fetch(constVar)
        sub_btn = tk.Button(constWin, text='Submit', command=submit)
        sub_btn.place(x=150, y=200)
        label2 = tk.Entry(constWin, textvariable=constVarTk, width=50)
        label2.place(x=150, y=150)
        c2.pack()
        def fetch(constVar):
            with open(f'{path}/constellations.json') as c1:
                const1 = json.load(c1)
                j = 0
                for i in const1:
                    if constVar.lower() == i["abbr"].lower():
                        j = 1
                if j == 0:
                    quit()
                if os.path.isfile(f'{path}/cache/constellations/{constVar.upper()}.gif'):
                    constWin.destroy()
                    constImg=tk.Tk()
                    global bg3
                    bg3 = ImageTk.PhotoImage(Image.open(f"{path}/cache/constellations/{constVar.upper()}.gif"))
                    c3 = Canvas(constImg, bg='black', height=bg3.height(), width=bg3.width())
                    constImg.geometry = (f'{bg3.width}x{bg3.height}')
                    constImg.title(f'Constellation: {constVar.upper()}')
                    label3=Label(constImg, image=bg3)
                    label3.place(x=0, y=0, relwidth=1, relheight=1)
                    c3.pack()
                else:
                    with open(f'{path}/cache/input.json','w') as myj:
                        data = {
                            "type": "const",
                            "request": f"{constVar}"
                        }
                        json.dump(data,myj,indent=4)
                        myj.truncate()
                        output= subprocess.run('node .',capture_output=True).stdout
                        sleep(2)
                        output = output.decode("utf-8")
                        if output=='Success!\n':
                            constWin.destroy()
                            constImg=tk.Tk()
                            global bg4
                            bg4 = ImageTk.PhotoImage(Image.open(f"{path}/cache/constellations/{constVar.upper()}.gif"))
                            c3 = Canvas(constImg, bg='black', height=bg3.height(), width=bg3.width())
                            constImg.geometry = (f'{bg3.width}x{bg3.height}')
                            constImg.title(f'Constellation: {constVar.upper()}')
                            label3=Label(constImg, image=bg3)
                            label3.place(x=0, y=0, relwidth=1, relheight=1)
                            c3.pack()
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