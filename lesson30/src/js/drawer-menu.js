const body = document.querySelector("body");
const hamburgerButton = document.getElementById("js-hamburger-button");
const drawerMenu = document.querySelector('[data-name="drawer-menu"]');
const focusControlTargets = [document.getElementById("js-form"), document.getElementById("js-title")];

const isOpen = (button) => button.getAttribute("aria-expanded") === "true";
const toggleInertAttribute = (targets, boolean) => {
    targets.forEach(target => {
        target.inert = boolean;
    })
}

hamburgerButton.addEventListener("click", () => {
    body.classList.toggle("is-drawer-active");
    drawerMenu.classList.toggle("is-open");

    if (isOpen(hamburgerButton)){
        hamburgerButton.setAttribute("aria-expanded", false);
        drawerMenu.setAttribute("aria-hidden", true);
        toggleInertAttribute(focusControlTargets,false);
    } else {
        hamburgerButton.setAttribute("aria-expanded", true);
        drawerMenu.setAttribute("aria-hidden", false);
        toggleInertAttribute(focusControlTargets,true);
    }
})
