/* ============================================================
   PRODUCT CARD RENDERING
   Shared between index.html (featured picks) and products.html
   (full searchable catalog). Reads from PRODUCTS in
   products-data.js — nothing here needs editing to add a product.
   ============================================================ */

function ticketCardHTML(product, rank){
  const num = String(rank).padStart(2, "0");
  const badge = product.badge
    ? `<span class="ticket-stamp">${escapeHTML(product.badge)}</span>`
    : "";
  const oldPrice = product.oldPrice
    ? `<span class="was">${escapeHTML(product.oldPrice)}</span>`
    : "";

  return `
    <article class="ticket reveal">
      <div class="ticket-media">
        <span class="ticket-num">No. ${num}</span>
        ${badge}
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.closest('.ticket-media').innerHTML += '<span class=\\'no-photo\\'>Add a photo:<br>${escapeHTML(product.image)}</span>'; this.remove();"
        />
      </div>
      <div class="ticket-perf"></div>
      <div class="ticket-body">
        <span class="ticket-cat">${escapeHTML(product.category)}</span>
        <h3 class="ticket-name">${escapeHTML(product.name)}</h3>
        <div class="ticket-foot">
          <span class="ticket-price">${oldPrice}${escapeHTML(product.price)}</span>
          <a class="ticket-go" href="${escapeAttr(product.link)}" target="_blank" rel="nofollow sponsored noopener" data-product="${escapeAttr(product.name)}">
            Get it
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

function escapeHTML(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function escapeAttr(str){
  return escapeHTML(str).replaceAll('"', "&quot;");
}

/* ---------- Home page: featured picks ---------- */
function renderFeatured(){
  const el = document.getElementById("featured-grid");
  if(!el) return;
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  el.innerHTML = featured.map((p, i) => ticketCardHTML(p, i + 1)).join("");
  attachToastListeners(el);
  observeReveals(el);
}

/* ---------- Products page: search + filter ---------- */
let activeCategory = "All";

function getCategories(){
  const cats = new Set(PRODUCTS.map(p => p.category));
  return ["All", ...Array.from(cats).sort()];
}

function renderChips(){
  const row = document.getElementById("chip-row");
  if(!row) return;
  const cats = getCategories();
  row.innerHTML = cats.map(c =>
    `<button type="button" class="chip${c === activeCategory ? " active" : ""}" data-cat="${escapeAttr(c)}">${escapeHTML(c)}</button>`
  ).join("");

  row.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.cat;
      renderChips();
      renderProductGrid();
    });
  });
}

function renderProductGrid(){
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("result-count");
  const emptyEl = document.getElementById("empty-state");
  if(!grid) return;

  const searchInput = document.getElementById("product-search");
  const sortSelect = document.getElementById("sort-select");
  const query = (searchInput?.value || "").trim().toLowerCase();
  const sortBy = sortSelect?.value || "featured";

  let results = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesQuery = !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.blurb && p.blurb.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  if(sortBy === "price-low"){
    results = results.sort((a,b) => parsePrice(a.price) - parsePrice(b.price));
  } else if(sortBy === "price-high"){
    results = results.sort((a,b) => parsePrice(b.price) - parsePrice(a.price));
  } else if(sortBy === "name"){
    results = results.sort((a,b) => a.name.localeCompare(b.name));
  } else {
    results = results.sort((a,b) => (b.featured === true) - (a.featured === true));
  }

  if(countEl){
    countEl.innerHTML = `<strong>${results.length}</strong> pick${results.length === 1 ? "" : "s"} found`;
  }

  if(results.length === 0){
    grid.innerHTML = "";
    if(emptyEl) emptyEl.style.display = "block";
    return;
  }
  if(emptyEl) emptyEl.style.display = "none";

  grid.innerHTML = results.map((p, i) => ticketCardHTML(p, i + 1)).join("");
  attachToastListeners(grid);
  observeReveals(grid);
}

function parsePrice(str){
  const n = parseFloat(String(str).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

function initProductsPage(){
  renderChips();
  renderProductGrid();

  const searchInput = document.getElementById("product-search");
  if(searchInput){
    searchInput.addEventListener("input", renderProductGrid);
  }
  const sortSelect = document.getElementById("sort-select");
  if(sortSelect){
    sortSelect.addEventListener("change", renderProductGrid);
  }
}

/* ---------- shared: toast on "Get it" click ---------- */
function attachToastListeners(scope){
  scope.querySelectorAll(".ticket-go").forEach(link => {
    link.addEventListener("click", () => {
      showToast(`Opening “${link.dataset.product}” in a new tab →`);
    });
  });
}

function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- shared: scroll reveal (re-observe dynamic nodes) ---------- */
function observeReveals(scope){
  const targets = scope.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
}
