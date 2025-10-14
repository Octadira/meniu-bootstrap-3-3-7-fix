document.addEventListener("DOMContentLoaded", function() {
    // Selectează toate imaginile cărora vrei să le aplici efectul
    const imagesToAnimate = document.querySelectorAll('.col-md-8 img');

    // Opțiuni pentru Intersection Observer
    // Animația va porni când cel puțin 10% din imagine este vizibilă
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    // Creează observatorul
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Dacă elementul a intrat în viewport
            if (entry.isIntersecting) {
                // Adaugă clasa pentru a porni animația
                entry.target.classList.add('is-visible');
                
                // Oprește observarea elementului după ce a fost animat o dată
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pornește observarea pentru fiecare imagine
    imagesToAnimate.forEach(image => {
        observer.observe(image);
    });
});
