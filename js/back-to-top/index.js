const backToTopButton = document.getElementById('back-to-top')

window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
    ) {
        backToTopButton.style.opacity = 1
    } else {
        backToTopButton.style.opacity = 0
    }
}

backToTopButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
