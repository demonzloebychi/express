document.addEventListener('DOMContentLoaded', function() {
    window.priceTab = function () {
        let tabNav = document.querySelectorAll(".nav-tabs__btn"),
            tabContent = document.querySelectorAll(".body-tabs"),
            tabName;

        tabNav.forEach(item => {
            item.addEventListener("click", selectTabNav);
        });

        function selectTabNav() {
            tabNav.forEach(item => {
                item.classList.remove("is-active");
            });
            this.classList.add("is-active");
            tabName = this.getAttribute("data-tab-name");
            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach(item => {
                if (item.getAttribute("data-tab-name") === tabName) {
                    item.classList.add("is-active");
                } else {
                    item.classList.remove("is-active");
                }
            });

            tabContent.forEach(item => {
                item.style.animation = "fadein 1s ease";
            });
        }
    };

    // Вызов функции после загрузки DOM
    window.priceTab();
});


