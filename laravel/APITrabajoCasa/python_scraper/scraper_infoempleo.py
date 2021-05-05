import json
from bs4 import BeautifulSoup
import requests, re, datetime, time, threading

urls = ['https://www.infoempleo.com/trabajo/en_a-corunna/', 
'https://www.infoempleo.com/trabajo/en_alava/', 
'https://www.infoempleo.com/trabajo/en_albacete/',
'https://www.infoempleo.com/trabajo/en_alicante/',
'https://www.infoempleo.com/trabajo/en_almeria/',
'https://www.infoempleo.com/trabajo/en_asturias/',
'https://www.infoempleo.com/trabajo/en_avila/',
'https://www.infoempleo.com/trabajo/en_badajoz/',
'https://www.infoempleo.com/trabajo/en_barcelona/',
'https://www.infoempleo.com/trabajo/en_burgos/',
'https://www.infoempleo.com/trabajo/en_caceres/',
'https://www.infoempleo.com/trabajo/en_cadiz/',
'https://www.infoempleo.com/trabajo/en_cantabria/',
'https://www.infoempleo.com/trabajo/en_castellon/',
'https://www.infoempleo.com/trabajo/en_ceuta/',
'https://www.infoempleo.com/trabajo/en_ciudad-real/',
'https://www.infoempleo.com/trabajo/en_cordoba/',
'https://www.infoempleo.com/trabajo/en_cuenca/',
'https://www.infoempleo.com/trabajo/en_girona/',
'https://www.infoempleo.com/trabajo/en_granada/',
'https://www.infoempleo.com/trabajo/en_guadalajara/',
'https://www.infoempleo.com/trabajo/en_guipuzcoa/',
'https://www.infoempleo.com/trabajo/en_huelva/',
'https://www.infoempleo.com/trabajo/en_huesca/',
'https://www.infoempleo.com/trabajo/en_islas-baleares/',
'https://www.infoempleo.com/trabajo/en_jaen/',
'https://www.infoempleo.com/trabajo/en_la-rioja/',
'https://www.infoempleo.com/trabajo/en_las-palmas/',
'https://www.infoempleo.com/trabajo/en_leon/',
'https://www.infoempleo.com/trabajo/en_leon/',
'https://www.infoempleo.com/trabajo/en_lugo/',
'https://www.infoempleo.com/trabajo/en_madrid/',
'https://www.infoempleo.com/trabajo/en_malaga/',
'https://www.infoempleo.com/trabajo/en_melilla/',
'https://www.infoempleo.com/trabajo/en_murcia/',
'https://www.infoempleo.com/trabajo/en_navarra/',
'https://www.infoempleo.com/trabajo/en_ourense/',
'https://www.infoempleo.com/trabajo/en_palencia/',
'https://www.infoempleo.com/trabajo/en_pontevedra/',
'https://www.infoempleo.com/trabajo/en_salamanca/',
'https://www.infoempleo.com/trabajo/en_santa-cruz-de-tenerife/',
'https://www.infoempleo.com/trabajo/en_segovia/',
'https://www.infoempleo.com/trabajo/en_sevilla/',
'https://www.infoempleo.com/trabajo/en_soria/',
'https://www.infoempleo.com/trabajo/en_tarragona/',
'https://www.infoempleo.com/trabajo/en_teruel/',
'https://www.infoempleo.com/trabajo/en_toledo/',
'https://www.infoempleo.com/trabajo/en_valencia/',
'https://www.infoempleo.com/trabajo/en_valladolid/',
'https://www.infoempleo.com/trabajo/en_vizcaya/',
'https://www.infoempleo.com/trabajo/en_zamora/',
'https://www.infoempleo.com/trabajo/en_zaragoza/']

#Información de las ofertas de trabajo
ofertas_trabajo = []
#Enlaces de las ofertas de trabajo antiguas y nuevas
links_trabajos = []
#Enlaces únicos, sin repetidos
ofertas_trabajo_unicas = []

#Se guardan toda la info del JSON anterior de ofertas de trabajo
with open('laravel\APITrabajoCasa\data_json\ofertas_trabajo.json', 'r') as f:
    trabajos_dict = json.load(f)

#Se recorre la información guardando únicamente los enlaces
for trabajo in trabajos_dict:
        links_trabajos.append(trabajo['enlace'])

#Se ingresa a cada enlace para validar la existencia de la oferta de trabajo, 
#de forma que se elimine o almacene nuevamente
for link in links_trabajos:
    oferta = requests.get(link)
    soup1 = BeautifulSoup(oferta.content, 'html.parser')
    pagina = soup1.find('div', class_ = 'top-bar oferta-inactiva offer-detail')
    if(pagina):
        links_trabajos.remove(link)

#Se agregan nuevas ofertas de las páginas de infoempleo
for url in urls:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    div = soup.find('div', class_ = 'sticky-container sticky')

    ul = div.find('ul', class_ = 'mt15 positions')

    ofertas = ul.find_all('li', class_ = 'offerblock')

    for oferta in ofertas:
        titulo = oferta.find('h2', class_ = 'title col-xs-12 col-sm-9 col-md-9')
        link = titulo.find('a')

        #LINK OFERTA
        link_oferta = "https://www.infoempleo.com" + link['href']

        links_trabajos.append(link_oferta)

#Se eliminan las duplicadas del arreglo de enlaces
for link in links_trabajos:
    if link not in ofertas_trabajo_unicas:
        ofertas_trabajo_unicas.append(link)

#Se realiza el scrapper de cada una de las ofertas por enlace
for link in ofertas_trabajo_unicas:
    ioferta = requests.get(link)
    soup1 = BeautifulSoup(ioferta.content, 'html.parser')

    #TITULO DE OFERTA
    titulo_oferta = soup1.find('h1', class_ = 'h1 regular')

    #LOCALIDAD DE OFERTA
    ul = soup1.find_all('ul', class_ = 'details inline')
    li = ul[1].find('li')
    localidad = li.get_text()

    #DETALLES DE OFERTA
    p = soup1.find('p', class_ = 'small mt10')
    detalles = p.get_text().split('-')
    jornada = detalles[0]
    contrato = detalles[1]
    salario = detalles[2]
    experiencia = detalles[3]

    funciones = ''
    requisitos = ''
    ofrece = ''
    area = ''

    offer = soup1.find('div', class_ = 'offer')
    if(offer):
        pre = offer.find_all('pre')
        if(len(pre) > 2):
            funciones = pre[0].get_text()
            requisitos = pre[1].get_text()
            ofrece = pre[2].get_text()
        else:
            funciones = pre[0].get_text()
            requisitos = pre[1].get_text()
            ofrece = ''

    #AREA
    ul = soup1.find('ul', class_ = 'inline boxes mt30')
    if(ul):
        li = ul.find_all('li')
        area = li[0].find('p').get_text()
        
    oferta_trabajo = {
        "titulo": titulo_oferta.get_text(),
        "enlace": link,
        "jornada": jornada,
        "contrato": contrato,
        "salario": salario,
        "experiencia": experiencia,
        "funciones": funciones,
        "requisitos": requisitos,
        "ofrece": ofrece,
        "area": area,
        "localidad": localidad
    }

    ofertas_trabajo.append(oferta_trabajo)

#Se almacena la información en formato JSON en el archivo especificado
with open('laravel\APITrabajoCasa\data_json\ofertas_trabajo.json', 'w') as json_file:
    json.dump(ofertas_trabajo, json_file)
