//JS-->


const locations = [
  "Rajpur Road",
  "Ballupur",
  "Prem Nagar",
  "Clement Town",
  "ISBT",
  "Sahastradhara",
  "Dalanwala",
  "Doiwala",
  "Kargi Chowk",
  "Race Course"
];

const services = ["Cleaning","Plumbing","Electrician","Cook","Babysitter","Maid"];

// FIRST + LAST NAME POOLS
const firstNames = [
  "Aman","Rohit","Deepak","Ankit","Vikas","Sahil","Karan","Rahul","Arjun","Vivek",
  "Nitin","Suresh","Rakesh","Lokesh","Manoj","Ajay","Kunal","Yash","Dev","Harish",
  "Neha","Pooja","Anjali","Kavita","Meena","Sunita","Geeta","Ritika","Nikita","Shalini",
  "Pallavi","Komal","Seema","Rekha","Sarita","Anita","Suman","Savita","Tanvi","Megha"
];

const lastNames = [
  "Sharma","Verma","Gupta","Singh","Kumar","Joshi","Rawat","Negi","Bisht","Rana",
  "Thapa","Mehta","Chauhan","Pandey","Bora","Nautiyal","Kapoor","Malhotra","Saxena","Agarwal"
];

// TRACK USED NAMES
const usedNames = new Set();

// GENERATE UNIQUE NAME
function uniqueName(){
  let name;

  do {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    name = first + " " + last;
  } while (usedNames.has(name));

  usedNames.add(name);
  return name;
}

// ===== 200 WORKERS =====
const workers = [];

for(let i = 1; i <= 200; i++){

  let service = services[Math.floor(Math.random() * services.length)];
  let area = locations[Math.floor(Math.random() * locations.length)];
  let available = Math.random() > 0.3;

  let roleMap = {
    "Cleaning": "Cleaner",
    "Plumbing": "Plumber",
    "Electrician": "Electrician",
    "Cook": "Cook",
    "Babysitter": "Babysitter",
    "Maid": "Maid"
  };

  let priceMap = {
    "Cleaning": 400 + Math.floor(Math.random()*200),
    "Plumbing": 600 + Math.floor(Math.random()*300),
    "Electrician": 600 + Math.floor(Math.random()*200),
    "Cook": 700 + Math.floor(Math.random()*300),
    "Babysitter": 500 + Math.floor(Math.random()*300),
    "Maid": 400 + Math.floor(Math.random()*200)
  };

  workers.push({
    name: uniqueName(),
    role: roleMap[service],
    service: service,
    area: area,
    available: available,
    price: priceMap[service],
    rating: +(3 + Math.random()*2).toFixed(1)
  });
}

// ===== RENDER =====
function renderWorkers(){
  let grid = document.getElementById("workerGrid");
  grid.innerHTML = "";

  workers.forEach(w => {
    let statusClass = w.available ? "available" : "busy";
    let statusText = w.available ? "Available" : "Not Available";

    grid.innerHTML += `
      <div class="worker-card" data-area="${w.area}" data-service="${w.service}">
        <h3>${w.name}</h3>
        <p>${w.role}</p>
        <p class="rating">⭐ ${w.rating}</p>
        <p class="price">₹${w.price}</p>
        <p class="location">📍 ${w.area}</p>
        <p class="status ${statusClass}">● ${statusText}</p>
        <button onclick="openBooking('${w.name}')">Book Now</button>
      </div>
    `;
  });
}
function selectService(service){
  selectedService = service;

  applyFilters();

  // scroll to workers
  document.querySelector(".workers").scrollIntoView({
    behavior: "smooth"
  });
}

// ===== FILTER =====
let selectedArea = "all";
let selectedService = "all";

function filterArea(area){
  selectedArea = area;
  applyFilters();
}

function applyFilters(){
  document.querySelectorAll(".worker-card").forEach(card=>{
    let a = card.getAttribute("data-area");
    let s = card.getAttribute("data-service");

    let matchArea = (selectedArea === "all" || a === selectedArea);
    let matchService = (selectedService === "all" || s === selectedService);

    card.style.display = (matchArea && matchService) ? "block" : "none";
  });
}

function resetFilters(){
  selectedArea = "all";
  selectedService = "all";

  document.querySelector("select").value = "all";

  applyFilters();
}
function sortWorkers(type){

  console.log("Sorting:", type); // debug (check console)

  if(type === "priceLow"){
    workers.sort((a,b)=>a.price - b.price);
  }

  else if(type === "priceHigh"){
    workers.sort((a,b)=>b.price - a.price);
  }

  else if(type === "ratingHigh"){
    workers.sort((a,b)=>b.rating - a.rating);
  }

  else if(type === "ratingLow"){
    workers.sort((a,b)=>a.rating - b.rating);
  }

  renderWorkers();
  applyFilters();
}

// ===== BOOKING =====
let currentWorker = "";

function openBooking(name){
  currentWorker = name;
  document.getElementById("bookingModal").style.display = "flex";
  document.getElementById("workerName").innerText = name;
}

function closeBooking(){
  document.getElementById("bookingModal").style.display = "none";
}

function confirmBooking(){
  let user = document.getElementById("userName").value;
  let time = document.getElementById("timeSlot").value;

  if(user===""){
    alert("Enter your name");
    return;
  }

  alert(`Booking confirmed with ${currentWorker} at ${time}`);
  closeBooking();
}

// INIT
renderWorkers();


