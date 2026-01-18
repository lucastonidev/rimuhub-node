class UIManager {
  constructor() {}

  navbarToggle() {
    const toggle = document.getElementById("btn-menu-mobile");
    const nav = document.getElementById("navbar");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  showStatus(elementId, message, type = "info") {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.innerHTML = `
            <div class="status-message status-${type}">
                ${message}
            </div>
        `;

    // Auto-remover após 5 segundos para mensagens de sucesso/erro
    if (type === "success" || type === "error") {
      setTimeout(() => {
        element.innerHTML = "";
      }, 5000);
    }
  }

  renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!data || data.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: var(--text-secondary);">Nenhuma informação encontrada.</p>';
      return;
    }

    container.innerHTML = data
      .map(
        (item) => `
          <div class="card-info">
            <div class="card-header">
              <div class="card-type">
              <span class="icon">
              <i class="fas fa-external-link-alt"></i>
              </span> 
              Link
              </div>
              <span class="card-category">
              <i class="fa-solid fa-folder"></i>
              ${item.category}
              </span>
            </div>
            <div class="card-image" style="background-image: url(${
          item.img_link
            });"></div>

            <div class="card-content">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-description">${item.description}</p>
              <div class="card-links">
                <a class="card-link" href="${item.link}" target="_blank" rel="noopener noreferrer">
                  <span class="icon">
                    <i class="fas fa-external-link-alt"></i>
                  </span> 
                  Acessar
                </a>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }

  renderCategoryAndFilters(data, containerId) {
    const container = document.getElementById(containerId);
    const ButtonAllCategories = "Todos";
    data.unshift(ButtonAllCategories);

    if (!container) return;

    data.forEach((category) => {
      const button = document.createElement("button");
      button.className = "category-btn";
      button.innerHTML = `
      <i class="fa-solid fa-folder"></i>
      ${category.toLowerCase()}
      `;
      button.addEventListener("click", () => {
        const allCards = document.querySelectorAll(".card-info");
        allCards.forEach((card) => {
          if (
            category === "Todos" ||
            card.querySelector(".card-category").innerText.trim() === category

          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });

        // Atualizar estado ativo do botão
        const allButtons = container.querySelectorAll(".category-btn");
        allButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
      container.appendChild(button);
    });
  }

  renderSearchResults(data, containerId, query) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description_short.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: var(--text-secondary);">Nenhum resultado encontrado para sua busca.</p>';
      return;
    }

    this.renderCards(filteredData, containerId);
  }
}

export default new UIManager();
