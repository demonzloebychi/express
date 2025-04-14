document.addEventListener('DOMContentLoaded', function() {
    window.priceTab = function () {
        let priceTabNav = document.querySelectorAll(".nav-price-all__item"),
            priceTabContent = document.querySelectorAll(".price-all__body"),
            priceTabName;

        priceTabNav.forEach(item => {
            item.addEventListener("click", selectPriceTabNav);
        });

        function selectPriceTabNav() {
            priceTabNav.forEach(item => {
                item.classList.remove("is-active");
            });
            this.classList.add("is-active");
            priceTabName = this.getAttribute("data-tab-name");
            selectPriceTabContent(priceTabName);
        }

        function selectPriceTabContent(priceTabName) {
            priceTabContent.forEach(item => {
                if (item.getAttribute("data-tab-name") === priceTabName) {
                    item.classList.add("is-active");
                } else {
                    item.classList.remove("is-active");
                }
            });

            priceTabContent.forEach(item => {
                item.style.animation = "fadein 1s ease";
            });
        }
    };

    // Вызов функции после загрузки DOM
    window.priceTab();
});


