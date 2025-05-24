var map = '';
var center;

function initialize() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(37.769725, -122.462154),
    scrollwheel: false,
    draggable:false
  };

  if(null!=document.getElementById('GoogleMap')) {
    map = new google.maps.Map(document.getElementById('GoogleMap'),  mapOptions);
  
    google.maps.event.addDomListener(map, 'idle', function() {
      calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
    });
  }
}

function calculateCenter() {
  center = map.getCenter();
}

function loadGoogleMap(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&loading=async&' + 'callback=initialize';
  document.body.appendChild(script);
}


/* HTML Document is loaded and DOM is ready.
--------------------------------------------*/
$(document).ready(function(){
  
$("#home").bind("display:block", function(){
    //slider
    alert('test');
    var sudoSlider = $("#slider").sudoSlider({
    effect: "fade",
    pause: 3000,
    auto:true,
    continuous:true
    });
  });
  
  
  //mobilemenu
  $('.mobile').click(function(){
    var $self = $(this);
    $('.menumobile').slideToggle( function(){
      $self.toggleClass('closed');
    });
  });

  //navigation script
  $('.Navigation ul li a').click(function(){
    $('.menumobile').removeAttr("style");
    $('#mobile_sec .mobile').removeClass("closed");
  });

  $('a.slicknav_btn').click(function(){
    $(".mobilemenu ul").css({"display":"block"});
  });

  //tab
  $(".tabLink").each(function(){
    $(this).click(function(){
      tabeId = $(this).attr('id');
      $(".tabLink").removeClass("activeLink");
      $(this).addClass("activeLink");
      $(".tabcontent").addClass("hide");
      $("#"+tabeId+"-1").removeClass("hide");
      return false;
    });
  });
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname)
    {
      var target = $(this.hash),
      headerHeight = $(".primary-header").height() + 5; // Get fixed header height
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length)
      {
        $('html,body').animate({
          scrollTop: target.offset().top + 2
        }, 600);
        return false;
      }
    }
  });	

  //Header Small
  window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 50;
    
    if (distanceY > shrinkOn) {
      $('header').addClass("smaller");
    } else {
      $('header').toggleClass("smaller");
    }
  });
  
  //loadGoogleMap();
$('body').addClass('loaded');
}); 


// Complete page is fully loaded, including all frames, objects and images
//$(window).load(function() {
  // Remove preloader
  // https://ihatetomatoes.net/create-custom-preloading-screen/
  //$('body').addClass('loaded');
//});

