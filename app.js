const board = document.getElementById("board");
const themeToggle = document.getElementById("toggle-theme");
const modal = document.getElementById("modal");
const modalTitleInput = document.getElementById("modal-title-input");
const modalDescriptionInput = document.getElementById("modal-description-input");
const saveCardBtn = document.getElementById("save-card");
const closeModalBtn = document.getElementById("close-modal");

let currentEditCard = null;

function loadState() {
  const data = JSON.parse(localStorage.getItem("kanban-data")) || {};
  Object.entries(data).forEach(([columnId, cards]) => {
    const container = document.querySelector(`[data-column="${columnId}"]`);
    cards.forEach(card => addCard(container, card.title, card.description));
  });
}

function saveState() {
  const columns = document.querySelectorAll(".card-container");
  const data = {};
  columns.forEach(col => {
    const cards = [...col.children].map(card => ({
      title: card.dataset.title,
      description: card.dataset.description || ""
    }));
    data[col.dataset.column] = cards;
  });
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

function addCard(container, title = "New Card", description = "") {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("role", "listitem");
  card.textContent = title;
  card.tabIndex = 0;
  card.dataset.title = title;
  card.dataset.description = description;
  card.addEventListener("click", () => openModal(card));
  container.appendChild(card);
  saveState();
}

function openModal(card) {
  modal.classList.remove("hidden");
  modalTitleInput.value = card.dataset.title;
  modalDescriptionInput.value = card.dataset.description;
  currentEditCard = card;
}

function closeModal() {
  modal.classList.add("hidden");
  currentEditCard = null;
}

saveCardBtn.addEventListener("click", () => {
  if (!currentEditCard) return;
  currentEditCard.dataset.title = modalTitleInput.value;
  currentEditCard.dataset.description = modalDescriptionInput.value;
  currentEditCard.textContent = modalTitleInput.value;
  saveState();
  closeModal();
});

closeModalBtn.addEventListener("click", closeModal);

document.querySelectorAll(".add-card").forEach(button => {
  button.addEventListener("click", () => {
    const container = button.previousElementSibling;
    addCard(container);
  });
});

themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

window.addEventListener("DOMContentLoaded", loadState);