// Sélectionne le bouton et le body
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Fonction qui applique un thème donné
function appliquerTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Au chargement de la page : vérifier si un thème est déjà sauvegardé
const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde) {
    appliquerTheme(themeSauvegarde);
}
// Année dynamique dans le footer
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
// Au clic sur le bouton : basculer le thème
themeToggle.addEventListener('click', function() {
    const themeActuel = body.getAttribute('data-theme');
    const nouveauTheme = themeActuel === 'dark' ? 'light' : 'dark';
    appliquerTheme(nouveauTheme);
});
// Navbar dynamique au scroll
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu hamburger mobile
const hamburgerBtn = document.getElementById('hamburger-btn');
const navUl = document.querySelector('nav ul');

hamburgerBtn.addEventListener('click', function() {
    navUl.classList.toggle('menu-ouvert');
});

// Bouton retour en haut
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});