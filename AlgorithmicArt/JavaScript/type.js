// BLUE
const target = document.querySelector('.typing-target');
if (target) {
    const cursor = document.querySelector('.cursor1');
    const text = target.getAttribute('data-text');
    let index = 0;
    let typing = false;

    function type() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(type, 80);
        } else {
            cursor.style.animation = 'blink 0.9s steps(1, end) infinite';
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typing) {
                typing = true;
                cursor.style.animation = 'none';
                type();
            }
        });
    }, {
        rootMargin: "0px 0px -10% 0px"
    });

    observer.observe(target);

    // manual check in case element is already visible
    if (target.getBoundingClientRect().top < window.innerHeight && !typing) {
        typing = true;
        cursor.style.animation = 'none';
        type();
    }
}


// YELLOW
const targetYellow = document.querySelector('.typing-target-yellow');
if (targetYellow) {
    const cursorYellow = document.querySelector('.cursor-yellow');
    const textYellow = targetYellow.getAttribute('data-text');
    let indexYellow = 0;
    let typingYellow = false;

    function typeYellow() {
        if (indexYellow < textYellow.length) {
            targetYellow.textContent += textYellow.charAt(indexYellow);
            indexYellow++;
            setTimeout(typeYellow, 80);
        } else {
            cursorYellow.style.animation = 'blink 0.9s steps(1, end) infinite';
        }
    }

    const observerYellow = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingYellow) {
                typingYellow = true;
                cursorYellow.style.animation = 'none';
                typeYellow();
            }
        });
    }, {
        rootMargin: "0px 0px -10% 0px"
    });

    observerYellow.observe(targetYellow);

    // manual check in case element is already visible
    if (targetYellow.getBoundingClientRect().top < window.innerHeight && !typingYellow) {
        typingYellow = true;
        cursorYellow.style.animation = 'none';
        typeYellow();
    }
}


// QUOTE
const targetQuote = document.querySelector('.typing-target-quote');
if (targetQuote) {
    const cursorQuote = document.querySelector('.cursor-quote');
    const textQuote = targetQuote.getAttribute('data-text');
    let indexQuote = 0;
    let typingQuote = false;

    function typeQuote() {
        if (indexQuote < textQuote.length) {
            targetQuote.textContent += textQuote.charAt(indexQuote);
            indexQuote++;
            setTimeout(typeQuote, 80);
        } else {
            cursorQuote.style.animation = 'blink 0.9s steps(1, end) infinite';
            document.querySelector('.quote-author').style.display = 'block';
        }
    }

    const observerQuote = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingQuote) {
                typingQuote = true;
                cursorQuote.style.animation = 'none';
                typeQuote();
            }
        });
    }, {
        rootMargin: "0px 0px -10% 0px"
    });

    observerQuote.observe(targetQuote);

    // manual check in case element is already visible
    if (targetQuote.getBoundingClientRect().top < window.innerHeight && !typingQuote) {
        typingQuote = true;
        cursorQuote.style.animation = 'none';
        typeQuote();
    }
}


// WHITE SERIF ON BLUE 
const targetWhite = document.querySelector('.typing-target-white');
if (targetWhite) {
    const cursorWhite = document.querySelector('.cursor-white');
    const textWhite = targetWhite.getAttribute('data-text');
    let indexWhite = 0;
    let typingWhite = false;

    function typeWhite() {
        if (indexWhite < textWhite.length) {
            targetWhite.textContent += textWhite.charAt(indexWhite);
            indexWhite++;
            setTimeout(typeWhite, 80);
        } else {
            cursorWhite.style.animation = 'blink 0.9s steps(1, end) infinite';
            //document.querySelector('.quote-author').style.display = 'block';
        }
    }

    const observerWhite = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingWhite) {
                typingWhite = true;
                cursorWhite.style.animation = 'none';
                typeWhite();
            }
        });
    }, {
        rootMargin: "0px 0px -10% 0px"
    });

    observerWhite.observe(targetWhite);

    // manual check in case element is already visible
    if (targetWhite.getBoundingClientRect().top < window.innerHeight && !typingWhite) {
        typingWhite = true;
        cursorWhite.style.animation = 'none';
        typeWhite();
    }
}

