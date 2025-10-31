fetch('/paginas/componentes/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    document.body.classList.add('loaded');
  });

fetch('/paginas/componentes/sidebar.html')
  .then(response => response.text())
  .then(data => document.getElementById('sidebar').innerHTML = data);