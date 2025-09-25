$(document).ready(function() {
    function setupProductCarousel() {
        var isMobile = $(window).width() < 768;
        var carousel = $('#product-carousel');
        var carouselInner = carousel.find('.carousel-inner');
        var indicators = carousel.find('.carousel-indicators'); // Referință către containerul indicatorilor
        var products = carouselInner.find('.product-column');

        if (isMobile) {
            // Verificăm dacă structura de carusel nu a fost deja creată
            if (carouselInner.find('.item').length === 0) {
                indicators.empty(); // Curățăm indicatorii vechi
                
                // Iterăm prin produse și le grupăm câte două
                for (var i = 0; i < products.length; i += 2) {
                    var slideIndex = i / 2; // Indexul pentru slide (0, 1, 2...)
                    
                    // Creăm slide-ul (.item)
                    var item = $('<div class="item"></div>');
                    var productPair = products.slice(i, i + 2);
                    item.append(productPair);
                    carouselInner.append(item);

                    // Creăm indicatorul (<li>) corespunzător
                    var indicator = $('<li></li>');
                    indicator.attr('data-target', '#product-carousel');
                    indicator.attr('data-slide-to', slideIndex);
                    indicators.append(indicator);

                    // Activăm primul slide și primul indicator
                    if (i === 0) {
                        item.addClass('active');
                        indicator.addClass('active');
                    }
                }
            }
            
            // Inițiem sau repornim caruselul
            carousel.carousel({
                interval: 4000,
                pause: 'hover'
            });

        } else { // Pe desktop
            // Dacă există slide-uri (.item), le desfacem pentru a reveni la grilă
            if (carouselInner.find('.item').length > 0) {
                var allProducts = carouselInner.find('.product-column');
                carouselInner.html(allProducts); // Punem produsele înapoi direct în container
                indicators.empty(); // Ascundem și golim indicatorii
                carousel.carousel('pause'); // Oprim caruselul
            }
        }
    }

    // Rulăm funcția la încărcarea și redimensionarea paginii
    setupProductCarousel();

    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupProductCarousel, 250);
    });
});
