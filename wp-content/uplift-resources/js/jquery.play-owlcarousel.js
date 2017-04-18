jQuery(function ($) {

  // Owl Carousel default values
  var owl = $('.owl-carousel');
  owl.owlCarousel( {
    items:4,
    loop:true,
    margin:10,
    autoplay:false,
    nav:true,
    stagePadding:60,
    dots:false,
    responsive: {
      0 : {
        items:1
      },
      410 : {
        items:2
      },
      750 : {
        items:3
      },
      900 : {
        items:4
      }
    }

  });

  // When DOM is rendered
  $(document).ready(function() {

      // Make the image maps responsive
      $('map').imageMapResize();

      // Smooth Scrolling
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {

            $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            
            return false;

          }

        }

      });

  });

});