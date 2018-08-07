/*
	Prototype by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/
const SPACE_ID = "8r7g5nqpy5xa";
const ACCESS_TOKEN =
  "6e29cb9168aa5283b341ec9e67d7ecd4b32387a20633cba4ce3f3102318a34c8";

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});

(function($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $banner = $("#banner");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"]
  });

  // Play initial animations on page load.
  $window.on("load", function() {
    window.setTimeout(function() {
      $body.removeClass("is-preload");
    }, 100);

    client
      .getEntry("website")
      .then(entry => console.log(entry))
      .catch(err => console.log(err));
  });

  // Header.
  if ($banner.length > 0 && $header.hasClass("alt")) {
    $window.on("resize", function() {
      $window.trigger("scroll");
    });

    $banner.scrollex({
      bottom: $header.outerHeight(),
      terminate: function() {
        $header.removeClass("alt");
      },
      enter: function() {
        $header.addClass("alt");
      },
      leave: function() {
        $header.removeClass("alt");
        $header.addClass("reveal");
      }
    });
  }

  // Menu.
  $("#menu")
    .append('<a href="#menu" class="close"></a>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right"
    });
})(jQuery);
