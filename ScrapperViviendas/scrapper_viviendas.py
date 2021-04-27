import re
import requests
from bs4 import BeautifulSoup
import os
from random import randrange
import json

##RECORDAR: Si el archivo nuevos.txt acaba en coma borrala a mano
# 
#Una vez rematado el proceso abre el json y, borra el corchete de la ultima de viviendas json previo y añadir una coma 
# cambia la ultima coma por un ] 


#txt urls separadas por comas
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
    #Lee json ya creado con las viviendas y guarda variables en el array links antiguos
    with open('viviendas.json', 'r') as f:
        viviendas_dict = json.load(f)

    for vivienda in viviendas_dict:
        array_links_antiguos.append(vivienda['link'])

    #Hace comprobacion de si alguno de los nuevos ya estaba en el array antiguo 
    a_anadir = []
    for item in array_enlaces_nuevos:
        if item not in array_links_antiguos:
            a_anadir.append(item)

    return a_anadir



#Funcion para insertar al json los enlaces nuevos
def insertar_array_json():
    #Se comprueba si alguno ya esta en el json
    arrayenlaces = comprobarRepes(array_enlaces_nuevo)
    #Si hay alguno nuevo que meter
    if (len(arrayenlaces) != 0):

        #Borra el corchete de final del json
        # Añade una coma al final del json        

        #Recorre array de enlaces a añadir
        for enlace in arrayenlaces:
            #print(enlace)
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
                
                viv ="{\"link\": \"" + linkvivienda + "\",\n\t\"lugar\": \"" + lugarvivienda + "\",\n\t\"precio\": \"" + preciovivienda + "\",\n\t\"habitaciones\": \"" + habitacionesvivienda + "\",\n\t\"baños\": \"" + banosvivienda + "\",\n\t\"metros2\": \"" + metroscuadradosvivienda + "\",\n\t\"planta\": \"" + numeroplantavivienda + "\",\n\t\"compr_alq_compar\": \"" + compr_alq_comparvivienda + "\",\n\t\"tipo\": \"" +tipovivienda + "\",\n\t\"imagenes\": \"" + str(array_imagenes) + "\"},\n"
                outF = open("viviendas.json", "a")
                outF.write(viv)
                outF.close()
            comandosleep = 'sleep ' + str(randrange(1))
            os.system(comandosleep)
        
                #Borra el corchete de final del json
        
        #Borra la coma y pone un corchete


insertar_array_json()