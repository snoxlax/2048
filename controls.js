//Handle pc controls hance arrow keys
document.addEventListener('keyup', (event) => {

    switch (event.code) {
        case "ArrowLeft":
            slideLeft();
            break;
        case "ArrowRight":
            slideRight();
            break;
        case "ArrowUp":
            slideUp();
            break;
        case "ArrowDown":
            slideDown();
            break;
    }
    document.getElementById("score").innerText = score;
})


//Handle Touch screen controls
const area = document.getElementById("board")
area.addEventListener("touchstart", touchStart)

let startX, startY, endX, endY;
let swipeThreshold = 45;
let isTap = true;


function touchStart(e) {
    if (e.type === 'touchstart' && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        area.addEventListener('touchmove', handleSwipe);
        area.addEventListener('touchend', handleSwipeEnd);
        isTap = true;
    }
}

function handleSwipe(moveEvent) {
    isTap = false;
    endX = moveEvent.touches[0].clientX;
    endY = moveEvent.touches[0].clientY;
}

function handleSwipeEnd() {
    if (isTap) {
        return;
    }
    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > swipeThreshold) {
            slideRight();
        } else if (deltaX < -swipeThreshold) {
            slideLeft();
        }
        console.log(startX, startY, endX, endY);
    } else {
        // Vertical swipe
        if (deltaY > swipeThreshold) {
            slideDown();

        } else if (deltaY < -swipeThreshold) {
            slideUp();
        }
        console.log(startX, startY, endX, endY);
    }
    document.getElementById("score").innerText = score;
    // Remove event listeners
    area.removeEventListener('touchmove', handleSwipe);
    area.removeEventListener('touchend', handleSwipeEnd);
}