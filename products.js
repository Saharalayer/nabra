// =======================================
// Nabra Cosmetiques
// products.js
// =======================================

const products = [

{
    id:1,
    name:"Eye Pearl Elixir",
    price:199,
    oldPrice:249,
    image:"images/product1.jpg",
    category:"العناية بالعين",
    description:"منتج للعناية بمنطقة العين وتقليل التجاعيد."
},

{
    id:2,
    name:"Vitamin C Serum",
    price:179,
    oldPrice:229,
    image:"images/product2.jpg",
    category:"العناية بالبشرة",
    description:"سيروم فيتامين C لإشراقة البشرة."
},

{
    id:3,
    name:"Collagen Cream",
    price:249,
    oldPrice:299,
    image:"images/product3.jpg",
    category:"الكولاجين",
    description:"كريم غني بالكولاجين لترطيب البشرة."
},

{
    id:4,
    name:"Hair Repair Oil",
    price:149,
    oldPrice:199,
    image:"images/product4.jpg",
    category:"العناية بالشعر",
    description:"زيت مغذي لإصلاح الشعر التالف."
},

{
    id:5,
    name:"Face Cleanser",
    price:129,
    oldPrice:169,
    image:"images/product5.jpg",
    category:"تنظيف البشرة",
    description:"غسول يومي لجميع أنواع البشرة."
},

{
    id:6,
    name:"Beauty Mask",
    price:99,
    oldPrice:139,
    image:"images/product6.jpg",
    category:"ماسكات",
    description:"ماسك يمنح البشرة نعومة وإشراقاً."
}

];


// =============================
// سلة المشتريات
// =============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =============================
// إنشاء بطاقات المنتجات
// =============================

function renderProducts(){

const container=document.getElementById("productsContainer");

if(!container) return;

container.innerHTML="";

products.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

<span class="discount">

-${Math.round(((product.oldPrice-product.price)/product.oldPrice)*100)}%

</span>

</div>

<div class="product-content">

<span class="category">

${product.category}

</span>

<h3>

${product.name}

</h3>

<p>

${product.description}

</p>

<div class="price">

<span class="new-price">

${product.price} DH

</span>

<span class="old-price">

${product.oldPrice} DH

</span>

</div>

<button onclick="addToCart(${product.id})">

<i class="fa-solid fa-cart-plus"></i>

إضافة إلى السلة

</button>

</div>

</div>

`;

});

}


// =============================
// إضافة منتج للسلة
// =============================

function addToCart(id){

const product=products.find(p=>p.id===id);

const exists=cart.find(item=>item.id===id);

if(exists){

exists.quantity++;

}else{

cart.push({

...product,

quantity:1

});

}

saveCart();

renderCart();

}


// =============================
// حفظ السلة
// =============================

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}


// =============================
// حذف منتج
// =============================

function removeFromCart(id){

cart=cart.filter(item=>item.id!==id);

saveCart();

renderCart();

}


// =============================
// تغيير الكمية
// =============================

function changeQuantity(id,value){

const item=cart.find(i=>i.id===id);

if(!item) return;

item.quantity+=value;

if(item.quantity<=0){

removeFromCart(id);

return;

}

saveCart();

renderCart();

}


// =============================
// عرض السلة
// =============================

function renderCart(){

const cartItems=document.getElementById("cartItems");

const total=document.getElementById("totalPrice");

const counter=document.getElementById("cartCounter");

if(!cartItems) return;

cartItems.innerHTML="";

let totalPrice=0;

let totalItems=0;

cart.forEach(item=>{

totalPrice+=item.price*item.quantity;

totalItems+=item.quantity;

cartItems.innerHTML+=`

<div class="cart-item">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>${item.price} DH</p>

</div>

<div class="qty">

<button onclick="changeQuantity(${item.id},-1)">-</button>

<span>${item.quantity}</span>

<button onclick="changeQuantity(${item.id},1)">+</button>

</div>

<button class="delete"

onclick="removeFromCart(${item.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

});

counter.textContent=totalItems;

total.textContent=totalPrice+" DH";

}


// =============================

document.addEventListener("DOMContentLoaded",()=>{

renderProducts();

renderCart();

});
