const urlParams = new URLSearchParams(window.location.search);
const currentPage = urlParams.get("page") || "1";
const currentTag = urlParams.get("tag") || "all";

console.log(currentTag)


const paginationItems = document.querySelectorAll(
  ".a-blog-pagination a.pagination-item"
);

const tagItems = document.querySelectorAll(".blog-tag__item a");
console.log(tagItems)

paginationItems.forEach((item) => {
  item.classList.remove("current");
  if (item.getAttribute("data-page") === currentPage) {
    item.classList.add("current");
  }
});


tagItems.forEach((tag) => {
    tag.classList.remove('active');
    if (tag.getAttribute('data-tag') === currentTag) {
        tag.classList.add('active')
    }
})