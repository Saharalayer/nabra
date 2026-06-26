// =====================================
// Nabra Cosmetiques
// script.js
// =====================================

// رقم الواتساب
const whatsappNumber = "212635633060";

// تعبئة اسم المنتج داخل النموذج
function orderProduct(productName) {

    document.getElementById("product").value = productName;

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

}

// إرسال الطلب إلى واتساب
document.getElementById("orderForm").addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const city = document.getElementById("city").value.trim();

    const address = document.getElementById("address").value.trim();

    const product = document.getElementById("product").value.trim();

    const quantity = document.getElementById("quantity").value;

    if(
        name==="" ||
        phone==="" ||
        city==="" ||
        address==="" ||
        product===""){
        alert("يرجى ملء جميع البيانات");
        return;
    }

    const message =

`🛍️ طلب جديد من الموقع

👤 الاسم:
${name}

📞 الهاتف:
${phone}

🏙️ المدينة:
${city}

📍 العنوان:
${address}

🧴 المنتج:
${product}

🔢 الكمية:
${quantity}

شكراً لاختياركم
Nabra Cosmetiques ❤️`;

    const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

});

// ================================
// ظهور العناصر عند التمرير
// ================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".card,.feature,.review-box").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// ================================
// زر العودة للأعلى
// ================================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="100px";
topBtn.style.left="25px";
topBtn.style.width="55px";
topBtn.style.height="55px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#c9a86a";
topBtn.style.color="#fff";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ================================
// تأثير الهيدر عند النزول
// ================================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.style.background="#1d1b3a";

        header.style.padding="5px 0";

    }else{

        header.style.background="rgba(29,27,58,.92)";

        header.style.padding="0";

    }

});

// ================================
// تأثير ظهور العناصر
// ================================

const style=document.createElement("style");

style.innerHTML=`

.hidden{

opacity:0;

transform:translateY(50px);

transition:1s;

}

.show{

opacity:1;

transform:translateY(0);

}

`;

document.head.appendChild(style);

// ================================
// تغيير لون الزر عند الضغط
// ================================

document.querySelectorAll(".card button").forEach(btn=>{

    btn.addEventListener("mousedown",()=>{

        btn.style.transform="scale(.95)";

    });

    btn.addEventListener("mouseup",()=>{

        btn.style.transform="scale(1)";

    });

});

// ================================
// السنة الحالية في الفوتر (اختياري)
// ================================

const footer=document.querySelector("footer");

if(footer){

    const year=document.createElement("p");

    year.innerHTML="© "+new Date().getFullYear()+" Nabra Cosmetiques";

    footer.appendChild(year);

}
