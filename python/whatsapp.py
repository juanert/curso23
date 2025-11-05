# Este ejercicio ejecuta una librería de terceros. Se recomienda el uso de un entorno virtual para su instalación.

# Creando un entorno virtual (desde la terminal):
# python -m venv nombre_del_entorno (Ej: py -m venv .venv)

# Activando el entorno virtual:
# - Windows: .\nombre_del_entorno\Scripts\activate (Ej: .\.venv\Scripts\activate)
# - macOS/Linux: source nombre_del_entorno/bin/activate (Ej: source .venv/bin/activate)

# Una vez activado el entorno virtual, se puede instalar la librería de terceros (desde la terminal):
# pip install pywhatkit

# Nota General 1: Para desactivar el entorno virtual, usar el comando:
# deactivate
# Nota General 2: Cada vez que se quiera usar la librería, se debe activar el entorno virtual previamente.
# Nota General 3: El entorno virtual debe ser ignorado en los sistemas de control de versiones (Ej: Git). Para ello, agregar el nombre del entorno virtual al archivo .gitignore.

# Nota para Windows: Si al activar el entorno virtual aparece un error de ejecución de scripts, ejecutar el siguiente comando en la terminal (PowerShell) como administrador:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine

import pywhatkit


# Enviar un mensaje de WhatsApp a un número específico a las 15:30 (3:30 PM)
def send_message(phone_number):
    pywhatkit.sendwhatmsg(
        phone_no=phone_number,
        message="¡Hola! Este es un mensaje enviado automáticamente desde Python.",
        time_hour=15,
        time_min=30,
        wait_time=30,  # Ajustar según conexión a Internet
        tab_close=True,
        close_time=3,
    )


# Enviar un mensaje de WhatsApp inmediatamente
def send_instant_message(phone_number):
    pywhatkit.sendwhatmsg_instantly(
        phone_number, "¡Hola! Este es un mensaje enviado automáticamente desde Python."
    )


# Enviar un mensaje de WhatsApp a un grupo específico
def send_message_to_group(group_link):
    group_id = split = group_link.split("https://chat.whatsapp.com/")[
        1
    ]  # Obtener el ID del grupo desde el enlace
    pywhatkit.sendwhats_instantly(
        group_id,
        "¡Hola a todos! Este es un mensaje enviado automáticamente desde Python.",
    )


# Formato del número: "+código de país número de teléfono" (Ej: +584XXXXXXXXX para un número de Venezuela)
phone_number = "+584144123452"  # Angélica :D

# El enlace del grupo se puede obtener desde la opción "Invitar al grupo mediante enlace"
group_link = "https://chat.whatsapp.com/FEVrYkXiyAy4Ob2XJkPJ8w"  # Grupo de Pruebas. Puedes unirte si quieres.

send_message(phone_number)
# send_instant_message(phone_number)
# send_message_to_group(group_link)

# Otras funciones útiles de pywhatkit:
# - pywhatkit.info("Python", lines=3)  # Obtener información de Wikipedia
# - pywhatkit.playonyt("Python programming")  # Reproducir un video de YouTube


# Nota: Para que los mensajes se envíen correctamente, es necesario que el usuario haya iniciado sesión en WhatsApp Web en el navegador predeterminado.
