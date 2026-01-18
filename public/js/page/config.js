import UIManager from "../utils/uiManager.js";

class configPage {
  constructor() {
    this.init();
  }

  hasConfiguration() {
    const config = localStorage.getItem("rimuHubConfig") || null;
    if (!config) {
      UIManager.showStatus(
        "config-status",
        "Nenhuma configuração encontrada. Por favor, configure o RimuHub.",
        "error"
      );
      return false;
    }

    UIManager.showStatus(
      "config-status",
      "Configuração encontrada com sucesso!",
      "info"
    );
    return false;
  }

  splitUrl(url) {
    return url.split("/")[5].trim() || "";
  }

  addLocalStorage() {
    if (document.getElementById("sheets-url").value === "") {
      UIManager.showStatus(
        "config-status",
        "Por favor, insira a URL do Google Sheets.",
        "error"
      );
      return;
    }

    const ApiKeyInput = document.getElementById("api-key").value || "";
    const linkGoogleSheetsInput = document.getElementById("sheets-url").value;
    
    const configData = {
      apiKey: this.splitUrl(ApiKeyInput),
      linkGoogleSheets: this.splitUrl(linkGoogleSheetsInput),
    };

    localStorage.setItem("rimuHubConfig", JSON.stringify(configData));
    UIManager.showStatus(
      "config-status",
      "Configuração salva com sucesso!",
      "success"
    );
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.hasConfiguration();
      UIManager.navbarToggle();
      document
        .getElementById("config-form")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          this.addLocalStorage();
        });
    });
  }
}

new configPage();
