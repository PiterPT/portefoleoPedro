async function carregarDadosParaArray(caminho = "./dados/skils.json") {
  try {
    const response = await fetch(caminho);
    if (!response.ok) throw new Error("Erro ao carregar o ficheiro JSON.");

    const dados = await response.json();

    // Converter os dados do objeto para um array
    const arrayLinguagens = Object.entries(dados).map(([chave, valor]) => {
      return {
        id: chave,
        ...valor,
      };
    });

    return arrayLinguagens;
  } catch (erro) {
    console.error("Erro:", erro);
    return [];
  }
}

carregarDadosParaArray().then((array) => {
  console.log("Linguagens carregadas:", array);

  array.forEach((item) => {
    console.log(item.nome); 
  });

  let skilsContainer = document.querySelector(".skils-container");
  let content = "";
  let imagens = ["html", "js", "python", "c", "MySql", "PHP", "react", "sql"];

  for (let i = 0; i < imagens.length; i++) {
    content += `<div class="skils-item-${i} skils-item" style="background-image: url('./img/${imagens[i]}.jpg');"></div>`;
  }

  skilsContainer.innerHTML = content;

  const items = document.querySelectorAll(".skils-item");

  items.forEach((item) => {
    item.addEventListener("mouseover", function () {
      this.classList.add("interact");
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("interact");
    });

    item.addEventListener("click", function () {
      items.forEach((i) => i.classList.remove("active"));
      items.forEach((i) => (i.style.display = "flex"));

      let containerActive = document.querySelector(".skils-container-active");
      containerActive.innerHTML = "";

      this.classList.add("active");
      const copia = this.cloneNode(true);
      containerActive.appendChild(copia);

      item.style.display = "none";
    });
  });
});
