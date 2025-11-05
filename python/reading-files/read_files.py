# Módulos en Python
# Permiten extender las funcionalidades del lenguaje
# Pueden ser módulos nativos, de terceros o personalizados
# - Los módulos nativos vienen incluidos con la instalación de Python
# - Los módulos de terceros se instalan mediante gestores de paquetes como pip. Se recomienda usar entornos virtuales

import time
import os
import sys 


# Módulo time
# Permite manipular fechas y horas
# - time() --> Retorna el tiempo actual en segundos desde la época (1 de enero de 1970)
# - sleep(segundos) --> Pausa la ejecución del programa por el número de segundos indicado

# Módulo os
# Permite manipular ciertos sectores del sistema operativo
# - os.path --> Manipula rutas de archivos y directorios
# - os.getcwd() --> Retorna el directorio de trabajo actual
# - os.listdir() --> Retorna una lista con los archivos y carpetas en un directorio

# Módulo sys
# Permite manipular ciertos aspectos del sistema y la ejecución de scripts
# - sys.argv --> Lista de argumentos pasados al script desde la línea de comandos

# Manejo de archivos
# Permite leer y escribir archivos en el sistema de archivos
# - open(ruta, modo) --> Abre un archivo en la ruta especificada con el modo indicado
#   Algunos modos de apertura de archivos:
#   - r --> Lectura
#   - w --> Escritura
#   - a --> Adición


# Leer un archivo de texto línea por línea
def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            for i, line in enumerate(file):
                print(f"Línea {i + 1}: {line.strip()}")
    except FileNotFoundError:
        print(f"Error: El archivo '{file_path}' no se encontró.")
        return


# Crear un archivo de texto con varias líneas para pruebas
def create_file(file_path):
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(
                "Esta es la primera línea.\n"
            )  # Escribe una nueva línea en el archivo
            file.write("Esta es la segunda línea.\n")
            file.write("Esta es la tercera línea.\n")

        print("Ejecución finalizada con éxito.")
    except Exception as e:
        print(f"Error al crear el archivo: {e}")
        return


# Modificar un archivo de texto añadiendo nuevas líneas
def append_to_file(file_path, lines):
    try:
        with open(file_path, "a", encoding="utf-8") as file:
            for line in lines:
                file.write(line + "\n")
        print("Ejecución finalizada con éxito.")
    except Exception as e:
        print(f"Error al modificar el archivo: {e}")
        return
    

path_to_read = "sample.txt"
read_file(path_to_read)

path_to_create = "new_file.txt"
create_file(path_to_create)

lines_to_add = ["Esta es una línea añadida 1.", "Esta es una línea añadida 2."]
append_to_file(path_to_create, lines_to_add)


# Crear un script que lea un archivo de texto, maneje los errores del mismo y muestre el tiempo de ejecución de la lectura

def read_file_with_timers(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            start_time = (
                time.time()
            )  # Permite capturar el tiempo de inicio de la lectura
            for i, line in enumerate(file):
                time.sleep(0.01)  # Simula una demora en la lectura
                enlapsed = time.time() - start_time  # Calcula el tiempo de ejecución
                print(f"[{enlapsed:.2f} seg] Línea {i + 1}: {line.strip()}")


            print(f"Ejecución finalizada tras {enlapsed:.2f} segundos.")
    except FileNotFoundError:
        print(f"Error: El archivo '{file_path}' no se encontró.")
        return

path = "sample.txt"
read_file_with_timers(path)
