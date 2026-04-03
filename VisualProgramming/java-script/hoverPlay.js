document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

video.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play();
});