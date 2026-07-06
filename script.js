/*====================================================
  POPULAR REAL ESTATES
  Luxury Real Estate Website
====================================================*/

"use strict";

/*====================================================
  SELECTORS
====================================================*/

const loader = document.getElementById("loader");
const header = document.querySelector("header");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.getElementById("backToTop");

const favouriteButtons = document.querySelectorAll(".favourite-btn");
const shareButtons = document.querySelectorAll(".share-btn");

const animatedCards = document.querySelectorAll(
".property-card, .buyer-card, .agent-card, .testimonial-card, .why-card, .category-card, .stat-card"
);

/*====================================================
  PAGE LOADER
====================================================*/

window.addEventListener("load", () => {

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    setTimeout(() => {

        loader.remove();

    }, 500);

});

/*====================================================
  STICKY HEADER
====================================================*/

function updateHeader(){

    if(!header) return;

    if(window.scrollY > 60){

        header.style.padding = "0";
        header.style.boxShadow = "0 12px 35px rgba(0,0,0,.08)";

    }else{

        header.style.boxShadow = "none";

    }

}

window.addEventListener("scroll", updateHeader);

/*====================================================
  MOBILE MENU
====================================================*/

if(mobileMenu && navLinks){

    mobileMenu.addEventListener("click",()=>{

        navLinks.classList.toggle("show");

        mobileMenu.classList.toggle("active");

    });

}

/*====================================================
  BACK TO TOP BUTTON
====================================================*/

if(backToTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 500){

            backToTop.classList.add("show");

        }else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*====================================================
  FAVOURITE BUTTONS
====================================================*/

favouriteButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        button.innerHTML =
button.classList.contains("active")
? '<i class="fas fa-heart"></i>'
: '<i class="far fa-heart"></i>';

    });

});

/*====================================================
  SHARE BUTTON
====================================================*/

shareButtons.forEach(button=>{

    button.addEventListener("click",async()=>{

        if(navigator.share){

            try{

                await navigator.share({

                    title:document.title,

                    text:"Take a look at this property.",

                    url:window.location.href

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            navigator.clipboard.writeText(window.location.href);

            alert("Property link copied to clipboard.");

        }

    });

});

/*====================================================
  SCROLL REVEAL
====================================================*/

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:.15
});

animatedCards.forEach(card=>{

    observer.observe(card);

});


/*====================================================
  SMOOTH NAV HIGHLIGHT (ACTIVE LINK)
====================================================*/

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    if(link.getAttribute("href") === currentPage){

        link.classList.add("active");

    }

});


/*====================================================
  SMOOTH SCROLL FOR INTERNAL LINKS
====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});


/*====================================================
  PROPERTY SEARCH VALIDATION
====================================================*/

const searchForm = document.querySelector(".property-search");

if(searchForm){

    searchForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const inputs = searchForm.querySelectorAll("input, select");

        let valid = false;

        inputs.forEach(input => {

            if(input.value.trim() !== "" && input.value !== "Property Type" && input.value !== "Price Range"){

                valid = true;

            }

        });

        if(!valid){

            alert("Please enter a location or select filters before searching.");

            return;

        }

        alert("Searching premium properties...");

        // Here later we will connect to real filtering system

    });

}


/*====================================================
  NEWSLETTER FORM VALIDATION
====================================================*/

const newsletterForm = document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = newsletterForm.querySelector("input").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you for subscribing to luxury property updates.");

        newsletterForm.reset();

    });

}


/*====================================================
  BUTTON RIPPLE EFFECT (LUXURY INTERACTION)
====================================================*/

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("click", function(e){

        const circle = document.createElement("span");

        circle.classList.add("ripple");

        this.appendChild(circle);

        const d = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = d + "px";

        circle.style.left = e.clientX - this.offsetLeft - d / 2 + "px";

        circle.style.top = e.clientY - this.offsetTop - d / 2 + "px";

        setTimeout(() => circle.remove(), 600);

    });

});


/*====================================================
  SCROLL PROGRESS INDICATOR
====================================================*/

const progressBar = document.createElement("div");

progressBar.style.position = "fixed";

progressBar.style.top = "0";

progressBar.style.left = "0";

progressBar.style.height = "3px";

progressBar.style.background = "#c1121f";

progressBar.style.width = "0%";

progressBar.style.zIndex = "99999";

document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});


/*====================================================
  SIMPLE ANIMATION OPTIMIZATION
====================================================*/

let ticking = false;

