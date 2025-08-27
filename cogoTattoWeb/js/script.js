window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImage = document.querySelector('#heroImage');
    const navbarLogo = document.querySelector('#navbarLogo')

    if (scrollY > 150) {
        document.body.classList.add('scrolled');
        if (!navbarLogo.querySelector('img')) {
            navbarLogo.innerHTML = '<img src="assets/imgs/Captura de pantalla 2025-08-21 121923.png" alt="logo cogo tattoo">';       
        }
    } else {
        document.body.classList.remove('scrolled');
        if (navbarLogo.querySelector('img')) {
            navbarLogo.textContent = 'Cogo Tattoo';
        }
    }
})