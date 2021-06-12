// Scroll

let backToTopBtn = document.querySelector('.back-to-top');
window.onscroll = () => {
    if(window.pageYOffset > 200){
        backToTopBtn.style.display = 'flex';
    }else{
        backToTopBtn.style.display = 'none';
    }
}

// active menu

let menuItems = document.getElementsByClassName('menu-item');
for (let item of menuItems) {
    item.onclick = () => {
        let currentMenu = document.querySelector('.menu-item.active');
        currentMenu.classList.remove('active');
        item.classList.add('active');
    }
}

// food category

let foodMenuList = document.querySelector('.food-item-wrap');

let foodCategory = document.querySelector('.food-category');

let categories = foodCategory.querySelectorAll('.food-category  button');

for(item of categories) {
    item.onclick = (e) => {
        let currentCard = foodCategory.querySelector('button.active');
        currentCard.classList.remove('active');
        e.target.classList.add('active'); 
        foodMenuList.classList = 'food-item-wrap ' + e.target.getAttribute('data-food-type');
    }
}


/* on Scroll animation */

let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start');
        } else {
            item.classList.remove('start');
        }
    })
    scroll(loop)
    
}
loop();

// mobile nav 

let bottomNavItems = document.querySelectorAll('.mb-nav-item');

let bottomNavMove = document.querySelector('.mb-move-item');




bottomNavItems.forEach((item, index) => {
    item.onclick = (e) => {
        let currentItem = document.querySelector('.mb-nav-item.active')
        currentItem.classList.remove('active')
        item.classList.add('active')
        bottomNavMove.style.left = index * 25 + '%'
    }
})


// show - hide cart-wrap

let cartBtn = document.querySelector('.cart-btn');
let cartWrap = document.querySelector('.cart-wrap');
let cartClose = document.querySelector('.cart-close i');
let cartOverlay = document.querySelector('.cart-overlay');
let hidden = document.getElementsByTagName('html')[0];
cartBtn.onclick = () =>{
    cartWrap.classList.add('show');
    cartOverlay.style.display = 'block'
    hidden.style.overflow = 'hidden';
}

cartClose.onclick = () => {
    cartWrap.classList.remove('show');
    cartOverlay.style.display = 'none'
    hidden.style.overflow = 'auto';

}

cartOverlay.onclick = () => {
    cartWrap.classList.remove('show');
    cartOverlay.style.display = 'none'
    hidden.style.overflow = 'auto';
}

console.log(document.getElementsByTagName('html'));