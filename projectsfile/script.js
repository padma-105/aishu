// nav bar start
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});
// nav bar end

// form start
document.getElementsByClassName('.container-fluid').style.backgroundImage = "url('r1.jpg')";
// form end

