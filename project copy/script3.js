// Extract Car ID from URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get("id");
const bookingDetailsDiv = document.getElementById("booking-details");

// Fetch and Display Car Details
async function fetchCarBookingDetails() {
  try {
    const response = await fetch("http://localhost:3000/cars");
    const cars = await response.json();
    const car = cars.find((c) => c.id == carId);

    if (!car) {
      bookingDetailsDiv.innerHTML = "<p>Car not found. Please return to the previous page.</p>";
      return;
    }

    displayCarBookingDetails(car);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    bookingDetailsDiv.innerHTML = "<p>Error loading booking details. Please try again later.</p>";
  }
}

// Display Car Booking Details
function displayCarBookingDetails(car) {
  bookingDetailsDiv.innerHTML = `
    <h1>Book Your Car</h1>
    <div class="car-info">
      <img src="${car.carimage}" alt="${car.name}" class="car-image">
      <div class="details">
        <h2>${car.name}</h2>
        <p>Fuel Type: ${car.fuel}</p>
        <p>Transmission: ${car.transmission}</p>
        <p>Seating Capacity: ${car["seater type"]}</p>
        <p>Price per Day: ₹${car.price}</p>
      </div>
    </div>
    <div class="price-calculator">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date">
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date">
      <p>Total Price: ₹<span id="total-price">0</span></p>
      <button id="confirm-booking">Confirm Booking</button>
    </div>
  `;

  setupPriceCalculator(car.price);
}

// Price Calculator Logic
function setupPriceCalculator(dailyPrice) {
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const totalPriceElement = document.getElementById("total-price");

  function calculateTotalPrice() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
      totalPriceElement.textContent = "0";
      return;
    }

    const timeDiff = endDate - startDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const totalPrice = days * dailyPrice;

    totalPriceElement.textContent = totalPrice;
  }

  startDateInput.addEventListener("change", calculateTotalPrice);
  endDateInput.addEventListener("change", calculateTotalPrice);
}

// Initialize on Page Load
fetchCarBookingDetails();
