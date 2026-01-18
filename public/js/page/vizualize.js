import UIManager from "../utils/uiManager.js";

class pageVizualize {
  constructor() {
    this.database = undefined;
    this.GetLocalConfig = JSON.parse(localStorage.getItem("rimuHubConfig")) || null;
  }

  hasConfiguration() {
    if (!this.GetLocalConfig) {
      UIManager.showStatus(
        "config-status",
        "Nenhuma configuração encontrada. Por favor, configure o RimuHub.",
        "error"
      );
      return false;
    }

    if (!this.GetLocalConfig.linkGoogleSheets) {
      UIManager.showStatus(
        "config-status",
        "Url da database não encontrada. Por favor, configure o RimuHub.",
        "error"
      );
      return false;
    }

    UIManager.showStatus(
      "config-status",
      "Configuração encontrada com sucesso!",
      "info"
    );
    return true;
  }

  async hasData() {
    const data = await fetch(`/api/data/${this.GetLocalConfig.linkGoogleSheets}`)
      .then(res => res.json())
      .then(data => {
        UIManager.showStatus(
          "alert-status",
          "Dados carregados com sucesso!",
          "info"
        );
        return data;
      })
      .catch(err => {
        UIManager.showStatus(
          "data-status",
          "Erro ao carregar os dados. Verifique a configuração.",
          "error"
        );
      });

    this.database = data;
    return;
  }

  render() {
    UIManager.renderCards(this.database.sheetData, "cards-container");
    UIManager.renderCategoryAndFilters(this.database.categoryList, "categorys-filters");
    const Search = document.getElementById("search-info");
    Search.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      UIManager.renderSearchResults(this.database.sheetData, "cards-container", query);
    });
  }

  setupShareButton(buttonId, id) {
    document.getElementById(buttonId).addEventListener("click", () => {
      if (!id) {
        this.showStatus(
          "copy-status",
          "Nenhum link disponível para compartilhar.",
          "error"
        );
        return;
      }

      const url =
        window.location.origin == "http://127.0.0.1:5500"
          ? `${window.location.origin}/page/vizualize.html?id=${id}`
          : `https://lucastonidev.github.io/rimuhub/assets/page/vizualize.html?id=${id}`;

      navigator.clipboard
        .writeText(url)
        .then(() => {
          UIManager.showStatus(
            "copy-status",
            "Link copiado para a área de transferência!",
            "success"
          );
        })
        .catch(() => {
          UIManager.showStatus(
            "copy-status",
            "Falha ao copiar o link. Tente novamente.",
            "error"
          );
        });
    });
  } 

  async init() {
    if (!this.hasConfiguration()) return;
    await this.hasData();
    this.render();
    this.setupShareButton("share-acervo", this.GetLocalConfig.linkGoogleSheets);
  }
}

const vizualizeConstrutor = new pageVizualize();
vizualizeConstrutor.init(); 