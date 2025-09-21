const cursorDot = document.querySelector('.cursor-dot')
const cursorOutline = document.querySelector('.cursor-outline')

window.addEventListener('mousemove', (e) => {
    // console.log(e,"eee")
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" })
})