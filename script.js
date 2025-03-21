document.addEventListener("DOMContentLoaded", function () {
    // Botón para actualizar el texto dinámico
    document.getElementById("updateButton").addEventListener("click", function () {
        let userInput = document.getElementById("inputText").value;
        document.getElementById("outputText").innerText = userInput;
        console.log("Botón de actualización presionado, texto actualizado.");
    });

    // Navbar: resaltar el enlace activo
    let navLinks = document.querySelectorAll("#navbar ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            console.log(`Enlace activo: ${this.innerText}`);
        });
    });

    // Cambiar color del nombre al pasar el mouse
    let nameElement = document.getElementById("name");
    nameElement.addEventListener("mouseover", function () {
        this.style.color = "blue";
        console.log("Mouse sobre el nombre, color cambiado.");
    });
    nameElement.addEventListener("mouseout", function () {
        this.style.color = ""; // Vuelve al color original
        console.log("Mouse fuera del nombre, color restaurado.");
    });

    // Agregar fecha y hora actual en el footer
    let footer = document.getElementById("footer");
    let date = new Date();
    footer.innerHTML += `<p>Última actualización: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>`;
    console.log("Fecha y hora añadidas al footer.");

    // Botón para pedir noticias
    document.getElementById("newsButton").addEventListener("click", function () {
        console.log("Botón de noticias presionado, obteniendo noticias...");
        let apiKey = "0bf7142359284f03986b65d1e66415ac"; 
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let newsList = document.getElementById("newsList");
                newsList.innerHTML = ""; 

                if (data.articles && data.articles.length > 0) {
                    data.articles.slice(0, 5).forEach(article => {
                        let li = document.createElement("li");
                        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                        newsList.appendChild(li);
                    });
                    console.log("Noticias cargadas correctamente.");
                } else {
                    newsList.innerHTML = "<li>No se encontraron noticias.</li>";
                    console.log("No se encontraron noticias.");
                }
            })
            .catch(error => {
                console.error("Error obteniendo noticias:", error);
                let newsList = document.getElementById("newsList");
                newsList.innerHTML = "<li>No se pudieron obtener las noticias.</li>";
            });
    });
});
