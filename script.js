/* ==========================================
   DocLink India - JavaScript Part 1
========================================== */

// ==============================
// Dark Mode
// ==============================

const darkBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});


// ==============================
// Mobile Menu
// ==============================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {

        menuBtn.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

    } else {

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


// ==============================
// Scroll To Top Button
// ==============================

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ==============================
// Sticky Header Shadow
// ==============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow =
            "0 5px 15px rgba(0,0,0,.05)";

    }

});
/* ==========================================
   DocLink India - JavaScript Part 2
==========================================*/


// ==============================
// Live Search
// ==============================

const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".document-card");

searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    cards.forEach(card => {

        let text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ==============================
// Loader
// ==============================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },500);

    }

});


// ==============================
// Fade Animation on Scroll
// ==============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".document-card,.popular-card,.faq-item")
.forEach(el=>{

    observer.observe(el);

});


// ==============================
// Active Navigation
// ==============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   DocLink India - JavaScript Part 3
========================================== */

// ==============================
// Toast Notification
// ==============================

const toast = document.getElementById("toast");

function showToast(message){

    if(!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


// ==============================
// Favourite Documents
// ==============================

document.querySelectorAll(".document-card").forEach((card,index)=>{

    const favBtn=document.createElement("button");

    favBtn.innerHTML="🤍";

    favBtn.className="fav-btn";

    card.appendChild(favBtn);

    let favs=JSON.parse(localStorage.getItem("favorites"))||[];

    if(favs.includes(index)){

        favBtn.innerHTML="❤️";

    }

    favBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        let list=JSON.parse(localStorage.getItem("favorites"))||[];

        if(list.includes(index)){

            list=list.filter(i=>i!==index);

            favBtn.innerHTML="🤍";

            showToast("Removed from favourites");

        }else{

            list.push(index);

            favBtn.innerHTML="❤️";

            showToast("Added to favourites");

        }

        localStorage.setItem("favorites",JSON.stringify(list));

    });

});


// ==============================
// Copy Official Link
// ==============================

document.querySelectorAll(".document-card a").forEach(link=>{

    const copyBtn=document.createElement("button");

    copyBtn.innerHTML="📋";

    copyBtn.className="copy-btn";

    link.parentElement.appendChild(copyBtn);

    copyBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        navigator.clipboard.writeText(link.href);

        showToast("Official link copied");

    });

});


// ==============================
// Share Button
// ==============================

document.querySelectorAll(".document-card").forEach(card=>{

    const shareBtn=document.createElement("button");

    shareBtn.innerHTML="📤";

    shareBtn.className="share-btn";

    card.appendChild(shareBtn);

    shareBtn.addEventListener("click",async()=>{

        const title=card.querySelector("h3").innerText;

        const url=card.querySelector("a").href;

        if(navigator.share){

            try{

                await navigator.share({

                    title:title,

                    text:"Official Government Service",

                    url:url

                });

            }catch(err){}

        }else{

            navigator.clipboard.writeText(url);

            showToast("Link copied for sharing");

        }

    });

});
/* ==========================================
   DocLink India - JavaScript Part 4 (Final)
========================================== */

// ==============================
// Total Document Counter
// ==============================

const totalCards = document.querySelectorAll(".document-card").length;

const counter = document.createElement("div");

counter.className = "doc-counter";

counter.innerHTML = `Total Documents : ${totalCards}`;

const documentsSection = document.querySelector(".documents .section-title");

if (documentsSection) {
    documentsSection.appendChild(counter);
}

// ==============================
// Search Suggestions
// ==============================

const suggestions = document.createElement("datalist");
suggestions.id = "documentSuggestions";

document.body.appendChild(suggestions);

cards.forEach(card => {

    const option = document.createElement("option");

    option.value = card.querySelector("h3").innerText;

    suggestions.appendChild(option);

});

searchInput.setAttribute("list", "documentSuggestions");

// ==============================
// Keyboard Shortcut
// Press Ctrl + K to Focus Search
// ==============================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "k") {

        e.preventDefault();

        searchInput.focus();

    }

});

// ==============================
// Scroll Progress Bar
// ==============================

const progress = document.createElement("div");

progress.id = "progressBar";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progressHeight =
        (window.pageYOffset / totalHeight) * 100;

    progress.style.width = progressHeight + "%";

});

// ==============================
// Highlight Search Result
// ==============================

searchInput.addEventListener("keyup", () => {

    const keyword = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const title = card.querySelector("h3");

        const text = title.innerText.toLowerCase();

        if (keyword !== "" && text.includes(keyword)) {

            title.style.color = "#2563eb";

        } else {

            title.style.color = "";

        }

    });

});

// ==============================
// Welcome Message
// ==============================

window.addEventListener("load", () => {

    console.log("Welcome to DocLink India");

});
