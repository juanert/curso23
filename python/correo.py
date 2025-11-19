import smtplib
from email.mime.text import MIMEText

#Correo
email = ""
#Debes generar una contraseña de aplicación (no usas tu contraseña normal)
password = ""

#Este es el contenido del correo
msg = MIMEText("Este es un correo enviado desde Python usando smtplib.")
#El asunto
msg['Subject'] = 'Correo desde Python'
#El remitente
msg['From'] = email
#El destinatario
msg['To'] = input("Ingresa el correo del destinatario: ")

#Configurar el servidor SMTP de Gmail
with smtplib.SMTP('smtp.gmail.com', 587) as server:
    server.starttls()  # Iniciar la conexión segura
    server.login(email, password)  # Iniciar sesión en el servidor
    server.send_message(msg)  # Enviar el correo
    print("Correo enviado exitosamente.")