function updateOnScroll(){

    document.querySelectorAll(".property-card, .agent-card, .why-card").forEach(el => {

        const rect = el.getBoundingClientRect();

        if(rect.top < window.innerHeight - 100){

            el.style.opacity = "1";

            el.style.transform = "translateY(0)";

        }

    });

    ticking = false;

}

window.addEventListener("scroll", () => {

    if(!ticking){

        window.requestAnimationFrame(updateOnScroll);

        ticking = true;

    }

});

/*====================================================
  LOCAL STORAGE SYSTEM (SAVED PROPERTIES)
====================================================*/

const STORAGE_KEY = "popular_real_estates_saved";

function getSavedProperties() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProperty(propertyId) {

    const saved = getSavedProperties();

    if (!saved.includes(propertyId)) {
        saved.push(propertyId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }

}

function removeProperty(propertyId) {

    let saved = getSavedProperties();

    saved = saved.filter(id => id !== propertyId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

}

function toggleSaveProperty(propertyId) {

    const saved = getSavedProperties();

    if (saved.includes(propertyId)) {
        removeProperty(propertyId);
        return false;
    } else {
        saveProperty(propertyId);
        return true;
    }
}


/*====================================================
  ENHANCED FAVOURITE SYSTEM (SYNC WITH STORAGE)
====================================================*/

document.querySelectorAll(".favourite-btn").forEach((btn, index) => {

    const id = "property-" + index;

    const saved = getSavedProperties();

    if (saved.includes(id)) {
        btn.classList.add("active");
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    }

    btn.addEventListener("click", () => {

        const state = toggleSaveProperty(id);

        btn.classList.toggle("active", state);

        btn.innerHTML = state
? '<i class="fas fa-heart"></i>'
: '<i class="far fa-heart"></i>';

    });

});


/*====================================================
  AI PROPERTY RECOMMENDATION ENGINE (FRONTEND MOCK)
====================================================*/

function getAIRecommendation(input) {

    const keywords = input.toLowerCase();

    const recommendations = [];

    if (keywords.includes("luxury")) {
        recommendations.push("Sandton Luxury Estates", "Constantia Villas");
    }

    if (keywords.includes("cheap") || keywords.includes("affordable")) {
        recommendations.push("Starter Homes Johannesburg", "Pretoria Apartments");
    }

    if (keywords.includes("investment")) {
        recommendations.push("Cape Town Growth Areas", "Durban Beachfront Investments");
    }

    if (keywords.includes("family")) {
        recommendations.push("Secure Estates", "Suburban Homes");
    }

    if (recommendations.length === 0) {
        recommendations.push("Popular Listings", "New Developments");
    }

    return recommendations;
}


/*====================================================
  AI CHAT SYSTEM (BASIC FRONTEND ENGINE)
====================================================*/

function createAIResponse(message) {

    const msg = message.toLowerCase();

    if (msg.includes("buy")) {
        return "I recommend exploring luxury estates in Sandton and Cape Town for strong long-term value.";
    }

    if (msg.includes("rent")) {
        return "Rental opportunities are strong in Johannesburg CBD and Umhlanga.";
    }

    if (msg.includes("invest")) {
        return "Property investment in Western Cape coastal areas shows strong growth potential.";
    }

    if (msg.includes("price")) {
        return "Prices vary widely. Luxury homes start around R3M in major metros.";
    }

    return "I can help you find luxury homes, investment properties, or affordable options across South Africa.";
}


/*====================================================
  SIMPLE AI CHAT UI HANDLER (IF USED LATER)
====================================================*/

function sendAIMessage(userMessage) {

    const response = createAIResponse(userMessage);

    return {
        user: userMessage,
        ai: response
    };

}


/*====================================================
  PROPERTY FILTER ENGINE (BASIC FRONTEND LOGIC)
====================================================*/

function filterProperties(properties, filters) {

    return properties.filter(property => {

        let match = true;

        if (filters.minPrice && property.price < filters.minPrice) match = false;

        if (filters.maxPrice && property.price > filters.maxPrice) match = false;

        if (filters.bedrooms && property.bedrooms < filters.bedrooms) match = false;

        if (filters.location && !property.location.includes(filters.location)) match = false;

        return match;

    });

}


/*====================================================
  AI INSIGHT GENERATOR (MOCK ANALYTICS)
====================================================*/

function generateAIInsight(property) {

    if (property.price > 10000000) {
        return "Ultra-luxury tier with high exclusivity and strong prestige value.";
    }

    if (property.price > 5000000) {
        return "High-value investment property in a premium location.";
    }

    return "Strong entry-level investment with growth potential.";
}
