# Manejo de excepciones - try... except
# Permite manejar errores en tiempo de ejecución sin que el programa se detenga abruptamente
# Se pueden capturar errores específicos o generales
# - Un error general se captura con:
#     try:
#         # Código que puede generar un error
#     except Exception as e:
#         # Código para manejar el error (e es el objeto del error y permite acceder a su información)
# - Un error específico se captura con:
#     try:
#         # Código que puede generar un error
#     except TipoDeError:
#         # Código para manejar el error específico

try:
    cake = 1
    n = int(input("¿Cuántas personas comerán pastel?: "))
    print(f"A cada persona le corresponde: {cake / n} piezas de pastel.")
except ZeroDivisionError:
    print("¡Entonces el cumpleañero se queda el pastel!")
except ValueError:
    print("No sé que número es ese :(")


# Pequeña práctica: Crear un campo que solicite nuevamente al usuario un valor en caso de errores

flag = True
while flag:
    try:
        n = int(input("Ingrese un número: "))
        if type(n) is int:  # Permite verificar el tipo de una variable
            print(f"El número ingresado es: {n}")
            flag = False
    except:
        print("Número inválido")
        flag = True
