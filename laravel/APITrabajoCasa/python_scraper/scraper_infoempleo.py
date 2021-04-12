import json

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

ofertas_trabajo = []

from bs4 import BeautifulSoup
import requests, re, csv, datetime, time, threading, random

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
        ioferta = requests.get(link_oferta)
        soup1 = BeautifulSoup(ioferta.content, 'html.parser')

        #TITULO DE OFERTA
        titulo_oferta = soup1.find('h1', class_ = 'h1 regular')
        '''
        #COMPAÑIA DE OFERTA
        div1 = soup1.find('div', class_ = 'company')
        compania = div1.find('h2', class_ = 'title')
        print(compania)
        '''

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
            vacantes = li[2].find('p').get_text()
        
        oferta_trabajo = {
            "titulo": titulo_oferta.get_text(),
            "enlace": link_oferta,
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

        print(titulo_oferta.get_text())
        print(link_oferta)
        
        print(localidad, "\n")
        '''
        
        print(jornada)
        print(contrato)
        print(salario)
        print(experiencia)
        print(funciones)
        print(requisitos)
        print(ofrece)
        print(area)
        '''
        ofertas_trabajo.append(oferta_trabajo)



with open('ofertas_trabajo', 'w') as json_file:
    json.dump(ofertas_trabajo, json_file)

