// Sélectionne le bouton et le body
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function appliquerTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde) {
    appliquerTheme(themeSauvegarde);
}

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

themeToggle.addEventListener('click', function() {
    const themeActuel = body.getAttribute('data-theme');
    const nouveauTheme = themeActuel === 'dark' ? 'light' : 'dark';
    appliquerTheme(nouveauTheme);
});

const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const navUl = document.querySelector('nav ul');

hamburgerBtn.addEventListener('click', function() {
    navUl.classList.toggle('menu-ouvert');
});

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const ongletsBoutons = document.querySelectorAll('.onglet-btn');
const ongletsContenus = document.querySelectorAll('.onglet-contenu');

ongletsBoutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
        ongletsBoutons.forEach(function(b) { b.classList.remove('active'); });
        bouton.classList.add('active');
        ongletsContenus.forEach(function(contenu) { contenu.classList.add('cache'); });
        const jourCible = bouton.getAttribute('data-jour');
        document.getElementById(jourCible).classList.remove('cache');
    });
});

const filtreBoutons = document.querySelectorAll('.filtre-btn');
const cartesIntervenants = document.querySelectorAll('.intervenant-carte');

filtreBoutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
        filtreBoutons.forEach(function(b) { b.classList.remove('active'); });
        bouton.classList.add('active');
        const filtreChoisi = bouton.getAttribute('data-filtre');
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

function animerCompteur(element, cible) {
    let valeurActuelle = 0;
    const duree = 1500;
    const increment = cible / (duree / 16);

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

// Validation du formulaire de contact
const formulaire = document.getElementById('form-inscription');

if (formulaire) {
    formulaire.addEventListener('submit', function(evenement) {
        evenement.preventDefault();

        let formulaireValide = true;

        // Validation du nom complet
        const champNom = document.getElementById('nom');
        const erreurNom = champNom.nextElementSibling;

        if (champNom.value.trim() === '') {
            champNom.classList.add('erreur');
            champNom.classList.remove('valide');
            erreurNom.textContent = 'Le nom complet est requis.';
            formulaireValide = false;
        } else {
            champNom.classList.add('valide');
            champNom.classList.remove('erreur');
            erreurNom.textContent = '';
        }

        // Validation de l'email (regex)
        const champEmail = document.getElementById('email');
        const erreurEmail = champEmail.nextElementSibling;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(champEmail.value.trim())) {
            champEmail.classList.add('erreur');
            champEmail.classList.remove('valide');
            erreurEmail.textContent = 'Veuillez entrer un email valide.';
            formulaireValide = false;
        } else {
            champEmail.classList.add('valide');
            champEmail.classList.remove('erreur');
            erreurEmail.textContent = '';
        }

        // Validation du téléphone (minimum 8 chiffres)
        const champTelephone = document.getElementById('telephone');
        const erreurTelephone = champTelephone.nextElementSibling;
        const chiffresUniquement = champTelephone.value.replace(/\D/g, '');

        if (chiffresUniquement.length < 8) {
            champTelephone.classList.add('erreur');
            champTelephone.classList.remove('valide');
            erreurTelephone.textContent = 'Le téléphone doit contenir au moins 8 chiffres.';
            formulaireValide = false;
        } else {
            champTelephone.classList.add('valide');
            champTelephone.classList.remove('erreur');
            erreurTelephone.textContent = '';
        }

        // Validation du type de participation
        const champParticipation = document.getElementById('participation');
        const erreurParticipation = champParticipation.nextElementSibling;

        if (champParticipation.value === '') {
            champParticipation.classList.add('erreur');
            champParticipation.classList.remove('valide');
            erreurParticipation.textContent = 'Veuillez choisir un type de participation.';
            formulaireValide = false;
        } else {
            champParticipation.classList.add('valide');
            champParticipation.classList.remove('erreur');
            erreurParticipation.textContent = '';
        }

        // Validation du pays
        const champPays = document.getElementById('pays');
        const erreurPays = champPays.nextElementSibling;

        if (champPays.value === '') {
            champPays.classList.add('erreur');
            champPays.classList.remove('valide');
            erreurPays.textContent = 'Veuillez choisir votre pays.';
            formulaireValide = false;
        } else {
            champPays.classList.add('valide');
            champPays.classList.remove('erreur');
            erreurPays.textContent = '';
        }

        // Validation du message (minimum 20 caractères)
        const champMessage = document.getElementById('message');
        const erreurMessage = champMessage.nextElementSibling;

        if (champMessage.value.trim().length < 20) {
            champMessage.classList.add('erreur');
            champMessage.classList.remove('valide');
            erreurMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
            formulaireValide = false;
        } else {
            champMessage.classList.add('valide');
            champMessage.classList.remove('erreur');
            erreurMessage.textContent = '';
        }

        // Si tout est valide : afficher le succès et réinitialiser
        if (formulaireValide) {
            const messageSucces = document.createElement('div');
            messageSucces.className = 'message-succes';
            messageSucces.textContent = 'Votre inscription a bien été envoyée ! Nous vous recontacterons bientôt.';
            formulaire.appendChild(messageSucces);

            formulaire.reset();

            // Enlève les classes valide/erreur après reset
            const tousLesChamps = formulaire.querySelectorAll('input, select, textarea');
            tousLesChamps.forEach(function(champ) {
                champ.classList.remove('valide');
                champ.classList.remove('erreur');
            });

            // Fait disparaître le message après 4 secondes
            setTimeout(function() {
                messageSucces.remove();
            }, 4000);
        }
    });
}