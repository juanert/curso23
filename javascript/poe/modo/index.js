document.getElementById("modo").addEventListener("click", (event) => {
  let lightStyle =
    "background-color: white; color: black; trasition: background-color 0.5s, color 0.5s;";
  let darkStyle =
    "background-color: black; color: white; trasition: background-color 0.5s, color 0.5s;";

  if (document.body.style.backgroundColor === "black") {
    document.body.style = lightStyle;
    document.getElementById("modo").innerText = "🌖";
  } else {
    document.body.style = darkStyle;
    document.getElementById("modo").innerText = "☀️";
  }
});
