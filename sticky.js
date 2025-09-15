  $(document).ready(function() {
    var $menu = $('#secondary-menu');
    var $parentCol = $menu.parent();
    var menuOriginalTop = $menu.offset().top;

    function handleStickyMenu() {
      var windowTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();
      var menuHeight = $menu.outerHeight();
      
      var topOffset = 90; // Inaltimea meniului principal fixat

      // Dezactivează comportamentul sticky pentru ecranele mici
      if (windowWidth < 768) {
        $menu.css({
          'position': 'relative',
          'top': '0',
          'height': 'auto',
          'overflow-y': 'visible'
        });
        return;
      }

      if (windowTop > menuOriginalTop) {
        // Meniul devine fix
        $menu.css({
          'position': 'fixed',
          'top': topOffset + 'px',
          'width': $parentCol.width() + 'px',
          'z-index': '900'
        });

        // Verificam daca inaltimea meniului depaseste spatiul disponibil
        var availableHeight = windowHeight - topOffset - 20; // 20px pentru un spatiu de jos
        if (menuHeight > availableHeight) {
          $menu.css({
            'height': availableHeight + 'px',
            'overflow-y': 'scroll' // Adauga bara de derulare interna
          });
        } else {
          $menu.css({
            'height': 'auto',
            'overflow-y': 'visible'
          });
        }
      } else {
        // Meniul revine la pozitia normala
        $menu.css({
          'position': 'relative',
          'top': '0',
          'width': 'auto',
          'height': 'auto',
          'overflow-y': 'visible'
        });
      }
    }

    $(window).on('scroll resize', function() {
      // Recalculam pozitia la redimensionare
      menuOriginalTop = $parentCol.offset().top;
      handleStickyMenu();
    });

    handleStickyMenu();
  });
