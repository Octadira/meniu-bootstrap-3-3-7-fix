$(document).ready(function() {
    var productCarousel = $('#product-carousel');
    var carouselInner = productCarousel.find('.carousel-inner');
    var originalProducts = carouselInner.html(); // Salvăm HTML-ul original al produselor

    function setupCarousel() {
        var isMobile = $(window).width() < 768;

        if (isMobile) {
            // --- Suntem pe MOBIL ---
            // Verificăm dacă nu am creat deja caruselul
            if (carouselInner.find('.item').length === 0) {
                var products = $(originalProducts).filter('.product-column');
                carouselInner.empty(); // Golim containerul
                productCarousel.find('.carousel-indicators').empty(); // Golim indicatorii vechi

                // Grupăm produsele câte două în slide-uri (.item)
                for (var i = 0; i < products.length; i += 2) {
                    var slideIndex = i / 2;
                    var item = $('<div class="item"></div>').append(products.slice(i, i + 2));
                    carouselInner.append(item);
                    
                    // Creăm un indicator pentru fiecare slide
                    var indicator = $('<li data-target="#product-carousel"></li>').attr('data-slide-to', slideIndex);
                    productCarousel.find('.carousel-indicators').append(indicator);
                }

                // Setăm primul slide și primul indicator ca fiind active
                carouselInner.find('.item:first').addClass('active');
                productCarousel.find('.carousel-indicators li:first').addClass('active');
            }
            // Inițiem funcționalitatea de carusel de la Bootstrap
            productCarousel.carousel({ interval: 4000, pause: 'hover' });
        } else {
            // --- Suntem pe DESKTOP ---
            productCarousel.carousel('pause'); // Oprim caruselul
            carouselInner.html(originalProducts); // Restaurăm grila originală de produse
            productCarousel.find('.carousel-indicators').empty(); // Ne asigurăm că nu există indicatori
        }
    }

    // Funcție ajutătoare pentru a nu rula funcția de setup prea des la redimensionare
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    };

    setupCarousel(); // Rulăm funcția la încărcarea paginii
    $(window).on('resize', debounce(setupCarousel, 250)); // Și o rulăm din nou la redimensionarea ferestrei
});
