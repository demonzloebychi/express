const tagItems = document.querySelectorAll(".tag__item a");
const teamItem = document.querySelectorAll('.team__item')

function filterTeamItems(selectedTag) {
  teamItem.forEach(item => {
    const itemTag = item.querySelector('a').dataset.tag;
    if (selectedTag === 'all' || itemTag === selectedTag) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

tagItems.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const selectedTag = this.dataset.tag;
    const newUrl = selectedTag === 'all' ? '/team' : `/team?tag=${selectedTag}`;
    history.pushState(null, '', newUrl);

    filterTeamItems(selectedTag);
    tagItemUI();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTag = urlParams.get("tag") || "all";

  filterTeamItems(currentTag);
  tagItemUI();
});





// tagItems.forEach((tagItem) => {
//     tagItem.addEventListener('click',function (event) {
//         // e.preventDefault();
//         // const tagItemData = tagItem.getAttribute('data-tag')
//         // console.log(tagItemData)
//          if (this.href.includes('tag=seo')) {
//       event.preventDefault();
//       // Ваша логика вместо перехода
//       console.log('Переход заблокирован для ссылки с tag=seo');
//     }

//     })
// })


// window.addEventListener('popstate', () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const currentTag = urlParams.get("tag") || "all";

//   filterTeamItems(currentTag);
//   tagItemUI();
// });