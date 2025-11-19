import os
import re
import json

def menu():
  os.system('cls')
  print("""
    Menú de opciones:
    1. Registrar usuario
    2. Buscar usuario
    3. Eliminar un usuario
    4. Actualizar un usuario
    5. Salir
  """)
  opcion = input("Selecciona una opción (1-5): ")
  if opcion == '1':
    registrar_usuario()
  elif opcion == '2':
    buscar_usuario()
  elif opcion == '3':
    eliminar_usuario()
  elif opcion == '4':
    actualizar_usuario()
  elif opcion == '5':
    print("Saliendo del programa.")
    return '5'

def registrar_usuario():
  regex_nombre = r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$"
  regex_cedula = r"^\d{6,9}$"
  regex_email = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  regex_telefono = r"^\d{7,15}$"
  nombre = validar_dato(input("Ingresa el nombre: "), regex_nombre, 'nombre').strip().title()
  apellido = validar_dato(input("Ingresa el apellido: "), regex_nombre, 'apellido').strip().title()
  cedula = validar_dato(input("Ingresa la cédula: "), regex_cedula, 'cédula')
  email = validar_dato(input("Ingresa el correo electrónico: "), regex_email, 'correo electrónico').strip().lower()
  telefono = validar_dato(input("Ingresa el número de teléfono: "), regex_telefono, 'numero_telefono')
  with open('usuarios.json', 'r+') as file:
    usuarios = json.load(file)
    usuarios.append({
      'nombre': nombre,
      'apellido': apellido,
      'cedula': cedula,
      'email': email,
      'telefono': telefono
    })
    file.seek(0)
    json.dump(usuarios, file, indent=2)
  print("Usuario registrado exitosamente.")
  input("Presiona Enter para continuar...")

def validar_dato(dato, regex, tipo):
    informacion = {
      'nombre': "El nombre solo debe contener letras y espacios.",
      'apellido': "El apellido solo debe contener letras y espacios.",
      'cédula': "La cédula debe contener entre 6 y 9 dígitos.",
      'correo electrónico': "El correo electrónico no es válido.",
      'numero_telefono': "El número de teléfono debe contener entre 7 y 15 dígitos."
    }
    while not re.match(regex, dato):
      print(informacion[tipo])
      dato = input(f"Ingresa un {tipo} válido: ")
    return dato

def crear_archivo():
  if not os.path.exists('usuarios.json'):
    with open('usuarios.json', 'w') as file:
      json.dump([], file)

def buscar_usuario():
  dato = input("Ingresa el nombre, apellido o cédula del usuario a buscar: ")
  with open('usuarios.json', 'r') as file:
    usuarios = json.load(file)
    encontrados = [usuario for usuario in usuarios if dato.lower() in usuario['nombre'].lower() or dato.lower() in usuario['apellido'].lower() or dato == usuario['cedula']]
    if encontrados:
      for usuario in encontrados:
        print(f"Nombre: {usuario['nombre']}, Apellido: {usuario['apellido']}, Cédula: {usuario['cedula']}, Email: {usuario['email']}, Teléfono: {usuario['telefono']}")
    else:
      print("No se encontraron usuarios con ese dato.")
  input("Presiona Enter para continuar...")

def actualizar_usuario():
  cedula = input("Ingresa la cédula del usuario a actualizar: ")
  with open('usuarios.json', 'r+') as file:
    usuarios = json.load(file)
    for usuario in usuarios:
      if usuario['cedula'] == cedula:
        print("Usuario encontrado. Ingresa los nuevos datos (deja en blanco para no cambiar):")
        nuevo_nombre = validar_dato(input(f"Nuevo nombre ({usuario['nombre']}): ") or usuario['nombre'], r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$", 'nombre').strip().title()
        nuevo_apellido = validar_dato(input(f"Nuevo apellido ({usuario['apellido']}): ") or usuario['apellido'], r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$", 'apellido').strip().title()
        nuevo_email = validar_dato(input(f"Nuevo correo electrónico ({usuario['email']}): ") or usuario['email'], r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", 'correo electrónico').strip().lower()
        nuevo_telefono = validar_dato(input(f"Nuevo número de teléfono ({usuario['telefono']}): ") or usuario['telefono'], r"^\d{7,15}$", 'numero_telefono')
        usuario.update({
          'nombre': nuevo_nombre,
          'apellido': nuevo_apellido,
          'email': nuevo_email,
          'telefono': nuevo_telefono
        })
        file.seek(0)
        json.dump(usuarios, file, indent=2)
        file.truncate()
        print("Usuario actualizado exitosamente.")
        break
    else:
      print("No se encontró un usuario con esa cédula.")
  input("Presiona Enter para continuar...")

def eliminar_usuario():
  cedula = input("Ingresa la cédula del usuario a eliminar: ")
  with open('usuarios.json', 'r+') as file:
    usuarios = json.load(file)
    nuevos_usuarios = [usuario for usuario in usuarios if usuario['cedula'] != cedula]
    if len(nuevos_usuarios) < len(usuarios):
      file.seek(0)
      json.dump(nuevos_usuarios, file, indent=2)
      file.truncate()
      print("Usuario eliminado exitosamente.")
    else:
      print("No se encontró un usuario con esa cédula.")
  input("Presiona Enter para continuar...")

while True:
  crear_archivo()
  if menu() == '5':
    break