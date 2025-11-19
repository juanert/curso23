// Declaracion de una variable sin tipo explicito
let nombre = "Juan";
nombre = "Pedro"; // Correcto

//Una variable con tipo explicito
let edad: number = 30;
let apellido: string = "Perez";
let esEstudiante: boolean = true;
let carros: string[] = ["Toyota", "Honda", "Ford"];
let persona: { nombre: string; edad: number } = { nombre: "Ana", edad: 25 };
let cualquiera: any = "Hola";
let fecha: Date = new Date();
let ninguno: null = null;
let indefinido: undefined = undefined;
let nodo: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>("div");
let elemento: HTMLElement | null = document.getElementById("miElemento");

// Funciones con tipos
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(5, 10); // Correcto

// interfaces
interface Usuario {
  nombre: string;
  edad: number;
  esActivo: boolean;
}

const usuario: Usuario = {
  nombre: "Luis",
  edad: 28,
  esActivo: true,
};