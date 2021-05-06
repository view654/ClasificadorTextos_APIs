#Codigo para actualizar el json (Ahora mismo tarda unos 45 min)
#INSTALAR beautiful soup y request
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
    #abrimos el viviendas.json para hacer append
    outF = open("viviendas.json", "a")

    for i in range (len(array_links_antiguos)):
        #Para saber cuantos nos quedan por consola 
        print(len(array_links_antiguos)-i)
        enlace = array_links_antiguos[i]
        #Se hace dentro de un try por tema de automatizar el proceso
        try:
            #Hacemos el get del codigo fuente del enlace
            page = requests.get(enlace)
            #si estamos en la primera iteracion, se escribe el corchete para hacer un array de elementos
            if(i == 0):
                outF.write('[')
            #Si el status de la consulta esta entre 400 y 500 (menor) es un not found
            #500 es error de servidor
            if (page.status_code >= 400 and page.status_code <500):
                #print(page.status_code)
                pass
            #Si el status es igual a 200 es que se obtuvo bien el codigo fuente
            elif(page.status_code == 200):
                soup = BeautifulSoup(page.content, 'html.parser')
                #Como a veces falta el precio y es un campo que nos interesa mucho hacemos el siguiente if
                if (str(soup).find('re-DetailHeader-price') != -1):
                    #Donde esta el contenido que nos interesa
                    div_contenido = soup.find('div', class_ = "re-RealestateDetail-topContainer")
                    #Precio
                    precio1 = div_contenido.find('span' , class_ = "re-DetailHeader-price")
                    #Donde encontramos el titulo del anuncio
                    cositas = div_contenido.find('div' , class_ = "re-DetailHeader-propertyTitleContainer")
                    #Sacamos el titulo pe "Piso en Santiago de Compostela"
                    donde = cositas.find('h1', class_ = "re-DetailHeader-propertyTitle")
                    #Lista donde se encuentran el nº de habs, ban, metros2 y la planta
                    cosill = div_contenido.find('ul' , class_ = 're-DetailHeader-features')
                    lista = cosill.findAll('li' , class_ = "re-DetailHeader-featuresItem")
                    regexTipo = '^(\w*)\s'
                    regexCAC = '\.es\/es\/(.*)\/vivienda'
                    #El lugar se saca del enlace haciendo la regex y sustituyendo los - por espacios
                    reg = 'vivienda\/(.*)\/'
                    hecho = re.search(reg, enlace).group(1)
                    absa = hecho.split('/')

                    linkvivienda = enlace
                    lugarvivienda = absa[0].replace("-", " ")
                    preciovivienda = precio1.text

                    #Inicializamos las variables por si en el anuncio no estan especificadas
                    habitacionesvivienda  = 'no especificado'
                    banosvivienda = 'no especificado'
                    metroscuadradosvivienda = ' no especificado'
                    numeroplantavivienda = 'no especificado'
                    
                    #recorremos la lista buscando palabras clave para asignarlas a las variables
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
                        
                    
                    #Si es compra, alquiler o compartir, se saca del enlace
                    compr_alq_comparvivienda = re.search(regexCAC, enlace).group(1)
                    tipovivienda = re.search(regexTipo, donde.text).group(1)
                    #Para las imagenes del anuncio se busca el tipo img de la siguiente clase y se guarda en un array
                    array_imagenes = []
                    for item in soup.find_all('img', class_ = 're-DetailMosaicPhoto'):
                        array_imagenes.append(item['src'])
                    
                    #Construimos un string simulando la estructura de un objeto en json
                    viv ="\n{\"link\": \"" + linkvivienda + "\",\"lugar\": \"" + lugarvivienda + "\",\"precio\": \"" + preciovivienda + "\",\"habitaciones\": \"" + habitacionesvivienda + "\",\"banos\": \"" + banosvivienda + "\",\"metros2\": \"" + metroscuadradosvivienda + "\",\"planta\": \"" + numeroplantavivienda + "\",\"compr_alq_compar\": \"" + compr_alq_comparvivienda + "\",\"tipo\": \"" +tipovivienda + "\",\"imagenes\": \"" + str(array_imagenes) + "\"},"
                    
                    #Lo escribimos en el json
                    outF.write(viv)
        #Por saber donde falla
        except:
            print('F en ', i)
    #Cerramos archivo
    outF.close()

#Borramos la ultima coma escrita
with open('./viviendas.json', 'ab') as filehandle:
    filehandle.seek(-1, os.SEEK_END)
    filehandle.truncate()
filehandle.close()

#Cerramos el corchete para dejar el formato del archivo viviendas.json como un array de objetos "vivienda"
final = open('./viviendas.json', 'a')
final.write(']')
final.close()