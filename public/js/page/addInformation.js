import UIManager from "../utils/uiManager.js";

class addInformation {
  constructor() {
    this.GetLocalConfig = JSON.parse(localStorage.getItem("rimuHubConfig")) || null;
  }

  HasGoogleDriveLink(link) {
    if (link.includes("drive.google.com")) {
      const getId = link.split("/")[5];
      const url = `https://lh3.googleusercontent.com/d/${getId}`;
      return url;
    } else {
      return link;
    }
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

    if (!this.GetLocalConfig.apiKey) {
      UIManager.showStatus(
        "config-status",
        "API Key não encontrada. Por favor, configure o RimuHub.",
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

  previewImage(InputID) {
    const imagePreviewContainer = document.querySelector(".image-preview-container");
    const imagePreview = document.getElementById("image-preview");

    InputID.addEventListener("input", (e) => {
      imagePreviewContainer.classList.remove("hidde");
      const imageUrl = e.target.value;
      imagePreview.src = imageUrl;
    })
  }

  async hasCategorys() {
    const getCategorys = await fetch(`/api/categorys/${this.GetLocalConfig.linkGoogleSheets}`)
      .then(res => res.json())
      .catch(err => {
        UIManager.showStatus(
          "category-status",
          "Erro ao buscar categorias. Verifique sua conexão.",
          "error"
        );
        return null;
      });
    
    if (getCategorys.hasCategorys == true) {
      this.createCategorySelect(await getCategorys.data);
      this.setupCategoryCreationListener();
    }

  }

  createCategorySelect(categorys) {
    const categorySelect = document.getElementById("category-select");
    categorys.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    let optionCreateCategory = document.createElement("option");
    optionCreateCategory.value = "createNewCategory";
    optionCreateCategory.textContent = "Criar nova categoria";
    categorySelect.appendChild(optionCreateCategory);
  }

  setupCategoryCreationListener() {
    const categorySelect = document.getElementById("category-select");
    const categoryCreationSection =
      document.getElementById("category-creation");
    const categoryCreationContainer = document.querySelector(
      ".category-creation-container"
    );

    categorySelect.addEventListener("change", () => {
      if (categorySelect.value === "createNewCategory") {
        categoryCreationSection.classList.remove("hidde");
        categoryCreationContainer.classList.add("active");
      } else {
        categoryCreationSection.classList.add("hidde");
        categoryCreationContainer.classList.remove("active");
      }
    });
  }

  handleSubmit() {
    const form = document.getElementById("add-information-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title-input").value || "Sem título";
      const description = document.getElementById("description-input").value || "Sem descrição";
      const category = document.getElementById("category-select").value == "createNewCategory"
        ? document.getElementById("category-creation").value
        : document.getElementById("category-select").value;;
      const imageLinkInput = document.getElementById("image-link-input").value;
      const link = document.getElementById("link-input").value || "null";
      const apiKey = this.GetLocalConfig.apiKey;
      const imageLink = this.HasGoogleDriveLink(imageLinkInput);
      const payload = {
        title: title,
        description: description,
        category: category,
        imageLink: imageLink,
        apiKey: apiKey,
        links: link
      };

      const response = await fetch('/api/addInformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        UIManager.showStatus(
          "config-status",
          "Informação adicionada com sucesso!",
          "success"
        );
        // form.reset();
      } else {
        UIManager.showStatus(
          "submit-status",
          `Erro ao adicionar informação: ${result.message}`,
          "error"
        );
      }

    });
  }

  init() {
    const hasConfig = this.hasConfiguration();

    if (hasConfig) {
      this.hasCategorys();
      this.handleSubmit();
      this.previewImage(document.getElementById("image-link-input"));
    }
  }
}

const AddInformation = new addInformation();
AddInformation.init();