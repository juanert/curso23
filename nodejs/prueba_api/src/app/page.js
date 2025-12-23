"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/users")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => setData(response.data))
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setData((prevData) => ({
              ...prevData,
              docs: prevData.docs.filter((user) => user._id !== id),
            }));
          } else {
            console.error("Error deleting user");
          }
        })
        .catch((error) => console.error("Error deleting user:", error));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <a href=""></a>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {data && data?.docs ? (
          <ul>
            {data?.docs.map((user) => (
              <li key={user._id} className="flex gap-4">
                <p>{user.name} - {user.email}</p> <button onClick={() => handleDelete(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
