function checkWindowWidth() {
    window.addEventListener('resize', function() {
        if (window.innerWidth > 300 || window.innerWidth < 300 ) {
            location.reload();
        }
    });
}

checkWindowWidth();
