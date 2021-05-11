from re import U
from bs4 import BeautifulSoup
import requests
import os
from random import randrange



#Rango de paginas de las que quieres coger
for i in range (2, 31):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/zaragoza-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C2%2C50%2C0%2C0%2C0%2C0%2C0%2C0&latitude=41.657&longitude=-0.8797'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')


#Rango de paginas de las que quieres coger
for i in range (2, 231):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/zaragoza-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C2%2C50%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=41.657&longitude=-0.879672'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')


#Rango de paginas de las que quieres coger
for i in range (2, 123):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/zaragoza-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C2%2C50%2C208%2C300%2C50297%2C0%2C0%2C0&latitude=41.6576&longitude=-0.878'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')

#Rango de paginas de las que quieres coger
for i in range (2, 28):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/zaragoza-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C2%2C50%2C208%2C300%2C50297%2C0%2C0%2C0&gridType=3&latitude=41.6576&longitude=-0.877996'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')




#Rango de paginas de las que quieres coger
for i in range (2, 123):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/zaragoza-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C2%2C50%2C208%2C300%2C50297%2C0%2C0%2C0&gridType=3&latitude=41.6576&longitude=-0.877996'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')




#Rango de paginas de las que quieres coger
for i in range (2, 93):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/araba-alava-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C18%2C1%2C0%2C0%2C0%2C0%2C0%2C0&latitude=42.8464&longitude=-2.6724'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')




#Rango de paginas de las que quieres coger
for i in range (2, 4):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/araba-alava-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C18%2C1%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=42.8464&longitude=-2.67236'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 11):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/albacete-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C8%2C2%2C0%2C0%2C0%2C0%2C0%2C0&latitude=38.9965&longitude=-1.8562'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')




#Rango de paginas de las que quieres coger
for i in range (2, 186):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/albacete-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C8%2C2%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=38.9965&longitude=-1.85618'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 115):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/albacete-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C8%2C2%2C385%2C0%2C2003%2C0%2C0%2C0&latitude=38.9971&longitude=-1.8545'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')




#Rango de paginas de las que quieres coger
for i in range (2, 10):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/albacete-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C8%2C2%2C385%2C0%2C2003%2C0%2C0%2C0&gridType=3&latitude=38.9971&longitude=-1.85446'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 9):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/caceres-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C11%2C10%2C0%2C0%2C0%2C0%2C0%2C0&latitude=39.475&longitude=-6.3714'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 135):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/caceres-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C11%2C10%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=39.475&longitude=-6.37141'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 62):
        url_dinamica  = 'https://www.fotocasa.es/es/comprar/viviendas/caceres-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C11%2C10%2C407%2C770%2C10037%2C0%2C0%2C0&latitude=39.4744&longitude=-6.3698'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')


#Rango de paginas de las que quieres coger
for i in range (2, 6): 
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/caceres-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C11%2C10%2C407%2C770%2C10037%2C0%2C0%2C0&gridType=3&latitude=39.4744&longitude=-6.3698'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 105): 
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/bilbao/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C18%2C48%2C420%2C791%2C48020%2C0%2C0%2C0&gridType=3&latitude=43.2584&longitude=-2.92256'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')


#Rango de paginas de las que quieres coger
for i in range (2, 67): 
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/zamora-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C7%2C49%2C0%2C0%2C0%2C0%2C0%2C0&latitude=41.5034&longitude=-5.7465'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')



#Rango de paginas de las que quieres coger
for i in range (2, 4): 
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/zamora-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C7%2C49%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=41.5034&longitude=-5.74645'
        print(url_dinamica)

        #Por si peta
        try:
                page = requests.get(url_dinamica)
                if(page.status_code == 200):
                        soup = ' '
                        soup = BeautifulSoup(page.content, 'html.parser')
                        section = ''
                        #Comprueba que existan los campos que se necesitan
                        if(str(soup).find('re-Card-primary') & str(soup).find('re-Searchresult-itemRow')):
                                section = soup.find('section', class_ = 're-Searchresult')
                                div_fuera = ' '
                                div_fuera = section.findAll('article', class_ = 're-Searchresult-itemRow')
                                #Al ser una pagina dinamica estamos perdiendo todas las ofertas de debajo que no estan cargadas
                                #así que para que sea mas rapido se limita esta busqueda
                                for p in range (0, 4):
                                        div = div_fuera[p]
                                        div_interesante = ' '
                                        div_interesante = div.find('div', class_ = 're-Card-primary')
                                        if (div_interesante != None):  
                                                a = div_interesante.find('a', href=True)
                                                if(a['href'].find(',') == -1):
                                                        link = 'https://www.fotocasa.es' + a['href']
                                                        outF = open("./nuevos.txt", "a")
                                                        outF.write(link)
                                                        outF.write(',')
                                                        outF.close()
                                comandosleep = 'sleep ' + str(randrange(1))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(1))
                        os.system(comandosleep)
                        continue
        except:
                print('F')
