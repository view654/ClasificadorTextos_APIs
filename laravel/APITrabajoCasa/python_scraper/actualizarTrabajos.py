import json
import os
from bs4 import BeautifulSoup
import requests, re, datetime, time, threading

dir = os.path.dirname(__file__) + "\ofertas_trabajo.json"

#Se guardan toda la info del JSON anterior de ofertas de trabajo
with open(dir, 'r') as f:
    trabajos_dict = json.load(f)
    f.close()


#Se recorre la información guardando únicamente los enlaces
for trabajo in trabajos_dict:
    oferta = requests.get(trabajo['enlace'])
    soup1 = BeautifulSoup(oferta.content, 'html.parser')
    pagina = soup1.find('div', class_ = 'top-bar oferta-inactiva offer-detail')
    if(pagina):
        print("ELIMINAR")
        del trabajo['enlace']

#Se almacena la información en formato JSON en el archivo especificado
with open(dir, 'w') as json_file:
    json.dump(trabajos_dict, json_file)



