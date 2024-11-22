let allCars = [];

async function fetchCarData() {
  try {
    const response = await fetch('http://localhost:3000/cars'); 
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const cars = await response.json(); 
    allCars = cars; 
    renderCars(allCars); 
  } catch (error) {
    console.error('Error fetching car data:', error);
    document.getElementById('car-list').innerHTML = `<p>Failed to load car data. Please try again later.</p>`;
  }
}

function renderCars(cars) {
  const carList = document.getElementById('car-list');
  carList.innerHTML = ''; 
  cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('car-card');

    carCard.innerHTML = `
      <img src="${car.carimage}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>Fuel: ${car.fuel}</p>
      <p>Transmission: ${car.transmission}</p>
      <p>Seats: ${car['seater type']}</p>
      <p class="price">₹${car.price}/day</p>
      ${car.available === "true"
        ? '<button>Book Now</button>'
        : '<p style="color: red;">Not Available</p>'}
    `;

    carList.appendChild(carCard);
  });
}

function filterCars() {
  const name = document.getElementById('name').value.toLowerCase();
  const fuel = document.getElementById('fuel').value;
  const transmission = document.getElementById('transmission').value;
  const seater = document.getElementById('seater').value;

  
  const filteredCars = allCars.filter(car => {
    return (
      (name === '' || car.name.toLowerCase().includes(name)) &&
      (fuel === 'all' || car.fuel === fuel) &&
      (transmission === 'all' || car.transmission === transmission) &&
      (seater === 'all' || car['seater type'] === seater)
    );
  });

  renderCars(filteredCars); 
}


document.getElementById('filter-button').addEventListener('click', filterCars);


fetchCarData();
