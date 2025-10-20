window.addEventListener('load', () => {
    const titles = document.querySelectorAll('.a-blog-item__title')
    let maxHeight = 0;

    titles.forEach(title => {
        const height = title.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    })


    titles.forEach(title => {
        title.style.height = maxHeight + 'px'
    })

})