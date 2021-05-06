import re
import requests
from bs4 import BeautifulSoup
import os
from random import randrange
import json


#Borramos la ultima coma del archivo nuevos.txt
with open('./nuevos.txt', 'ab') as filehandle:
    filehandle.seek(-1, os.SEEK_END)
    filehandle.truncate()
filehandle.close()


#Guardamos en array_enlaces_nuevos los enlaces guardados en el archivo nuevos.txt
with open ("./nuevos.txt") as f:
    content = f.read()
array_enlaces_nuevo = content.split(",")


'''
#En su defecto añadir un array a pelo aquí por código
array_enlaces_nuevo = ['asdffgsgasdfadf.com']
'''
##funcion comparar si algun enlace ya esta en el json
def comprobarRepes(array_enlaces_nuevos):
    array_links_antiguos = []
    #Comprobamos primero que no se repitan los links de nuevos.txt
    news = []
    for nuevo in array_enlaces_nuevos:
        if nuevo not in news:
            news.append(nuevo)


    #Lee json ya creado con las viviendas y guarda variables en el array links antiguos
    with open('viviendas.json', 'r') as f:

        viviendas_dict = json.load(f)
    for vivienda in viviendas_dict:
        array_links_antiguos.append(vivienda['link'])



    #Hace comprobacion de si alguno de los nuevos ya estaba en el array antiguo
    a_anadir = []
    for item in news:
        if item not in array_links_antiguos:
            a_anadir.append(item)

    #Imprimimos cuantos enlaces nuevos hay para añadir y lo devolvemos
    print(len(a_anadir))
    return a_anadir

#Funcion para insertar al json los enlaces nuevos
def insertar_array_json():
    #Se comprueba si alguno ya esta en el json
    arrayenlaces = comprobarRepes(array_enlaces_nuevo)



    #Si hay alguno nuevo que meter
    if (len(arrayenlaces) != 0):
        #borramos el cierre de corchete y añadimos una coma
        with open('./viviendas.json', 'ab') as filehandle:
            filehandle.seek(-1, os.SEEK_END)
            filehandle.truncate()
        filehandle.close()
        final = open('./viviendas.json', 'a')
        final.write(',')
        final.close()
        cuanto_queda = len(arrayenlaces)
        #Recorre array de enlaces a añadir
        for enlace in arrayenlaces:
            print(cuanto_queda)
            try:
                page = requests.get(enlace)
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

                    viv ="\n{\"link\": \"" + linkvivienda + "\",\"lugar\": \"" + lugarvivienda + "\",\"precio\": \"" + preciovivienda + "\",\"habitaciones\": \"" + habitacionesvivienda + "\",\"banos\": \"" + banosvivienda + "\",\"metros2\": \"" + metroscuadradosvivienda + "\",\"planta\": \"" + numeroplantavivienda + "\",\"compr_alq_compar\": \"" + compr_alq_comparvivienda + "\",\"tipo\": \"" +tipovivienda + "\",\"imagenes\": \"" + str(array_imagenes) + "\"},"
                    outF = open("viviendas.json", "a")
                    outF.write(viv)
                    outF.close()
                comandosleep = 'sleep ' + str(randrange(1))
                os.system(comandosleep)
            except:
                print('F en ', i)

                #Borra el corchete de final del json
            #Para saber cuanto queda + o -
            cuanto_queda = cuanto_queda -1

    #Borra la coma y pone un corchete
    with open('./viviendas.json', 'ab') as filehandle:
        filehandle.seek(-1, os.SEEK_END)
        filehandle.truncate()
    filehandle.close()
    final = open('./viviendas.json', 'a')
    final.write(']')
    final.close()

    #Borramos el archivo nuevos.txt
    a_file = open("nuevos.txt", "w")
    a_file.truncate()
    a_file.close()


insertar_array_json()
