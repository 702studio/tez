document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.getElementById('intro-animation-container');
    const mainContent = document.getElementById('main-content');

    if (!introContainer || !mainContent) {
        console.error('Required elements for intro animation or main content are missing.');
        if (mainContent) mainContent.style.display = 'block'; // Show content if intro fails
        return;
    }

    const animationSequence = [
        { text: 'yedi', duration: 1000, delay: 100 },
        { text: '0', duration: 800, delay: 100 },
        { text: '2', duration: 800, delay: 100 },
        { text: '702', duration: 1000, delay: 100 },
        { text: '702.studio', duration: 1500, delay: 100, hasBlinkingDot: true },
        { text: 'Coming Soon', duration: 2000, delay: 500 }
    ];

    let currentSequenceIndex = 0;

    function runNextAnimation() {
        if (currentSequenceIndex >= animationSequence.length) {
            // End of intro animation
            anime({
                targets: introContainer,
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    introContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '1'; // Ensure parent is visible before children animate
                    // Trigger content reveal animation (to be implemented in a later step)
                    if (typeof animateContentReveal === 'function') {
                        animateContentReveal();
                    }
                }
            });
            return;
        }

        const currentItem = animationSequence[currentSequenceIndex];
        introContainer.innerHTML = ''; // Clear previous text

        // Create spans for each character for character-based animation
        const textWrapper = document.createElement('div');
        textWrapper.style.display = 'inline-block'; // Keep characters together

        currentItem.text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = 0;
            if (char === '.' && currentItem.hasBlinkingDot) {
                charSpan.classList.add('blinking-dot');
            }
            textWrapper.appendChild(charSpan);
        });
        introContainer.appendChild(textWrapper);

        // Animate characters
        anime.timeline({
            easing: 'easeOutExpo',
            duration: currentItem.duration,
            complete: () => {
                setTimeout(() => {
                    // Before starting next, fade out current characters
                    anime({
                        targets: textWrapper.childNodes,
                        opacity: 0,
                        duration: 300, // Quick fade out
                        delay: anime.stagger(50, {from: 'center'}),
                        easing: 'easeInExpo',
                        complete: () => {
                           currentSequenceIndex++;
                           runNextAnimation();
                        }
                    });
                }, currentItem.delay + 500); // Keep text visible for a bit longer than its animation
            }
        })
        .add({
            targets: textWrapper.childNodes,
            opacity: [0, 1],
            translateY: [20, 0], // Example: slide up effect
            delay: anime.stagger(70, {from: 'center'}), // Stagger appearance
        });

        // Blinking dot for '702.studio'
        if (currentItem.hasBlinkingDot) {
            const dot = introContainer.querySelector('.blinking-dot');
            if (dot) {
                anime({
                    targets: dot,
                    opacity: [
                        { value: 1, duration: 0 }, // Ensure it's visible initially with other chars
                        { value: 0, duration: 500 },
                        { value: 1, duration: 500 },
                    ],
                    loop: true,
                    easing: 'linear',
                    delay: anime.stagger(70, {from: 'center'}) // Start blinking after it appears
                });
            }
        }
    }

    // Start the animation sequence
    runNextAnimation();

    // Refined toggle for description with Anime.js
    const descriptionToggle = document.querySelector('.description-toggle');
    const descriptionContent = document.querySelector('.description-content');
    const descriptionToggleIcon = descriptionToggle ? descriptionToggle.querySelector('span') : null;

    if (descriptionToggle && descriptionContent && descriptionToggleIcon) {
        // Set initial state for animation (content starts hidden, so height is 0)
        descriptionContent.style.display = 'block'; // Keep it in the flow but visually hidden
        descriptionContent.style.overflow = 'hidden';
        descriptionContent.style.height = '0';
        descriptionContent.style.opacity = '0';

        let isDescriptionExpanded = false;

        const toggleDescription = () => {
            isDescriptionExpanded = !isDescriptionExpanded;
            descriptionToggleIcon.textContent = isDescriptionExpanded ? '▲' : '▼';

            anime.remove(descriptionContent); // Remove any ongoing animations on the content

            if (isDescriptionExpanded) {
                anime({
                    targets: descriptionContent,
                    height: [0, descriptionContent.scrollHeight],
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutQuad',
                    begin: () => {
                        descriptionContent.style.display = 'block';
                    }
                });
            } else {
                anime({
                    targets: descriptionContent,
                    height: 0,
                    opacity: 0,
                    duration: 400,
                    easing: 'easeInQuad',
                });
            }
        };

        descriptionToggle.addEventListener('click', toggleDescription);
        descriptionToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent space from scrolling the page
                toggleDescription();
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm && newsletterEmailInput && newsletterMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmailInput.value.trim();
            newsletterMessage.textContent = '';
            newsletterMessage.className = ''; // Clear previous classes

            if (!isValidEmail(email)) {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.className = 'error';
                return;
            }
            // Placeholder for actual submission logic
            console.log('Newsletter email submitted:', email);
            newsletterMessage.textContent = `Thank you for subscribing, ${email}! (Demo submission)`;
            newsletterMessage.className = 'success';
            newsletterForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactEmailInput = document.getElementById('contact-email');
    const contactMessageTextarea = document.getElementById('contact-message');
    const contactSpamCheckbox = document.getElementById('is-human');
    const contactMessageStatus = document.getElementById('contact-message-status');

    if (contactForm && contactNameInput && contactEmailInput && contactMessageTextarea && contactSpamCheckbox && contactMessageStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactMessageStatus.textContent = '';
            contactMessageStatus.className = ''; // Clear previous classes

            const name = contactNameInput.value.trim();
            const email = contactEmailInput.value.trim();
            const message = contactMessageTextarea.value.trim();
            const isHuman = contactSpamCheckbox.checked;

            if (!name) {
                displayContactError('Name is required.'); return;
            }
            if (!isValidEmail(email)) {
                displayContactError('Please enter a valid email address.'); return;
            }
            if (!message) {
                displayContactError('Message is required.'); return;
            }
            if (!isHuman) {
                displayContactError('Please confirm you are not a robot.'); return;
            }

            // Placeholder for actual submission logic
            console.log('Contact form submitted:', { name, email, message });
            contactMessageStatus.textContent = 'Message sent successfully! (Demo submission)';
            contactMessageStatus.className = 'success';
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayContactError(message) {
        if(contactMessageStatus) {
            contactMessageStatus.textContent = message;
            contactMessageStatus.className = 'error';
        }
    }
});

