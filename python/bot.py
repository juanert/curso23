#pip install selenium
#pip install webdriver-manager
#Selenium sirve para interactuar con navegadores web de forma automatizada.
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
#Webdriver sirve para tener el controlador del navegador
from webdriver_manager.chrome import ChromeDriverManager

#Inicializar el navegador
options = Options()
options.add_argument("start-maximized") #Iniciar maximizado
#options.add_argument("--headless") #Ejecutar en segundo plano (sin interfaz gráfica)
#Crear el driver del navegador
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

#Navegar a una página web
driver.get("https://es.wikipedia.org/wiki/Danza_balinesa")
#Esperar 10 segundos para que cargue la página
driver.implicitly_wait(10)
#Toma todos los parrafos de la página
parrafos = driver.find_elements(By.TAG_NAME, "p")

#Crear un archivo para guardar el contenido
with open("contenido_wikipedia.txt", "w", encoding="utf-8") as archivo:
    for parrafo in parrafos:
        archivo.write(parrafo.text + "\n\n")

#Cerrar el navegador
driver.quit()