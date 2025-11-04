try:
    cake = 1
    n = int(input("¿Cuántas personas comerán pastel?: "))
    print(f"A cada persona le corresponde: {cake / n} piezas de pastel.")
except ZeroDivisionError:
    print("¡Entonces el cumpleañero se queda el pastel!")
except ValueError:
    print("No sé que número es ese :(")


# Pequeña práctica: Crear un campo que solicite nuevamente al usuario un valor en caso de errores
# Pistas: try... catch + Loops

flag = True
while flag:
    try:
        n = int(input("Ingrese un número: "))
        if type(n) is int:
            print(f"El número ingresado es: {n}")
            flag = False
    except:
        print("Número inválido")
        flag = True
