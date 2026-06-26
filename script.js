// ======================================
// Nabra Cosmetiques
// script.js
// Version 2.0
// ======================================

// رقم الواتساب
const WHATSAPP_NUMBER = "212635633060";

// عناصر الصفحة
const cartBtn = document.getElementById("cartButton");
const cart = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutButton");
const loader = document.getElementById("loader");

//=========================
// إخفاء شاشة التحميل
//=========================

window.addEventListener("load", () => {

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

//=========================
// فتح السلة
//=========================

if (cartBtn) {

    cartBtn.addEventListener("click", () => {

        cart.classList.add("active");

        overlay.classList.add("active");

    });

}

//=========================
// إغلاق السلة
//=========================

if (closeCart) {

    closeCart.addEventListener("click", closeSidebar);

}

if (overlay) {

    overlay.addEventListener("click", closeSidebar);

}

function closeSidebar() {

    cart.classList.remove("active");

    overlay.classList.remove("active");

}

//=========================
// متابعة الطلب
//=========================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        closeSidebar();

        document.getElementById("checkout")
            .scrollIntoView({

                behavior: "smooth"

            });

    });

}

//=========================
// إرسال الطلب
//=========================

const form = document.getElementById("checkoutForm");

if (form) {

    form.addEventListener("submit", sendOrder);

}

function sendOrder(e) {

    e.preventDefault();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const city =
        document.getElementById("customerCity").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !city || !address) {

        alert("يرجى ملء جميع البيانات");

        return;

    }

    if (cart.length === 0) {

        alert("السلة فارغة");

        return;

    }

    let message =

`🛍️ طلب جديد

👤 الاسم : ${name}

📞 الهاتف : ${phone}

🏙️ المدينة : ${city}

📍 العنوان : ${address}

====================

🛒 المنتجات

`;

    let total = 0;

    cart.forEach((item, index) => {

        message +=

`${index + 1}- ${item.name}

الكمية : ${item.quantity}

السعر : ${item.price} DH

--------------------

`;

        total += item.price * item.quantity;

    });

    message +=

`💰 المجموع :

${total} DH

شكراً لاختياركم ❤️
Nabra Cosmetiques`;

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}
//======================================
// زر العودة للأعلى
//======================================

const scrollBtn = document.getElementById("scrollTop");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

//======================================
// ظهور العناصر عند التمرير
//======================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section,.product-card,.review,.feature").forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});

//======================================
// القائمة المتجاوبة
//======================================

const menuButton = document.getElementById("menuButton");

const nav = document.querySelector("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}

//======================================
// إغلاق القائمة عند الضغط على رابط
//======================================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {

            nav.classList.remove("active");

        }

    });

});

//======================================
// تمرير سلس
//======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

//======================================
// تغيير لون الهيدر
//======================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

//======================================
// عداد المنتجات داخل السلة
//======================================

function updateCartCounter() {

    const counter = document.getElementById("cartCounter");

    if (!counter) return;

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    counter.textContent = total;

}

const oldRenderCart = renderCart;

renderCart = function () {

    oldRenderCart();

    updateCartCounter();

};

//======================================
// رسالة نجاح
//======================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}

//======================================
// تحسين إضافة المنتج
//======================================

const originalAdd = addToCart;

addToCart = function (id) {

    originalAdd(id);

    const product = products.find(p => p.id === id);

    showToast("✅ تمت إضافة " + product.name + " إلى السلة");

};

//======================================
// Lazy Loading
//======================================

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

//======================================
// حفظ السلة تلقائياً
//======================================

window.addEventListener("beforeunload", () => {

    localStorage.setItem("cart", JSON.stringify(cart));

});

//======================================
// استرجاع السلة
//======================================

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

    renderCart();

    updateCartCounter();

});
