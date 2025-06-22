export function loadState() {
  const data = JSON.parse(localStorage.getItem("kanban-data")) || {};
  return data;
}

export function saveState() {
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
