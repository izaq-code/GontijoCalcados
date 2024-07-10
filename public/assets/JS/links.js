function checkWindowWidth() {
    let reloadDone495 = false; 
    let reloadDone600 = false; 
    let resizeTimer; 

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer); 

        resizeTimer = setTimeout(function() {
            console.log('Width:', window.innerWidth); 

            if (window.innerWidth < 495 && !reloadDone495) {
                reloadDone495 = true; 
                location.reload(); 
            }

            if (window.innerWidth > 600 && window.innerWidth <= 610 && !reloadDone600) {
                reloadDone600 = true; 
                location.reload(); 
            }

            if (window.innerWidth > 730 && window.innerWidth <= 740 && !reloadDone600) {
                reloadDone600 = true; 
                location.reload(); 
            }

            if (window.innerWidth > 1910 && window.innerWidth <= 2000 && !reloadDone600) {
                reloadDone600 = true; 
                location.reload(); 
            }
        }, ); 
    });
}

checkWindowWidth();
