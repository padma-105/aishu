let allCars = [];

// Fetch car data from API
async function fetchData() {
  try {
    const res = await fetch("http://localhost:3000/cars");
    const data = await res.json();
    allCars = data;
    renderCars(allCars);
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

// Render car data dynamically
function renderCars(data) {
  const main = document.getElementById("carousel-container"); // ✅ Fixed incorrect ID
  main.innerHTML = "";

  data.forEach((car) => {
    const card = document.createElement("li");
    card.className = "carousel-item";
    card.innerHTML = `
      <div class="car-card">
          <div class="car-data">
              <div>
                  <h3 class="car-name">${car?.name}</h3>
                  <p class="car-brand">${car?.brand}</p>
              </div>
              <img src="${car?.carimage}" alt="${car?.name}" class="car-image">
          </div>
          <div class="car-details">
              <span><i class="fa fa-car"></i> ${car?.segment || "N/A"}</span>
              <span><i class="fa fa-cogs"></i> ${car?.transmission}</span>
              <span><i class="fa fa-users"></i> ${car?.seater || "Unknown"} seats</span>
          </div>
          <p class="car-price">₹${car?.price} <span>per day</span></p>
          ${
            car.available === "true"
              ? `<a href="index2.html?id=${car.id}" class="book-now-button">Book Now</a>`
              : '<p class="sold-out">Sold Out</p>'
          }
      </div>
    `;
    main.appendChild(card);
  });
}

// Filter cars based on selected values
function filterCars() {
  const fuel = document.getElementById("filter-fuel").value;
  const transmission = document.getElementById("filter-transmission").value;
  const seater = document.getElementById("filter-seater").value;

  const filteredCars = allCars.filter((car) => {
    return (
      (fuel === "" || car.fuel === fuel) &&
      (transmission === "" || car.transmission === transmission) &&
      (seater === "" || car.seater === seater)
    );
  });

  renderCars(filteredCars);
}

// Add event listener to filter button
document.getElementById("apply-filters").addEventListener("click", filterCars);

// Fetch data on page load
fetchData();
