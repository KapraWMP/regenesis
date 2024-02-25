let resources = 0;
let population = 0;
let shelterCost = 100;
let resourcePerSecond = 0;
let farms = 0;
let farmCost = 250;
let food = 0;

// Function to save game progress
function saveProgress() {
  const gameProgress = {
    resources: resources,
    population: population,
    shelterCost: shelterCost,
    farms: farms,
    farmCost: farmCost,
    food: food
  };
  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
}

// Function to load game progress
function loadProgress() {
  const savedProgress = JSON.parse(localStorage.getItem('gameProgress'));
  if (savedProgress) {
    resources = savedProgress.resources;
    population = savedProgress.population;
    shelterCost = savedProgress.shelterCost;
    farms = savedProgress.farms;
    farmCost = savedProgress.farmCost;
    food = savedProgress.food;
    updateDisplay();
  }
}

function collectResources() {
  const amount = Math.floor(Math.random() * 3) + 1;
  resources += amount;
  updateDisplay();
}

function buildShelter() {
  if (resources >= shelterCost) {
    population += 2;
    resources -= shelterCost;
    shelterCost = Math.ceil(shelterCost * 1.1);
    updateDisplay();
  } else {
    alert("Not enough resources to build a shelter!");
  }
}

function buildFarm() {
  if (resources >= farmCost) {
    farms++;
    resources -= farmCost;
    farmCost = Math.ceil(farmCost * 1.2);
    updateDisplay();
  } else {
    alert("Not enough resources to build a farm!");
  }
}

function updateDisplay() {
  document.getElementById("resources").textContent = resources;
  document.getElementById("population").textContent = population;
  document.getElementById("shelterCost").textContent = shelterCost;
  document.getElementById("resourcePerSecond").textContent = resourcePerSecond;
  document.getElementById("farms").textContent = farms;
  document.getElementById("food").textContent = food;
  document.getElementById("farmCost").textContent = farmCost;
}

// Update resources every 3 seconds
setInterval(() => {
  resources += population * 2;
  food += farms * 5; // Food production from farms
  resourcePerSecond = population * 2;
  updateDisplay();
}, 3000);

// Update food production every 10 seconds
setInterval(() => {
  const farmFoodProduction = farms * 5 * Math.pow(2, farms - 1); // Food production from farms
  food += farmFoodProduction;
  updateDisplay();
}, 10000);

// Autosave every 30 seconds
setInterval(() => {
  saveProgress();
}, 30000);

// Load progress when entering the site
window.onload = function() {
  loadProgress();
};