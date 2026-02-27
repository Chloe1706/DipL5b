document.addEventListener("DOMContentLoaded", function () {

    const wrapper = document.querySelector('.video-wrapper');
    if (!wrapper) return;

    const video = wrapper.querySelector('.phone-video');
    const button = wrapper.querySelector('.mute-toggle');
    const tooltip = wrapper.querySelector('.tooltip');

    if (!video || !button || !tooltip) return;

    button.addEventListener("click", function (e) {
        e.stopPropagation();

        video.muted = !video.muted;

        if (video.muted) {
            button.innerHTML = '🔇 <span class="tooltip">Click to unmute</span>';
            wrapper.classList.remove("unmuted");
        } else {
            button.innerHTML = '🔊 <span class="tooltip">Click to mute</span>';
            wrapper.classList.add("unmuted");
        }
    });

});