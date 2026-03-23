function renderBreadcrumb(items) {
  const container = document.getElementById("breadcrumb");

  if (!container) return;

  container.innerHTML = items.map((item, index) => {
    const isLast = index === items.length - 1;

    if (isLast) {
      return `<span class="active">${item.label}</span>`;
    }

    return `
      <a href="${item.link}">${item.label}</a>
      <span>›</span>
    `;
  }).join("");
}
