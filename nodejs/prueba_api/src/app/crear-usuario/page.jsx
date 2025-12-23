"use client";
import { useState, useRef } from "react";

function CrearUsuario() {
  const [error, setError] = useState([]);
  const name = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const password = useRef(null);

  const validateData = async () => {
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const ageValue = parseInt(age.current.value, 10);
    const passwordValue = password.current.value;
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let emailExists = false;
    setError([]);

    await fetch("http://localhost:3001/api/users?email=" + emailValue)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          emailExists = true;
          setError((prev) => [...prev, "El email ya está en uso."]);
        }
      })
      .catch((error) => {
        console.error("Error checking email existence:", error);
      });

    if (!nameRegex.test(nameValue)) {
      setError((prev) => [...prev, "Nombre inválido."]);
    }
    if (!emailRegex.test(emailValue)) {
      setError((prev) => [...prev, "Email inválido."]);
    }
    if (isNaN(ageValue) || ageValue < 0 || ageValue > 120) {
      setError((prev) => [...prev, "Edad inválida."]);
    }
    if (!passwordRegex.test(passwordValue)) {
      setError((prev) => [...prev, "Contraseña inválida."]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateData();
    if (error.length === 0) {
      const userData = {
        name: name.current.value,
        email: email.current.value,
        age: parseInt(age.current.value, 10),
        password: password.current.value,
      };
      await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Usuario creado exitosamente");
            name.current.value = "";
            email.current.value = "";
            age.current.value = "";
            password.current.value = "";
          } else {
            alert("Error al crear el usuario");
            console.log("Error response:", response);
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Crear Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-400 text-black p-6 rounded shadow-md flex flex-col gap-4"
      >
        <label>Nombre:</label>
        <input ref={name} className="border" type="text" name="name" />
        <br />
        <label>Email:</label>
        <input ref={email} className="border" type="email" name="email" />
        <br />
        <label>Edad:</label>
        <input ref={age} className="border" type="number" name="age" />
        <br />
        <label>Contraseña:</label>
        <input
          ref={password}
          className="border"
          type="password"
          name="password"
        />
        <br />
        <button type="submit">Crear Usuario</button>
        {error.length > 0 && (
          <div className="bg-red-200 text-red-800 p-4 rounded mt-4">
            <ul>
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default CrearUsuario;
