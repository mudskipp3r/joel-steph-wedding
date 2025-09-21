gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.mwg_effect031',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const slides = document.querySelectorAll('.mwg_effect031 .slide')

    slides.forEach(slide => {
        const contentWrapper = slide.querySelector('.content-wrapper')
        const content = slide.querySelector('.content')

        gsap.to(content, {
            rotationZ: (Math.random() - 0.5) * 10, // RotationZ between -5 and 5 degrees
            scale: 0.7, // Slight reduction of the content
            rotationX: 40,
            ease: 'power1.in', // Starts gradually
            scrollTrigger: {
                pin: contentWrapper, // contentWrapper is pinned during the animation
                trigger: slide, // Listens to the slide’s position
                start: 'top 0%', // Starts when its top reaches the top of the viewport
                end: '+=' + window.innerHeight, // Ends 100vh later
                scrub: true // Progresses with the scroll
            }
        })

        gsap.to(content, {
            autoAlpha: 0, // Ends at opacity: 0 and visibility: hidden
            ease: 'power1.in', // Starts gradually
            scrollTrigger: {
                trigger: content, // Listens to the position of content
                start: 'top -80%', // Starts when the top exceeds 80% of the viewport
                end: '+=' + 0.2 * window.innerHeight, // Ends 20% later
                scrub: true // Progresses with the scroll
            }
        })
    })
})