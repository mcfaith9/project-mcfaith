//anchor links
$('.js-anchor-link').click(function(e){
  e.preventDefault();
  var target = $($(this).attr('href'));
  if(target.length){
    var scrollTo = target.offset().top;
    $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
  }
});

// Scroll Button to Top
var scrollTopBtn = $('#scroll-top-button');
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    scrollTopBtn.addClass('show');
  } else {
    scrollTopBtn.removeClass('show');
  }
});
scrollTopBtn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});   