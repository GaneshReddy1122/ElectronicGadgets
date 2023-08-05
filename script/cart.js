let label = document.getElementById('label'); 
let shoppingcart = document.getElementById('shopping-cartt');
let basket = JSON.parse(localStorage.getItem("data")) || [];
const toTop = document.querySelector('.logo-content3');
window.addEventListener('scroll', ()=> {
    if(window.pageYOffset > 0) {
        toTop.classList.add('active');
       
    
        } else {
            toTop.classList.remove('active');
    }
    } );

let generatecartitems = () => {
    if(basket.length !==0 ) {
       return (shoppingcart.innerHTML = basket.map((x) => {
        let {id, item} = x
        let search = ShowDataItems.find((y) => y.id === id) || []
        return`
        <table class="cart-final">
        <tr class="first-row">
            <th></th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>QTY</th>
            <th>SubTotal</th>
            <th><i onclick="removeItem(${id})" class="bi bi-x-lg"></i></th>
        </tr>
        <tr>
            <td><img class="cart-final-img"  src=${search.img} alt=""></td>
            <td>${search.productname}</td>
            <td>$ ${search.price}</td>
            <td><button onclick="decrement(${id})" class="minus-button"><i  class="bi bi-dash-lg"></i></button>   <span class="temp" id=${id}>${item} </span>    
            <button onclick="increment(${id})" class="plus-button"><i class="bi bi-plus-lg"></i></button></td>
            <td>$ ${item  * search.price}</td>
            <td></td>
        </tr>
    </table>


        `
       }).join(""))
    }
    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `
        <div class="empty">
        <h2 >Cart is empty </h2>
        <a href="index.html" > <button class="HomeBtn">Back To Home</button></a></div>
        `;
        

    }
};
generatecartitems();
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

    generatecartitems();
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
    generatecartitems();
    localStorage.setItem("data", JSON.stringify(basket));
    
   
};
let update = (id) => {
    let search = basket.find((x) =>x.id === id);
    document.getElementById(id).innerHTML = search.item;

    caluculation();
    TotalAmount();
};
let caluculation = () => {
    let cartIcon =document.getElementById('CartAmount');
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x, y) => x + y, 0);

};
caluculation();

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generatecartitems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if(basket.length !==0) {
        let amount = basket.map((x) => {
            let {id , item} = x;
            let search = ShowDataItems.find((y) => y.id === id) || [];
            return item * search.price;

        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `
        <div class="totalbill">
        
        <p>Total Amount: <span> $ ${amount} </span> </p>
         </div>
        `
    }else return
};

TotalAmount();



