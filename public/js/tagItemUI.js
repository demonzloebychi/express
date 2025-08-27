function tagItemUI() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentTag = urlParams.get("tag") || "all";
    const tagItems = document.querySelectorAll(".tag__item a");
    tagItems.forEach((tag) => {
        tag.classList.remove('active');
        if (tag.getAttribute('data-tag') === currentTag) {
            tag.classList.add('active')
        }
    })
}
tagItemUI()
