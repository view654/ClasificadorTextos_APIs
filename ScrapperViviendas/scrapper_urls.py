from re import U
from bs4 import BeautifulSoup
import requests
import os
from random import randrange



#Rango de paginas de las que quieres coger
for i in range (2, 287):
        url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/granada-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C1%2C18%2C291%2C515%2C18087%2C0%2C0%2C0&gridType=3&latitude=37.1777&longitude=-3.59869'
        #851url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/granada-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C1%2C18%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=37.1743&longitude=-3.59888'
        #788url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/girona-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C9%2C17%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=41.9829&longitude=2.82446'
        #358url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/cordoba-capital/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C1%2C14%2C287%2C0%2C14021%2C0%2C0%2C0&gridType=3&latitude=37.8808&longitude=-4.77896'
        #497url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/cordoba-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C1%2C14%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=37.8854&longitude=-4.77603'
        #259url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/ciudad-real-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C8%2C13%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=38.9849&longitude=-3.92843'
        #680url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/castellon-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C19%2C12%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=39.986&longitude=-0.037866'
        #527url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/cantabria-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C6%2C39%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=43.4612&longitude=-3.80912'
        #561url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/cadiz-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C1%2C11%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=36.5301&longitude=-6.29246'
        #212url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/burgos-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C7%2C9%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=42.3408&longitude=-3.70232'
        #257url_dinamica = 'https://www.fotocasa.es/es/comprar/viviendas/badajoz-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C11%2C6%2C0%2C0%2C0%2C0%2C0%2C0&gridType=3&latitude=38.8781&longitude=-6.97032'
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
