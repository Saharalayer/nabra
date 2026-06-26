// ======================================
// Nabra Cosmetiques
// script.js
// Version 2.0
// ======================================

// رقم الواتساب
const WHATSAPP_NUMBER = "212635633060";

// عناصر الصفحة
const cartBtn = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cart");
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

        cartSidebar.classList.add("active");

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

    cartSidebar.classList.remove("active");

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

function sendOrder(e) {

    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !city || !address) {
        alert("يرجى إدخال جميع البيانات");
        return;
    }

    if (cart.length === 0) {
        alert("سلة المشتريات فارغة");
        return;
    }

    // إنشاء رقم الطلب
    const now = new Date();

    const orderNumber =
        "NC-" +
        now.getFullYear().toString().slice(-2) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0") +
        String(now.getSeconds()).padStart(2, "0");

    // تاريخ الطلب
    const orderDate = now.toLocaleDateString("fr-MA");
    const orderTime = now.toLocaleTimeString("fr-MA");

    let total = 0;
    let totalItems = 0;

    let message =
`🛍️ *طلب جديد - Nabra Cosmetiques*

━━━━━━━━━━━━━━━━━━━━━━

🧾 *رقم الطلب:* ${orderNumber}

📅 *التاريخ:* ${orderDate}

🕒 *الوقت:* ${orderTime}

━━━━━━━━━━━━━━━━━━━━━━

👤 *الاسم:* ${name}

📞 *الهاتف:* ${phone}

🏙️ *المدينة:* ${city}

📍 *العنوان:* ${address}

━━━━━━━━━━━━━━━━━━━━━━

🛒 *تفاصيل الطلب*

`;

    cart.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        total += subtotal;
        totalItems += item.quantity;

        message +=
`${index + 1}️⃣ ${item.name}

📦 الكمية : ${item.quantity}

💵 سعر الوحدة : ${item.price} DH

💰 المجموع : ${subtotal} DH

────────────────────

`;

    });

    message +=
`📦 *عدد القطع:* ${totalItems}

💳 *إجمالي الطلب:* ${total} DH

━━━━━━━━━━━━━━━━━━━━━━

🚚 طريقة التوصيل : التوصيل إلى المنزل

💵 طريقة الدفع : الدفع عند الاستلام

━━━━━━━━━━━━━━━━━━━━━━

شكراً لاختياركم ❤️

*Nabra Cosmetiques*`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    // تفريغ السلة
    cart = [];
    localStorage.removeItem("cart");

    renderCart();

    document.getElementById("checkoutForm").reset();

    if (typeof showToast === "function") {
        showToast("✅ تم إرسال الطلب بنجاح");
    }

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
