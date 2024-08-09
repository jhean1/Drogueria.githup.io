document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".navigation");

    menuButton.addEventListener("click", function() {
        navigation.classList.toggle("navigation-visible");
    });
});
