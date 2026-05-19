document.addEventListener("DOMContentLoaded", () => {
    // Animate the hero section background image using GSAP
    // Provides a slow smooth zoom-in effect and subtle horizontal parallax movement
    gsap.to(".hero-section", {
        backgroundSize: "110%",
        backgroundPosition: "55% 50%",
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
});
