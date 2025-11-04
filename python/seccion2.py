#Funcion sin retorno ni parametros
def saludar():
  print("¡Hola, mundo!")

saludar()

#Funcion con parametros y sin retorno
def saludar_persona(nombre):
  print(f"¡Hola, {nombre}!")

saludar_persona("Ana")

#Funcion con parametros y con retorno
def sumar(a, b):
  return a + b

resultado = sumar(5, 3)
print(f"La suma es: {resultado}")

class Carro:
  def __init__(self, marca, modelo):
    self.marca = marca
    self.modelo = modelo

  def descripcion(self):
    return f"Carro: {self.marca}"

mi_carro = Carro("Toyota", "Corolla")
print(mi_carro.descripcion())

#metodos de strings
texto = "Hola, Mundo!"
print(texto.lower())  # minusculas
print(texto.upper())  # mayusculas
print(texto.replace("Mundo", "Python"))  # reemplazar

#metodos de listas
numeros = [5, 2, 9, 1]
numeros.append(7)  # agregar elemento al final
numeros.sort(reverse=True)    # ordenar lista
print(numeros)
numeros.reverse() # invertir lista
numeros.remove(2) # eliminar elemento
numeros.clear()  # limpiar lista

#metodos de diccionarios
persona = {"nombre": "Juan", "edad": 30}
persona.keys()  # obtener llaves
persona.values()  # obtener valores
persona.items()  # obtener pares llave-valor
persona.edad

#Bucle while
contador = 0
while contador < 5:
  print(f"Contador: {contador}")
  contador += 1

#Bucle for
carros = ["Toyota", "Honda", "Ford"]

for carro in carros:
  print(f"Carro: {carro}")

#Bucle for con range
for i in range(3):
  print(f"Número: {i}")

"""
  Realiza un programa en python que me permita agregar tareas de una lista y eliminar tareas. 
  Debe mostrar un menu con las opciones disponibles:
  1. Agregar tarea
  2. Eliminar tarea
  3. Mostrar tareas
  4. Salir
"""