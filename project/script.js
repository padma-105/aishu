const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('hide');
});

// carousels start
document.getElementsByClassName('.container-fluid').style.backgroundImage = "url('r1.jpg')";
// carousels end



