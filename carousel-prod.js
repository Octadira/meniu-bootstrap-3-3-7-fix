$(document).ready(function() {
    // Funcție pentru a configura caruselul
    function setupProductCarousel() {
        // Verificăm lățimea ecranului
        if ($(window).width() < 768) {
            var carouselInner = $('#product-carousel .carousel-inner');
            var products = carouselInner.find('.product-column');

            // Verificăm dacă produsele nu au fost deja grupate
            if (carouselInner.find('.item').length === 0) {
                // Iterăm prin produse și le grupăm câte două
                for (var i = 0; i < products.length; i += 2) {
                    // Creăm un nou div .item pentru fiecare pereche de produse
                    var item = $('<div class="item"></div>');
                    
                    // Adăugăm clasa 'active' primului grup
                    if (i === 0) {
                        item.addClass('active');
                    }
                    
                    // Selectăm produsele curente și următoarele și le adăugăm în .item
                    var productPair = products.slice(i, i + 2);
                    item.append(productPair);
                    
                    // Adăugăm noul .item în containerul caruselului
                    carouselInner.append(item);
                }
            }
            
            // Inițiem caruselul Bootstrap
            $('#product-carousel').carousel({
                interval: 4000 // Schimbă slide-ul la fiecare 4 secunde (opțional)
            });

        } else {
            // Pe desktop, ne asigurăm că structura este cea originală (dacă fereastra e redimensionată)
            var carouselInner = $('#product-carousel .carousel-inner');
            if (carouselInner.find('.item').length > 0) {
                var products = carouselInner.find('.product-column');
                carouselInner.html(products); // Desfacem grupurile .item
            }
        }
    }

    // Rulăm funcția la încărcarea paginii
    setupProductCarousel();

    // Rulăm funcția și la redimensionarea ferestrei, pentru a comuta între vizualizări
    $(window).on('resize', function() {
        // Folosim un mic delay pentru a evita rularea excesivă la redimensionare
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            setupProductCarousel();
        }, 250);
    });
});
