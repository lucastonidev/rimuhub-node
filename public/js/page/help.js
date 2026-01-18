function toggleCategory(element) {
  const categoryItems = element.nextElementSibling;
  const icon = element.querySelector(".category-icon");

  categoryItems.classList.toggle("active");
  element.classList.toggle("active");

  closeOtherCategories(element);
}

function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const toggleBtn = element.querySelector(".faq-toggle");

  answer.classList.toggle("active");

  if (answer.classList.contains("active")) {
    toggleBtn.textContent = "-";
  } else {
    toggleBtn.textContent = "+";
  }
}

function closeOtherCategories(currentCategory) {
  const allCategories = document.querySelectorAll(".category-header");
  allCategories.forEach((category) => {
    if (category !== currentCategory && category.classList.contains("active")) {
      category.classList.remove("active");
      category.nextElementSibling.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("FAQ carregado!");
});
