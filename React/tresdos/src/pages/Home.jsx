import { useState, useRef } from 'react';

function Home() {
  // lista de tablas: ahora cada task es { id, text }
  const [tables, setTables] = useState([
    { name: 'Por hacer', tasks: [] },
    { name: 'En progreso', tasks: [] },
    { name: 'Hecho', tasks: [] },
  ]);

  // para feedback visual al pasar por una columna
  const [hoverCol, setHoverCol] = useState(null);

  // quién se está arrastrando (origen)
  const dragInfoRef = useRef({ fromCol: null, taskIndex: null });

  //lista de usuarios (igual que antes)
  const users = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Pedro' },
  ];

  // util: crea ids simples
  const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  // agregar tarea
  const addTask = (tableIndex, text) => {
    if (!text.trim()) return;
    setTables(prev => {
      const copy = structuredClone(prev);
      copy[tableIndex].tasks.push({ id: uid(), text: text.trim() });
      return copy;
    });
  };

  // al empezar a arrastrar, guardamos de dónde viene
  const handleDragStart = (fromCol, taskIndex, e) => {
    dragInfoRef.current = { fromCol, taskIndex };
    // también lo metemos en dataTransfer por compatibilidad
    e.dataTransfer.setData('text/plain', JSON.stringify({ fromCol, taskIndex }));
    e.dataTransfer.effectAllowed = 'move';
  };

  // permitir soltar
  const handleDragOver = (toCol, e) => {
    e.preventDefault(); // crucial para permitir drop
    e.dataTransfer.dropEffect = 'move';
    setHoverCol(toCol);
  };

  // al salir de una columna con el puntero arrastrando
  const handleDragLeave = (toCol) => {
    // limpiamos solo si coincide para no parpadear
    setHoverCol(prev => (prev === toCol ? null : prev));
  };

  // soltar: movemos la tarea
  const handleDrop = (toCol, e) => {
    e.preventDefault();
    setHoverCol(null);

    // intenta leer de dataTransfer; si no, usa el ref
    let payload;
    try {
      payload = JSON.parse(e.dataTransfer.getData('text/plain'));
    } catch {
      payload = dragInfoRef.current;
    }
    const { fromCol, taskIndex } = payload ?? {};
    if (fromCol == null || taskIndex == null) return;

    // si sueltas en la misma columna y no quieres reordenar aún, salimos
    // (esta versión añade al final si cambias de columna)
    setTables(prev => {
      const copy = structuredClone(prev);
      const [moved] = copy[fromCol].tasks.splice(taskIndex, 1);
      // si por alguna razón no existe, salimos
      if (!moved) return prev;
      copy[toCol].tasks.push(moved);
      return copy;
    });

    // limpiamos
    dragInfoRef.current = { fromCol: null, taskIndex: null };
  };

  return (
    <>
      <Navbar users={users} />
      <main className='p-8 bg-blue-400 text-white'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen scrollbar-y-auto bg-blue-300/50 p-4 rounded-lg backdrop-blur-2xl'>
          {tables.map((table, index) => (
            <Column
              key={index}
              table={table}
              index={index}
              addTask={addTask}
              hover={hoverCol === index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function Column({
  table,
  index,
  addTask,
  hover,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop
}) {
  return (
    <div
      className={[
        'bg-blue-600/50 p-4 rounded-lg backdrop-blur-2xl flex flex-col justify-between transition-all',
        hover ? 'outline outline-2 outline-white/80 ring-4 ring-white/10' : 'outline-none'
      ].join(' ')}
      // zona de soltado: toda la columna
      onDragOver={(e) => onDragOver(index, e)}
      onDragLeave={() => onDragLeave(index)}
      onDrop={(e) => onDrop(index, e)}
    >
      <div>
        <h2 className='text-xl font-bold mb-4'>{table.name}</h2>
        <div className='space-y-4 min-h-8'>
          {table.tasks.length === 0 ? (
            <p className='text-center text-blue-200'>No hay tareas</p>
          ) : (
            table.tasks.map((task, taskIndex) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => onDragStart(index, taskIndex, e)}
                className='bg-white text-black p-4 rounded-lg shadow-md cursor-grab active:cursor-grabbing select-none'
                title='Arrastra para mover'
              >
                {task.text}
              </div>
            ))
          )}
        </div>
      </div>

      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const text = e.currentTarget.value;
            if (text) {
              addTask(index, text);
              e.currentTarget.value = '';
            }
          }
        }}
        type="text"
        placeholder='Nueva tarea... (Enter)'
        className='mt-4 p-2 bg-white rounded-2xl w-full text-black'
      />
    </div>
  );
}

function Navbar({ users }) {
  return (
    <nav className='flex justify-between items-center bg-blue-600 text-white px-8 py-4'>
      <h1 className='text-2xl font-bold'>TRESDOS</h1>
      <div className='flex items-center gap-4'>
        {users.map(user => (
          <p
            className='bg-red-600 text-white font-black py-2 px-4 rounded-full w-10 h-10 flex items-center justify-center'
            key={user.id}
            title={user.name}
          >
            {user.name.charAt(0).toUpperCase()}
          </p>
        ))}
      </div>
    </nav>
  );
}

export { Home };
