#Codigo para actualizar el json (Ahora mismo tarda unos 45 min)
#INSTALAR beautiful soup y request
import requests
from bs4 import BeautifulSoup
from random import randrange

absa = ""

enlace = "https://github.com/codeforspain/ds-organizacion-administrativa/blob/master/data/islas.json"
page = requests.get(enlace)
if (page.status_code >= 400 and page.status_code <500):
    print("FALLA ISLAS")
else:
    soup = BeautifulSoup(page.content, 'html.parser')
    islas = soup.find('td', class_ = "js-file-line")
    absa =islas.text


enlace = "https://github.com/codeforspain/ds-organizacion-administrativa/blob/master/data/municipios.json"
page = requests.get(enlace)
if (page.status_code >= 400 and page.status_code <500):
    print("FALLA MUNICIPIOS")
else:
    soup = BeautifulSoup(page.content, 'html.parser')
    islas = soup.find('td', class_ = "js-file-line")
    absa = absa + islas.text


enlace = "https://github.com/codeforspain/ds-organizacion-administrativa/blob/master/data/municipios_islas.json"
page = requests.get(enlace)
if (page.status_code >= 400 and page.status_code <500):
    print("FALLA MUNICIPIOS ISLAS")
else:
    soup = BeautifulSoup(page.content, 'html.parser')
    islas = soup.find('td', class_ = "js-file-line")
    absa = absa + islas.text


absa.replace('][', ',')
outF = open("./municipios.json", "a")
outF.write(absa)
outF.close()

enlace = "https://github.com/codeforspain/ds-organizacion-administrativa/blob/master/data/provincias.json"
page = requests.get(enlace)
if (page.status_code >= 400 and page.status_code <500):
    print("FALLA PROVINCIAS")
else:
    soup = BeautifulSoup(page.content, 'html.parser')
    islas = soup.find('td', class_ = "js-file-line")
    outF = open("./provincias.json", "a")

    outF.write(islas.text)
    outF.close()