function paginationItemUI() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = urlParams.get("page") || "1";
  const paginationItems = document.querySelectorAll(
    ".a-blog-pagination a.pagination-item"
  );

  paginationItems.forEach((item) => {
    item.classList.remove("current");
    if (item.getAttribute("data-page") === currentPage) {
      item.classList.add("current");
    }
  });
}
paginationItemUI()


