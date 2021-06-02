#Codigo para actualizar el json (Ahora mismo tarda unos 45 min)
#INSTALAR beautiful soup y request
import re
import requests
from bs4 import BeautifulSoup
import os
from random import randrange
import json


def arreglarLugar(lugar):
    provincias = []
    municipios = []
    provincia = None
    with open('provincias.json', 'r') as f:
        viviendas_dict = json.load(f)
    for vivienda in viviendas_dict:
        poid = vivienda['provincia_id']
        ans = vivienda['nombre']
        ans.replace('á','a')
        ans.replace('é','e')
        ans.replace('í','i')
        ans.replace('ú','u')
        ans.replace('ç','c')
        ans.replace('ñ','n')
        provincias.append((poid, ans))
    with open('municipios.json', 'r') as f:
        municpios = json.load(f)
    for vivienda in municpios:
        poid = vivienda['provincia_id']
        ans = vivienda['nombre']
        ans.replace('á','a')
        ans.replace('é','e')
        ans.replace('í','i')
        ans.replace('ú','u')
        ans.replace('ç','c')
        ans.replace('ñ','n')
        municipios.append((poid, ans))

    if(lugar.find('capital')):
        nombre = lugar.split(' capital')
        lugar = nombre[0]
    for municipio in municipios:
        mun = municipio[1].lower()
        if(lugar == mun):
            id = municipio[0]
            for prov in provincias:
                idp = prov[0]
                if (id == idp):
                    provincia = prov[1]
    

    if (lugar == 'donostia   san sebastian'):
        provincia = 'Gipuzkoa'
    if (lugar == 'alcala de henares'):
        provincia = 'Madrid'
    if (lugar == 'pulpi'):
        provincia = 'Almería'
    if (lugar == 'mataro'):
        provincia = 'Barcelona'
    if (lugar == 'betera'):
        provincia = 'Valencia'
    if (lugar == 'cordoba'):
        provincia = 'Córdoba'
    if (lugar == 'vilanova i la geltru'):
        provincia = 'Barcelona'
    if (lugar == 'l\'hospitalet de llobregat'):
        provincia = 'Barcelona'
    print(provincia)
    return provincia
    


array_links_antiguos = []
#Lee json ya creado con las viviendas y guarda variables en el array links antiguos
with open('ofertas_vivienda.json', 'r') as f:
    viviendas_dict = json.load(f)
for vivienda in viviendas_dict:
    array_links_antiguos.append(vivienda['link'])

news = []
for ea in array_links_antiguos:
    if ea not in news:
        news.append(ea)


#borramos contenido json
a_file = open("viviendas.json", "w")
a_file.truncate()
a_file.close()

if(len(news)!=0):
    #abrimos el viviendas.json para hacer append
    outF = open("viviendas.json", "a")

    for i in range (len(news)):
    #for i in range (0,1):
        #Para saber cuantos nos quedan por consola 
        print(len(news)-i)
        enlace = news[i]
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
                    
                    div_contacto = soup.find('div', class_ = "re-RealestateDetail-bottomContainer")
                    contacto = 'no especificado'
                    if(str(div_contacto).find('re-ContactDetail-phone') != -1):
                        contacto = div_contacto.find('div', class_ = 're-ContactDetail-phone').text
                    linkvivienda = enlace
                    lugarvivienda = absa[0].replace("-", " ")
                    lugar = arreglarLugar(lugarvivienda)
                    if lugar != None:

                        hb = precio1.text
                        h = hb.split(' ')
                        ea = h[0].replace('.','')
                        preciovivienda = int(ea)

                        #Inicializamos las variables por si en el anuncio no estan especificadas
                        habitacionesvivienda  = -1
                        banosvivienda = -1
                        metroscuadradosvivienda = -1
                        numeroplantavivienda = 'no especificado'
                        
                        #recorremos la lista buscando palabras clave para asignarlas a las variables
                        for a in range (len(lista)):
                            eb = lista[a].findAll('span')
                            i = eb[3]
                            if ((i.text).find('hab') != -1):
                                hb = i.text
                                h = hb.split(' ')
                                habitacionesvivienda = int(h[0])
                            if ((i.text).find('ba') != -1):
                                hb = i.text
                                h = hb.split(' ')
                                banosvivienda = int(h[0])
                            if ((i.text).find('m²') != -1):
                                hb = i.text
                                
                                h = hb.split(' ')
                                metroscuadradosvivienda = int(h[0])
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
                            viv ="\n{\"link\": \"" + linkvivienda + "\",\"lugar\": \"" + lugar + "\",\"precio\": " + str(preciovivienda) + ",\"habitaciones\": " + str(habitacionesvivienda) + ",\"banos\": " + str(banosvivienda) + ",\"metros2\": " + str(metroscuadradosvivienda) + ",\"planta\": \"" + numeroplantavivienda + "\",\"compr_alq_compar\": \"" + compr_alq_comparvivienda + "\",\"tipo\": \"" +tipovivienda +  "\",\"contacto\": \"" +contacto +"\",\"imagenes\": \"" + str(array_imagenes) + "\"},"
                        #print(viv)
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