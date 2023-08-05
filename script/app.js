
const toTop = document.querySelector('.logo-content3');
  
window.addEventListener('scroll', ()=> {
if(window.pageYOffset > 180) {
    toTop.classList.add('active');
   

    } else {
        toTop.classList.remove('active');
}
} );

let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = ShowDataItems.map((x) => {
        let {id, discount, img, productDes, productname, desc, price} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="cart-conatiner">
       <div class="discount-container"><button class="discount">${discount}</button></div> 
        <img src=${img} alt=>
        <p class="title">${productDes}</p>
        <p class ="product-name">${productname}</p>
        <p class="type">${desc}</p>
        <p class="price">$ ${price}</p>
        <div class="buttons-js">
            <button onclick="decrement(${id})" class="minus-button"><i  class="bi bi-dash-lg"></i></button>   <span class="temp" id=${id}>${search.item === undefined? 0: search.item}</span>    
            <button onclick="increment(${id})" class="plus-button"><i class="bi bi-plus-lg"></i></button>
        </div>
    
    </div>
    `

    }).join(""));
};
generateShop();

let increment = (id) => {
    let selectedItem = id;
   
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item +=1;
    } 

    
     update(selectedItem.id); 

     localStorage.setItem("data", JSON.stringify(basket))
     
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search===undefined) return
    else if(search.item === 0) return;
    else {
        search.item -=1;
    }
    
    update(selectedItem.id); 
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    
   
};
let update = (id) => {
    let search = basket.find((x) =>x.id === id);
    document.getElementById(id).innerHTML = search.item;

    caluculation();
};
let caluculation = () => {
    let cartIcon =document.getElementById('CartAmount');
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x, y) => x + y, 0);

}
caluculation();

 