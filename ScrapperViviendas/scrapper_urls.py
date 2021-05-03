from bs4 import BeautifulSoup
import requests
import os
from random import randrange



#Rango de paginas de las que quieres coger
for i in range (2, 15):
        url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/leon-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C7%2C24%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=42.6008&longitude=-5.56229'
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
                                comandosleep = 'sleep ' + str(randrange(3))
                                os.system(comandosleep)
                else:
                        comandosleep = 'sleep ' + str(randrange(3))
                        os.system(comandosleep)
                        continue
        except:
                print('F')
