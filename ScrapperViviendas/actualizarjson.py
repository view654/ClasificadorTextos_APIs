import re
import requests
from bs4 import BeautifulSoup
import os
from random import randrange
import json

array_links_antiguos = []
#Lee json ya creado con las viviendas y guarda variables en el array links antiguos
with open('viviendas.json', 'r') as f:
    viviendas_dict = json.load(f)

for vivienda in viviendas_dict:
    array_links_antiguos.append(vivienda['link'])

#borramos contenido json

a_file = open("viviendas.json", "w")
a_file.truncate()
a_file.close()

if(len(array_links_antiguos)!=0):
    outF = open("viviendas.json", "a")

    for i in range (len(array_links_antiguos)):
        print(len(array_links_antiguos)-i)
        enlace = array_links_antiguos[i]
        try:
            page = requests.get(enlace)
            if(i == 0):
                outF.write('[')

            if (page.status_code >= 400 and page.status_code <500):
                #print(page.status_code)
                pass
            elif(page.status_code == 200):
                soup = BeautifulSoup(page.content, 'html.parser')
                if (str(soup).find('re-DetailHeader-price') != -1):

                    div_contenido = soup.find('div', class_ = "re-RealestateDetail-topContainer")
                    precio1 = div_contenido.find('span' , class_ = "re-DetailHeader-price")
                    cositas = div_contenido.find('div' , class_ = "re-DetailHeader-propertyTitleContainer")
                    donde = cositas.find('h1', class_ = "re-DetailHeader-propertyTitle")
                    cosill = div_contenido.find('ul' , class_ = 're-DetailHeader-features')
                    lista = cosill.findAll('li' , class_ = "re-DetailHeader-featuresItem")
                    regexTipo = '^(\w*)\s'
                    regexCAC = '\.es\/es\/(.*)\/vivienda'
                    reg = 'vivienda\/(.*)\/'
                    hecho = re.search(reg, enlace).group(1)
                    absa = hecho.split('/')

                    linkvivienda = enlace
                    lugarvivienda = absa[0].replace("-", " ")
                    preciovivienda = precio1.text

                    habitacionesvivienda  = 'no especificado'
                    banosvivienda = 'no especificado'
                    metroscuadradosvivienda = ' no especificado'
                    numeroplantavivienda = 'no especificado'

                    for a in range (len(lista)):
                        i = lista[a]
                        if ((i.text).find('hab') != -1):
                            habitacionesvivienda = i.text
                        if ((i.text).find('ba') != -1):
                            banosvivienda = i.text
                        if ((i.text).find('m²') != -1):
                            metroscuadradosvivienda = i.text
                        if (i.text == 'Bajos'):
                            numeroplantavivienda = 'Bajos'
                        if((i.text).find('Planta') != -1):
                            numeroplantavivienda = i.text
                        
                    
                    compr_alq_comparvivienda = re.search(regexCAC, enlace).group(1)
                    tipovivienda = re.search(regexTipo, donde.text).group(1)
                    array_imagenes = []
                    for item in soup.find_all('img', class_ = 're-DetailMosaicPhoto'):
                        array_imagenes.append(item['src'])
                    
                    viv ="\n{\"link\": \"" + linkvivienda + "\",\n\t\"lugar\": \"" + lugarvivienda + "\",\n\t\"precio\": \"" + preciovivienda + "\",\n\t\"habitaciones\": \"" + habitacionesvivienda + "\",\n\t\"baños\": \"" + banosvivienda + "\",\n\t\"metros2\": \"" + metroscuadradosvivienda + "\",\n\t\"planta\": \"" + numeroplantavivienda + "\",\n\t\"compr_alq_compar\": \"" + compr_alq_comparvivienda + "\",\n\t\"tipo\": \"" +tipovivienda + "\",\n\t\"imagenes\": \"" + str(array_imagenes) + "\"},"
                    
                    outF.write(viv)
                #comandosleep = 'sleep ' + str(randrange(1))
                #os.system(comandosleep)
        except:
            print('F en ', i)

    outF.close()

with open('./viviendas.json', 'ab') as filehandle:
    filehandle.seek(-1, os.SEEK_END)
    filehandle.truncate()
filehandle.close()

final = open('./viviendas.json', 'a')
final.write(']')
final.close()