function animateContentReveal() {
    const mainContent = document.getElementById('main-content');
    const header = mainContent ? mainContent.querySelector('header.col-span-10') : null;
    const descriptionSection = document.getElementById('description-section'); // col-span-5
    const interactiveSection = document.getElementById('interactive-section'); // col-span-5

    if (!mainContent || !header || !descriptionSection || !interactiveSection) {
        console.error('One or more main content sections are missing for reveal animation.');
        if (mainContent) mainContent.style.display = 'block'; // Fallback: just show main content
        return;
    }

    // Ensure mainContent itself is visible (its opacity is handled by intro animation fade out of introContainer)
    // Or, if introContainer directly fades to mainContent, mainContent should start at opacity 1.
    // Let's assume mainContent is made display:block and opacity:1 by the end of intro.
    // The children will be animated.

    // Set initial states for children sections for animation
    [header, descriptionSection, interactiveSection].forEach(el => {
        el.style.opacity = 0;
        // el.style.transform = 'translateX(-20px)'; // Optional: common starting point for slide-in
    });

    // Ensure mainContent is displayed
    mainContent.style.display = 'block';
    mainContent.style.opacity = 1; // Parent container is now fully visible.

    anime.timeline({
        easing: 'easeOutExpo',
        delay: 100, // Small delay after intro finishes
    })
    .add({
        targets: header,
        opacity: [0, 1],
        translateY: [20, 0], // Slide up and fade in
        duration: 600,
    })
    .add({
        targets: descriptionSection,
        opacity: [0, 1],
        translateX: [-30, 0], // Slide from left and fade in
        duration: 500,
    }, '-=300') // Overlap with header animation slightly
    .add({
        targets: interactiveSection,
        opacity: [0, 1],
        translateX: [-30, 0], // Slide from left and fade in (or use translateX: [30,0] for slide from right effect if preferred for the right column)
        // For "left-to-right" feel, having both description and interactive slide from left can work if they appear sequentially.
        duration: 500,
    }, '-=300'); // Overlap with description animation
}
