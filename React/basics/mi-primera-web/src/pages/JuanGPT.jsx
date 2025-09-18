import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";

function JuanGPT() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const textArea = useRef(null);

  // Configuración inicial de OpenAI
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-c15a67a90bc24d3e8f675d167a92718d',
    dangerouslyAllowBrowser: true,
  });


  // Aquí puedes agregar la lógica para interactuar con la API de OpenAI
  const fetchData = async () => {
    console.log(messages)

  }


  const updateMessages = async () => {
    const newMessage = textArea.current.value;
    if (messages.length > 5) {
      setMessages(messages.slice(1));
    }
    setMessages(prevMessages => [...prevMessages, { role: "user", content: newMessage }]);
    textArea.current.value = "";
    setLoading(true)
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
        messages: [messages[0]],
    }).then(
      setLoading(false)
    )
    if (messages.length > 5) {
      setMessages(messages.slice(1));
    }
    setMessages(prevMessages => [...prevMessages, { role: "system", content: response.choices[0].message.content }]);
  }

  return (
    <div className="flex flex-col gap-4 p-8 bg-gray-800 text-blue-600 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">JuanGPT</h1>
      <div className="flex flex-col gap-4 bg-blue-600 p-4 rounded-lg text-white">
        <div className="flex flex-col gap-2 bg-gray-700 p-4 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 self-end" : "bg-gray-600 self-start"}`}>
              <strong>{msg.role === "user" ? "Tú" : "JuanGPT"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end items-center">
          <textarea ref={textArea} name="prompt" className="w-full border border-black/50 rounded-xl p-2" id="prompt"></textarea>
          {
            loading ? <p>Cargando...</p> : <button onClick={updateMessages} className="bg-white text-blue-600 px-4 py-2 rounded-lg">Enviar</button>
          }
        </div>
      </div>
    </div>
  );
}

export { JuanGPT };