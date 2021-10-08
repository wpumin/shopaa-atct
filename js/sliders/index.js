let slides = document.querySelector('.slider-items').children
let nextSlide = document.querySelector('.right-slide')
let prevSlide = document.querySelector('.left-slide')
let totalSlides = slides.length
let autoSlide = null
let index = 0

function refreshInterval() {
    clearInterval(autoSlide)
    autoSlide = setInterval(() => {
        next('next')
    }, 7500)
}

autoSlide = setInterval(() => {
    next('next')
}, 7500)

nextSlide.onclick = function () {
    next('next')
    refreshInterval()
}
prevSlide.onclick = function () {
    next('prev')
    refreshInterval()
}

function next(direction) {
    if (direction == 'next') {
        index++
        if (index == totalSlides) {
            index = 0
        }
    } else {
        if (index == 0) {
            index = totalSlides - 1
        } else {
            index--
        }
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active')
    }
    slides[index].classList.add('active')
}
