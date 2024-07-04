
function checkWindowWidth() {
    if (window.innerWidth <= 500) {
       
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1000) {
                location.reload(); 
            }
            if (window.innerWidth < 600) {
                location.reload(); 
            }
        });
    }
}

checkWindowWidth();
