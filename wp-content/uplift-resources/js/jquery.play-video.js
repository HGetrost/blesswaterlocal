jQuery(function ($) {
  /* Safely use the $ inside this code block */

  // Event listeners
  window.addEventListener('resize', resize_carousel_children);

  // Resize the heights of the titles on the video carousel when the page is resized
  function resize_carousel_children() {

    var parentDivHeight = $("#uplbtw-video-carousel-pos-14").height();
    var imageHeight = $("#uplbtw-video-carousel-pos-14 img").height();
    var titleHeight = parentDivHeight - imageHeight;

    $(".uplbtw-video-carousel-title").height(titleHeight);

  };

  $(document).ready(function () {

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);

    // Switch the video iFrame when carousel element is clicked
    $("[id^=uplbtw-video-carousel-pos-]").click(function() {

      // Get the Video iFrame code and carousel item associated with the clicked element 
      var assocVideo = "<div class='uplbtw-video-responsive'>" + $(this).data("iframe-code") + "</div>";

      // Clear the old HTML from the display element and add in the new HTML
      $("#uplbtw-video-player").empty();
      $("#uplbtw-video-player").append(assocVideo);

      //$("html, body").animate({ scrollTop: parseInt($("#uplbtw-share").offset().top) }, "slow");

    });

    // Ensure the titles om the video carousel are resized on page load.
    resize_carousel_children();

  });
  
}); /* End of jQuery $ code block */
