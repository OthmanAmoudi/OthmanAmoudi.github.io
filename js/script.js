 x = 0;
 y = false;
 z = true;
 var dataNow = new Date();

 var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];

 $(document).ready(function(){
    $('.navbar').hide();
   // $('.alert').hide();
    $( "button" ).hover(
      function() {
        $( this ).addClass( "animated jello" );
       // alert('22');
      }, function() {
        $( this ).removeClass( "animated jello" );
        //alert('33');
      });

      $( ".footlogo" ).hover(
        function() {
          $( this ).addClass( "animated pulse infinite" );
         // alert('22');
        }, function() {
          $( this ).removeClass( "animated pulse infinite" );
          //alert('33');
        });
    

    $(function(){
      $('.typeing').typed({
        strings: [
          'Front-End Developement',
          'Static Websites or Web Pages',
          'iOS/iPhone Development',
          'Swift UX Design/Branding',
          '... And More Very Soon'
        ],
        typeSpeed: 80,
        backDelay: 200,
        loop:true
      })
    })

    $('body').scrollspy({
        target: '.navbar',
        offset: 10
    });

    $('[data-toggle="tooltip"]').tooltip();
    $(window).scroll(function() {

      if ($(document).scrollTop() > 10 ){
        $('.navbar').show();
        
      }
        if ($(document).scrollTop() > 600 ){//&& show === false) {           
            if(y == false){
            y = true;
            // $('.navbar').fadeIn('fast');
            $('.navbar').css('background','rgba(0,0,0,0.7)');
            }
           }

        if ($(document).scrollTop() < 600 ){          
            if(y == true){
            y = false;
            //$('.navbar').fadeOut('fast');
            $('.navbar').css('background','none');
           }

        }
        else if ($(document).scrollTop() > 700 ){ 
            if(z == true){
            loadSkillsBar();
            z = false;
            }
        }
        
      });

      $('.day').append(weekday[dataNow.getDay()]);


});

function loadSkillsBar(){
    var lang = {
        "html": "90%",
        "css": "80%",
        "javascript": "65%",
        "php": "35%",
        "angular": "25%"
      };
      
      var multiply = 4;
      
      $.each( lang, function( language, pourcent) {
      
        var delay = 400;
        
        setTimeout(function() {
          $('#'+language+'-pourcent').html(pourcent);
        },delay*multiply);
        
        multiply++;
      });

      $('.skills-bar-container').append(
        "<style>"+
         "@-webkit-keyframes progress-html{0%{width: 0%;} 100%{ width: 90%;}}"+
          "@-webkit-keyframes progress-css{0%{width: 0%;} 100%{ width: 80%;}}"+
          "@-webkit-keyframes progress-javascript{0%{width: 0%;} 100%{ width: 65%;}}"+
          "@-webkit-keyframes progress-php{0%{width: 0%;} 100%{ width: 35%;}}"+
          "@-webkit-keyframes progress-angular{0%{width: 0%;} 100%{ width: 25%;}}"+
          
          "@-moz-keyframes progress-html{0%{width: 0%;} 100%{ width: 90%;}}"+
          "@-moz-keyframes progress-css{0%{width: 0%;} 100%{ width: 80%;}}"+
          "@-moz-keyframes progress-javascript{0%{width: 0%;} 100%{ width: 65%;}}"+
          "@-moz-keyframes progress-php{0%{width: 0%;} 100%{ width: 35%;}}"+
          "@-moz-keyframes progress-angular{0%{width: 0%;} 100%{ width: 25%;}}"+
          
          "@keyframes progress-html{0%{width: 0%;} 100%{ width: 90%;}}"+
          "@keyframes progress-css{0%{width: 0%;} 100%{ width: 80%;}}"+
          "@keyframes progress-javascript{0%{width: 0%;} 100%{ width: 65%;}}"+
          "@keyframes progress-php{0%{width: 0%;} 100%{ width: 35%;}}"+
          "@keyframes progress-angular{0%{width: 0%;} 100%{ width: 25%;}}"+
        "</style>"
    );
}


// Auto resize input
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

$('input[type="text"], input[type="email"]')
    // event handler
    .keyup(resizeInput)
    // resize on page load
    .each(resizeInput);


console.clear();
// Adapted from georgepapadakis.me/demo/expanding-textarea.html
(function(){
  
  var textareas = document.querySelectorAll('.expanding'),
      
      resize = function(t) {
        t.style.height = 'auto';
        t.style.overflow = 'hidden'; // Ensure scrollbar doesn't interfere with the true height of the text.
        t.style.height = (t.scrollHeight + t.offset ) + 'px';
        t.style.overflow = '';
      },
      
      attachResize = function(t) {
        if ( t ) {
          console.log('t.className',t.className);
          t.offset = !window.opera ? (t.offsetHeight - t.clientHeight) : (t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width')));

          resize(t);

          if ( t.addEventListener ) {
            t.addEventListener('input', function() { resize(t); });
            t.addEventListener('mouseup', function() { resize(t); }); // set height after user resize
          }

          t['attachEvent'] && t.attachEvent('onkeyup', function() { resize(t); });
        }
      };
  
  // IE7 support
  if ( !document.querySelectorAll ) {
  
    function getElementsByClass(searchClass,node,tag) {
      var classElements = new Array();
      node = node || document;
      tag = tag || '*';
      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
          classElements[j] = els[i];
          j++;
        }
      }
      return classElements;
    }
    
    textareas = getElementsByClass('expanding');
  }
  
  for (var i = 0; i < textareas.length; i++ ) {
    attachResize(textareas[i]);
  }
  
})();
