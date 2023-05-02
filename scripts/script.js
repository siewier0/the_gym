// Zmiana scroolhinta w zależności od urządzenia
const SCROOL_HINT = document.querySelector(".mouse");

function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

if ( is_touch_enabled() ) {
    SCROOL_HINT.setAttribute("style", "transform: rotate(180deg)")
};


// Obsługa zwijania/rozwijania menu hamburgera + Blokada wieloklika
const MENU_TOGGLER = document.getElementById("menu-toggler");
const MENU_MOBILE = document.getElementById("menu-mobile");
const HAMBURGER = document.querySelector("#hamburger");

function toggle() {
    if (MENU_MOBILE.classList.contains("menu-mobile-active")) {
        MENU_MOBILE.classList.add("slideOut")

        setTimeout(function(){
            MENU_MOBILE.classList.remove("menu-mobile-active")
        }, 580);

        setTimeout(function(){
            MENU_MOBILE.classList.remove("slideOut")
        }, 580);

        HAMBURGER.setAttribute("disabled", "true");
        setTimeout(function(){
            HAMBURGER.removeAttribute("disabled");
        }, 580)
 
    } else {
    MENU_MOBILE.classList.toggle("menu-mobile-active");
    HAMBURGER.setAttribute("disabled", "true");
    setTimeout(function(){
        HAMBURGER.removeAttribute("disabled");
    }, 580)
    }
};

HAMBURGER.addEventListener("click", toggle);


// Znikanie menu po wybraniu - mobile
const NAV_ITEM = document.querySelectorAll("#menu-mobile ul li");

NAV_ITEM.forEach((item) => {
    item.addEventListener("click", () => {
        toggle();
        HAMBURGER.classList.toggle("opened");
        HAMBURGER.setAttribute("aria-expanded", "false");
})});


// Zamykanie menu po kliknięciu na tło - mobile
const MENU_AREA = document.querySelector(".nav-mobile");

document.onclick = function(e) {
    if (!MENU_AREA.contains(e.target) && MENU_MOBILE.classList.contains("menu-mobile-active")) {
        toggle();
        HAMBURGER.classList.remove("opened");
        HAMBURGER.setAttribute("aria-expanded", "false");
    };
};


// Dynamiczne dodawanie klasy active na nav item
const SECTIONS = document.querySelectorAll("section");
const NAV_LINKS_D = document.querySelectorAll("header nav ul a");
const NAV_LINKS_M = document.querySelectorAll("#menu-mobile ul a");

window.onscroll = () => {
    SECTIONS.forEach((section, index) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;
        let sectionNumber = index + 1;
        
        if (top >= offset && top < offset + height) {        
            NAV_LINKS_D.forEach(link => {
                link.classList.remove("nav-active");
            });
            document.querySelector('nav ul a[value = "' + sectionNumber + '"]').classList.add("nav-active");

            NAV_LINKS_M.forEach(link => {
                link.classList.remove("nav-active");
            });
            document.querySelector('#menu-mobile ul a[value = "' + sectionNumber + '"]').classList.add("nav-active");
        };
    })};


// Obsługa galerii
const THUMBNAILS = document.querySelectorAll(".gallery-item");
const GALLERY_PREVIEW = document.querySelector(".gallery-preview-bg");
const X_CLOSE = document.querySelector("#x-close");
const IMG_OPENED = document.querySelector("#img-opened");
const ARROW_LEFT_D = document.querySelector("#arrow-left-d");
const ARROW_LEFT_M = document.querySelector("#arrow-left-m");
const ARROW_RIGHT = document.querySelector("#arrow-right");
const CURRENT_IMG_AREA = document.querySelector(".current-img");
const WHICH_IMAGE = document.querySelector("#which-image");

let currentImageIndex;

const nextImg = () => {
    if (currentImageIndex === THUMBNAILS.length - 1) {
        currentImageIndex = 0    
    } else {
    currentImageIndex++;
    }
    IMG_OPENED.src = THUMBNAILS[currentImageIndex].src;
    imageNumber();
};

const previousImg = () => {
    if (currentImageIndex === 0) {
        currentImageIndex = THUMBNAILS.length - 1;
    } else {
        currentImageIndex--;
    }
    IMG_OPENED.src = THUMBNAILS[currentImageIndex].src;
    imageNumber();
};

const hideGallery = () => {
    GALLERY_PREVIEW.classList.add("fade-out")
    setTimeout( () => {
        GALLERY_PREVIEW.classList.add("hidden");
    }, 199);

    setTimeout( () => {
        GALLERY_PREVIEW.classList.remove("fade-out");
    }, 200);

    THUMBNAILS.forEach( (element) => {
        element.setAttribute("tabindex", 1)
    });
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