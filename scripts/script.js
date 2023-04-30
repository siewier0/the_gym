// Obsługa zwijania/rozwijania menu hamburgera
const MENU_TOGGLER = document.getElementById("menu-toggler")
const MENU_MOBILE = document.getElementById("menu-mobile")
const HAMBURGER = document.querySelector("#hamburger")



function toggle() {
    if (MENU_MOBILE.classList.contains("menu-mobile-active")) {
        MENU_MOBILE.classList.add("slideOut")
        setTimeout(function(){
            MENU_MOBILE.classList.remove("menu-mobile-active")
        }, 580);
    } else {
    MENU_MOBILE.classList.toggle("menu-mobile-active")
    }
    setTimeout(function(){
        MENU_MOBILE.classList.remove("slideOut")
    }, 600);
};

HAMBURGER.addEventListener("click", toggle);

// Znikanie menu po wybraniu - mobile
const NAV_ITEM = document.querySelectorAll("#menu-mobile ul li")

NAV_ITEM.forEach((item) => {
    item.addEventListener("click", () => {
        toggle();
        HAMBURGER.classList.toggle("opened");
})});



// Obsługa galerii
const THUMBNAILS = document.querySelectorAll(".gallery-item");
const GALLERY_PREVIEW = document.querySelector(".gallery-preview-bg");
const X_CLOSE = document.querySelector("#x-close")
const IMG_OPENED = document.querySelector("#img-opened")
const ARROW_LEFT_D = document.querySelector("#arrow-left-d")
const ARROW_LEFT_M = document.querySelector("#arrow-left-m")
const ARROW_RIGHT = document.querySelector("#arrow-right")
const CURRENT_IMG_AREA = document.querySelector(".current-img")
const WHICH_IMAGE = document.querySelector("#which-image")

let currentImageIndex;

const nextImg = () => {
    if (currentImageIndex === THUMBNAILS.length -1) {
        currentImageIndex = 0    
    } else {
    currentImageIndex++;
    }
    IMG_OPENED.src = THUMBNAILS[currentImageIndex].src;
    imageNumber()
};

const previousImg = () => {
    if (currentImageIndex === 0) {
        currentImageIndex = THUMBNAILS.length - 1
    } else {
        currentImageIndex--;
    }
    IMG_OPENED.src = THUMBNAILS[currentImageIndex].src;
    imageNumber()
};

const hideGallery = () => {
    GALLERY_PREVIEW.classList.add("fade-out")
    setTimeout( () => {
        GALLERY_PREVIEW.classList.add("hidden");
    }, 199)

    setTimeout( () => {
        GALLERY_PREVIEW.classList.remove("fade-out");
    }, 200)

    THUMBNAILS.forEach( (element) => {
        element.setAttribute("tabindex", 1)
    })
};

const imageNumber = () => {
    WHICH_IMAGE.innerHTML = "Zdjęcie " + (currentImageIndex + 1) + " z 12";
};

THUMBNAILS.forEach((thumbnail, index) => {
    const showGallery = (e) => {
        GALLERY_PREVIEW.classList.remove("hidden");
        IMG_OPENED.src = e.target.src;
        currentImageIndex = index;
        THUMBNAILS.forEach( (element) => {
            element.setAttribute("tabindex", -1)
        });
        imageNumber()
    };

    thumbnail.addEventListener("click", showGallery);

    thumbnail.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.keyCode === 13) {
            showGallery(e)
        }
    });
});

X_CLOSE.addEventListener("click", hideGallery);

ARROW_RIGHT.addEventListener("click", nextImg);

ARROW_LEFT_D.addEventListener("click", previousImg);

ARROW_LEFT_M.addEventListener("click", previousImg);

document.addEventListener("keydown", (e) => {
    if (!GALLERY_PREVIEW.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keyCode === 39) {
            nextImg();
        }
    
        if (e.code === "ArrowLeft" || e.keyCode === 37) {
            previousImg();
        }
    
        if (e.code === "Escape" || e.keyCode === 27) {
            hideGallery()
        }
    }
});

GALLERY_PREVIEW.addEventListener("click", (e) => {
    if (e.target === GALLERY_PREVIEW || e.target === CURRENT_IMG_AREA) {
        hideGallery();
    }
});