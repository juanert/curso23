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
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <a href=""></a>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {data && data?.docs ? (
          <ul>
            {data?.docs.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
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
