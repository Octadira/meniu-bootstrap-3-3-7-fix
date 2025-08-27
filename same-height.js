$(document).ready(function() {
    
    // Funcția care face magia
    function equalizeColumns() {
        
        $('.equal-height-container').each(function() {
            var maxHeight = 0;
            // Găsim coloanele din containerul curent
            var $columns = $(this).find('.equal-height-item');

            
            $columns.height('auto');

            
            $columns.each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });

            
            if (maxHeight > 0) {
                $columns.height(maxHeight);
            }
        });
    }

    
    equalizeColumns();

    
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(equalizeColumns, 150);
    });

});
