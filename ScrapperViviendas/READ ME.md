Esta carpeta contiene lo suficiente para hacer un web scrapping de fotocasa
Debe tener instalado:
    Beautiful Soup 
    requests
Para recopilar las URL's de cada oferta de ejecutará el archivo scrapper_urls.py donde se debera indicar la url dinamica
que se recorrera con un for para ir cambiando de página.
    Sobre esto nos encontramos con el problema de que fotocasa es una pagina dinamica por lo que solo devuelve al hacer el get las primeras
    3-4 ofertas. Así que será de estas de las que saquemos el link guardandolo en el archivo nuevos.txt separado por comas
Una vez acabado el proceso de recoleccion de urls "individuales" hay que recordar borrar la ultima coma del archivo nuevos.txt

En cuanto al scrapping de los anuncios individuales, simplemente tendremos que ejecutar el scrapper_viviendas.py
    Al rematar este proceso será necesario abrirlo, cambiar el corchete que tenia antes al final del archivo por una coma
    y por consiguiente cambiar la coma del final a un cierre de corchete

