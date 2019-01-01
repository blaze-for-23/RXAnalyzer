let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

if( menuIcon ){
    menuIcon.addEventListener('click', () => {
        if (nav.style.transform != 'translateX(0%)') {
            nav.style.transform = 'translateX(0%)';
            nav.style.transition = 'transform 0.2s ease-out';
        } else { 
            nav.style.transform = 'translateX(-100%)';
            nav.style.transition = 'transform 0.2s ease-out';
        }
    });
}


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

if( toggleIcon){
    toggleIcon.addEventListener('click', () => {
        if (toggleIcon.className != 'menuIcon toggle') {
            toggleIcon.className += ' toggle';
        } else {
            toggleIcon.className = 'menuIcon';
        }
    });
}


$('#radioBtn a').on('click', function(){
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);
    
    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
})