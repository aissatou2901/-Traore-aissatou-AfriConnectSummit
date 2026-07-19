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

// Onglets du programme
const ongletsBoutons = document.querySelectorAll('.onglet-btn');
const ongletsContenus = document.querySelectorAll('.onglet-contenu');

ongletsBoutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
        // Retire "active" de tous les boutons
        ongletsBoutons.forEach(function(b) {
            b.classList.remove('active');
        });
        // Ajoute "active" seulement au bouton cliqué
        bouton.classList.add('active');

        // Cache tous les contenus
        ongletsContenus.forEach(function(contenu) {
            contenu.classList.add('cache');
        });

        // Affiche seulement le contenu correspondant
        const jourCible = bouton.getAttribute('data-jour');
        document.getElementById(jourCible).classList.remove('cache');
    });
});
// Filtrage dynamique des intervenants
const filtreBoutons = document.querySelectorAll('.filtre-btn');
const cartesIntervenants = document.querySelectorAll('.intervenant-carte');

filtreBoutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
        // Met à jour le bouton actif
        filtreBoutons.forEach(function(b) {
            b.classList.remove('active');
        });
        bouton.classList.add('active');

        const filtreChoisi = bouton.getAttribute('data-filtre');

        // Parcourt chaque carte et décide de l'afficher ou non
        cartesIntervenants.forEach(function(carte) {
            const categorieCarte = carte.getAttribute('data-categorie');

            if (filtreChoisi === 'tous' || categorieCarte === filtreChoisi) {
                carte.classList.remove('cache');
            } else {
                carte.classList.add('cache');
            }
        });
    });
});

// Animations au scroll avec IntersectionObserver
const elementsAAnimer = document.querySelectorAll('#chiffres-cles, #pourquoi-participer .raison-carte, .intervenant-carte, #sponsors, #thematiques .thematique-carte');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entree) {
        if (entree.isIntersecting) {
            entree.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.2 });

elementsAAnimer.forEach(function(element) {
    observer.observe(element);
});

// Compteurs animés
function animerCompteur(element, cible) {
    let valeurActuelle = 0;
    const duree = 1500; // 1.5 secondes
    const increment = cible / (duree / 16); // ~60 images par seconde

    function etape() {
        valeurActuelle += increment;
        if (valeurActuelle < cible) {
            element.textContent = Math.floor(valeurActuelle);
            requestAnimationFrame(etape);
        } else {
            element.textContent = cible;
        }
    }

    etape();
}

const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entree) {
        if (entree.isIntersecting) {
            const cible = parseInt(entree.target.getAttribute('data-target'));
            animerCompteur(entree.target, cible);
            statsObserver.unobserve(entree.target);
        }
    });
});

statNumbers.forEach(function(element) {
    statsObserver.observe(element);
});