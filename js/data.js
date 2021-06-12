const listProduct = [

    {
        id: 1,
        name: 'Pork-pie',
        url:  '../asset/Pork-pie.jpg',
        cost: 20,
        type: 'meat',
    },
   
    {
        id: 2,
        name: 'Braised tuna',
        url:  '../asset/tuna.jpg',
        cost: 20,
        type: 'fish',
    },
    
    {
        id: 3,
        name: 'Mixed beef',
        url:  '../asset/jonathan-farber-OCNqOLeCwOc-unsplash.jpg',
        cost: 30,
        type: 'meat',
    },

    {
        id: 4,
        name: 'Crab soup',
        url:  '../asset/Crabsoup.jpg',
        cost: 15,
        type: 'soup',
    },
    
    {
        id: 5,
        name: 'Steamed fish',
        url:  '../asset/steamedfish.PNG',
        cost: 40,
        type: 'fish',
    },

    {
        id: 6,
        name: 'Soup carry',
        url:  '../asset/supcarry.jpg',
        cost: 50,
        type: 'soup',
    },

    {
        id: 7,
        name: 'Fruit',
        url:  '../asset/fruit.jpg',
        cost: 5,
        type: 'dessert',
    },

    {
        id: 8,
        name: 'Port',
        url:  '../asset/Pork.jpg',
        cost: 10,
        type: 'meat',
    },

]

// render product

let foodItems = document.querySelector('.food-item-wrap')
foodItems.innerHTML = '';

 let showProduct = function(listProduct) {
        
listProduct.map((item, index) => {
      foodItems.innerHTML = foodItems.innerHTML + 
                                `<div class="food-item ${item.type} col-m-4">
                                    <div class="item-wrap bottom-up play-on-scroll">
                                       <div class="item-img">
                                           <div class="img-holder bg-img" style="background-image: url(${item.url});">
                                           </div>
                                       </div>
                                       <div class="item-info">
                                               <div> 
                                                   <h3>
                                                      ${item.name}
                                                   </h3>
                                                   <span>
                                                       $${item.cost}
                                                    </span>
                                               </div>
                                               <div class="cart-btn" onclick = "buyProduct(${item.id})">
                                               <i class="fas fa-cart-plus"></i>
                                           </div>
                                       </div>
                                    </div>
                               </div>
                               `
   })
   return foodItems.innerHTML  
   
 }
showProduct(listProduct)

 
buyProduct = function(id){
   

    let listCart = localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')) : [] ;

    let itemBuy = listProduct.find(item => item.id === id)
    isCart = false;
    listCart.map((item) => {
        if(item.id === id){
            item.count++;
            isCart = true;
        }
    })
    if(isCart == false){
        listCart.push(
            {
                id: itemBuy.id,
                name: itemBuy.name,
                url: itemBuy.url,
                cost: itemBuy.cost,
                count: 1
            }
        )
    } 
    localStorage.setItem('listCart', JSON.stringify(listCart))
    showNote(itemBuy)
    renderListCart();
    total();
    showCount()

}


let showNote = function (itemBuy){
    let toast = document.getElementById('toast');

    toast.innerHTML = toast.innerHTML +
                        `
                        <div class="toast-item toast-success">
                            <div class="toast-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="toast-body">
                                <div class="toast-msg">You have added <span> ${itemBuy.name} </span> to your cart</div>
                            </div>
                        </div>
                        `
    //  toast.lastElementChild.style.animation = `fadeToLeft 0.5s ease, fadeOut linear 2s 1s forwards`;

    setTimeout(function(){
        toast.removeChild(toast.firstElementChild)
    }, 3500)
}

 renderListCart = function(){
    let listCart = localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')) : [] ;
    let cartContent = document.querySelector('.cart-content-wrap');
    cartContent.innerHTML = '';
    
    listCart.map((item, index) => {
        cartContent.innerHTML = cartContent.innerHTML +
                                `
                                <div class="cart-content">
                                    <div class="cart-content-img bg-img" style="background-image: url(${item.url});">
                                    </div>

                                    <div class="cart-content-detail">
                                        <div class="cart-content-name">
                                        ${item.name}
                                        </div>
                                        <div class="cart-content-repair">
                                                <button onclick="decreaseCount(${item.id},${index})" class="button__decrease">-</button>
                                                <input  class="counter" disabled value="${item.count}">
                                                <button onclick="increaseCount(${item.id},${index})" class="button__increase">+</button>
                                        </div>
                                    </div>

                                    <div class="cart-content-unit">
                                        <div>
                                            Đơn giá
                                        </div>
                                        <div class="cart-content-cost">
                                            $${item.cost*item.count}
                                        </div>
                                    </div>

                                    <div class="cart-content-remove" onclick = "removeCart(${item.id},${index})">
                                        <i class="fas fa-times-circle"></i>
                                    </div>
                                </div>
                                `
    });
    
    return cartContent.innerHTML;
    
}
renderListCart()


let total = function(){
    let listCart = localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')) : [] ;
    console.log(listCart);
    let cartTotal = document.querySelector('.cart-total');
    let total = 0
    listCart.map((item) => {
       total += item.count*item.cost; 
    })

    return cartTotal.innerHTML =   `
                            <p>Your Total: $${total}</p>
                            <button>Thanh toán</button>
                            `
}
total();

let decreaseCount = function(id, index){
    let listCart = JSON.parse(localStorage.getItem('listCart'));
    let decreaseBtn = document.querySelectorAll(".button__decrease")[index];
    let increaseBtn = document.querySelectorAll(".button__increase")[index];
    let counter = document.querySelectorAll(".counter")[index];

    let itemDecrease = listCart.find(item => item.id === id)

   
    if(itemDecrease.count > 0){
        itemDecrease.count -= 1;
        counter.value = itemDecrease.count;

    }

    listCart[index].count = itemDecrease.count;
    localStorage.setItem('listCart', JSON.stringify(listCart))
    total()
    renderListCart()
}


let increaseCount = function(id, index){
    let listCart = JSON.parse(localStorage.getItem('listCart'));
    let decreaseBtn = document.querySelectorAll(".button__decrease")[index];
    let increaseBtn = document.querySelectorAll(".button__increase")[index];
    let counter = document.querySelectorAll(".counter")[index];

    let itemDecrease = listCart.find(item => item.id === id)
    
    itemDecrease.count += 1;
    counter.value = itemDecrease.count;

    listCart[index].count = itemDecrease.count;
    localStorage.setItem('listCart', JSON.stringify(listCart))
    total()
    renderListCart()
}

let removeCart = function(id, index){
    let listCart = JSON.parse(localStorage.getItem('listCart')) ;

    let cartContentWrap = document.querySelector('.cart-content-wrap');
    let cartContent = document.querySelectorAll(".cart-content")[index];

    cartContent.style.opacity= `0`
   
    setTimeout(function(){
        cartContentWrap.removeChild(cartContent);
        
        listCart.splice(index, 1);
    
        localStorage.setItem('listCart', JSON.stringify(listCart))
        total();
        showCount();
        renderListCart();
    }, 550)
}

let showCount = function() {
    let listCart = localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')) : [] ;

    let cartCount = document.querySelector('.cart-btn');

    cartCount.innerHTML = `
                            <i class="fas fa-cart-plus"></i>
                            <div class="cart-count">
                                ${listCart.length}
                            </div>
                            `
}
showCount()

