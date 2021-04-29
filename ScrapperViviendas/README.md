Esta carpeta contiene lo suficiente para hacer un web scrapping de fotocasa recogiendo la siguiente info
{
  link: el enlace de la oferta de vivienda correspondiente, lo usaremos como identificador,
  lugar: lugar donde se sitúa dicha vivienda, se saca de la url empleando una regex
  precio: precio de la vivienda, si es alquiler o compartir finalizará con un / mes
  habitaciones: numero de habitaciones de la vivienda,
  baños: numero de baños de la vivienda,
  metros2: metros cuadrados de la vivienda,
  planta: en que planta se sitúa la vivienda,
  compr_alq_compar: comprar, alquiler o compartir, se saca de la url con una regex,
  tipo: que tipo de vivienda es, ya sea piso, chalet, adosado,...
  imagenes: un array de enlaces a las imágenes de la vivienda
}
Debe tener instalado:
    Beautiful Soup
    requests

<<<<<<<<<SCRAPPER_URLS.PY>>>>>>>>>
Para recopilar las URL's de cada oferta de ejecutará el archivo scrapper_urls.py donde se deberá indicar la url dinámica
que se recorrerá con un for para ir cambiando de página. Analizando el contenido nos dimos cuenta que este proceso era bastante sencillo
si obviabamos la primera pagina e íbamos recorriendo de la segunda hasta el final.
Para ejecutar este script lo único que hará falta será añadir la url dinámica y modificar los valores del for teniendo en cuenta
el numero de paginas que tiene esta búsqueda. P.e.:
url_dinamica = 'https://www.fotocasa.es/es/alquiler/viviendas/avila-provincia/todas-las-zonas/l/'+str(i)+'?combinedLocationIds=724%2C7%2C5%2C0%2C0%2C0%2C0%2C0%2C0&latitude=40.6567&longitude=-4.7002'
Este i corresponde a los valores del for en cada momento.
Este código lo que hará es recorrer las paginas extrayendo las urls de cada oferta y guardándolas en un archivo llamado
"nuevos.txt"
    Nos encontramos con el problema de que fotocasa es una pagina dinámica por lo que solo devuelve al hacer el get las primeras
    3/4 ofertas. Así que será de estas de las que saquemos el link.



<<<<<<<<<SCRAPPER_VIVIENDAS.PY>>>>>>>>>
En cuanto al scrapping de los anuncios individuales, simplemente tendremos que ejecutar el scrapper_viviendas.py
  Este script lo que hace es abrir el archivo nuevos.txt, inicialmente con el truncate lo que hacemos es borrar la ultima coma
  de este archivo para que no de error, después guardamos en un array las urls contenidas en dicho archivo.
  Seguidamente se lanza la función comprobarRepes, lo que hace es filtrar las urls nuevas guardando solo las que no
  están en el json, para evitar la duplicidad de ofertas.

  Seguidamente se procede a scrappear la info de cada url, todo esto se meterá en un try, except para evitar que el programa
  pare en caso de error, como se esta trabajando con un gran volumen de datos, asumimos que que no se recopile la información
  de una url no va a crear un gran impacto, pero si marcará la diferencia en el tiempo que se tarda y la comodidad de ejecutar este método.
  Como se ha intentado automatizar lo máximo el proceso se mete todo en un if de que exista la clase re-DetailHeader-price, ya que observamos
  que algunos códigos fuente no la tenían y daba error.
    div contenido es el div donde se encuentra toda la información que buscamos que tiene la clase "re-RealestateDetail-topContainer"
    Precio1 es el span de clase "re-DetailHeader-price" y posteriormente guardamos en .text en la variable preciovivienda
    Linkvivienda va a ser el enlace que se este ejecutando en el momento
    Lugarvivienda se extrae del enlace gracias a la regex "vivienda\/(.*)\/" y se hace split de "/" para eliminar todo el contenido posterior
    a el lugar, también se hace un replace de "-" por un espacio ya que en algunos casos ponían p.e. "a-coruna"
    compr_alq_comparvivienda es muy parecido a la extracción del lugar ya que se encuentra en la url, la regex usada es "\.es\/es\/(.*)\/vivienda"
    tipovivienda se extrae del h1 de clase "re-DetailHeader-propertyTitle" usando la regex '^(\w*)\s' que básicamente lo que hace es coger la primera palabra.
    En cuanto a los atributos habitaciones, baños, metros cuadrados y numero de planta se hace un proceso un poco mas complejo:
      Inicialmente se guarda el valor 'no especificado' en todas las variables ya que puede no estar especificado en el anuncio.
      Se guarda en lista todos los elementos "li" con la clase "re-DetailHeader-featuresItem"
      Seguidamente se hace un for para recorrer dicha lista y se va comprobando mediante ifs
      si en el texto del elemento de la lista pone hab lo que implica que en ese elemento se encuentra las habitacionesvivienda
      lo mismo se hace con ba --> banosvivienda, m2 --> metros cuadrado, y para el numero de planta se busca las palabras 'Bajos'
      o 'Planta' y se guarda.
    En cuanto a las imagenes se guardaran en un array el atributo 'src' de las imágenes de la clase "re-DetailMosaicPhoto"

    Por ultimo, se genera un string vivienda simulando el formato de json quedando algo tal que así:
    {"link": "https://www.fotocasa.es/es/comprar/vivienda/murcia-capital/aire-acondicionado-calefaccion-parking-jardin-terraza-trastero-piscina/159448084/d",
	"lugar": "murcia capital",
	"precio": "550.000 €",
	"habitaciones": "4 habs.",
	"baños": "3 baños",
	"metros2": "356 m²",
	"planta": "no especificado",
	"compr_alq_compar": "comprar",
	"tipo": "Casa",
	"imagenes": "['https://d.inmofactory.com/1/104016/27592084/379265896.jpg/948x542/a_fill', 'https://d.inmofactory.com/1/104016/27592084/379265897.jpg/482x269/a_fill', 'https://d.inmofactory.com/1/104016/27592084/379265898.jpg/482x269/a_fill', 'https://d.inmofactory.com/1/104016/27592084/379265899.jpg/482x269/a_fill', 'https://d.inmofactory.com/1/104016/27592084/379265900.jpg/482x269/a_fill']"},

    Y se hace un append de este string en el archivo "viviendas.json"

    A continuación se hace un sleep de un numero random entre 0 y 1 para evitar que fotocasa detecte que se esta haciendo un proceso automatizado
    de scrapping

  Lo último que hará este código es borrar la ultima coma y poner un corchete para que el json sea un array de viviendas. Y se vacía
  el archivo nuevos.txt para la siguiente ejecución.

<<<<<<<<<ACTUALIZARJSON.PY>>>>>>>>>
  Este script se ha implementado para que nuestros datos guardados en el json se mantengan actualizados, es decir, que se
  borren las ofertas que ya no están publicadas y se actualicen los datos de las que siguen.
  Inicialmente se guarda en un array los links de las ofertas guardadas en el json, se borra todo el contenido del json.
  Al hacer la petición requests.get se comprueba el status de esta, si esta entre 400 y menor que 500 se salta al siguiente,
  ya que es un error de "Not found", si el status es 200 se realiza el mismo scrappeo que en el archivo "scrapper_viviendas.py"

  Lo último que hará este código es borrar la ultima coma y poner un corchete para que el json sea un array de viviendas.
