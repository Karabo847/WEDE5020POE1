/* Karabo's Confectionery - shared scripts (loaded on every page)
   1. Scroll-reveal animation
   2. FAQ accordion
   3. Gallery lightbox
   4. Shared form-validation helpers (window.KC)
   Accordion pattern based on W3C (2026a); dialog pattern based on W3C (2026b). */

'use strict';

// Tells the CSS that JavaScript is running, so content is only hidden when it can be revealed
document.documentElement.classList.add('js');

/* ---------- 1. Scroll-reveal animation ---------- */
(function initReveal()
{
    const items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window))
    {
        items.forEach(function (item) { item.classList.add('visible'); });
        return;
    }

    const observer = new IntersectionObserver(function (entries)
    {
        entries.forEach(function (entry)
        {
            if (entry.isIntersecting)
            {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(function (item) { observer.observe(item); });
})();

/* ---------- 2. FAQ accordion (one panel open at a time) ---------- */
(function initAccordion()
{
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach(function (trigger)
    {
        trigger.addEventListener('click', function ()
        {
            const willOpen = trigger.getAttribute('aria-expanded') === 'false';

            // Close every panel first
            triggers.forEach(function (other)
            {
                other.setAttribute('aria-expanded', 'false');
                document.getElementById(other.getAttribute('aria-controls')).classList.remove('open');
            });

            // Then open the clicked one
            if (willOpen)
            {
                trigger.setAttribute('aria-expanded', 'true');
                document.getElementById(trigger.getAttribute('aria-controls')).classList.add('open');
            }
        });
    });
})();

/* ---------- 3. Gallery lightbox ---------- */
(function initLightbox()
{
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    if (items.length === 0) { return; }

    let current = 0;
    let lastFocused = null;

    // Building the lightbox with DOM methods
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.hidden = true;

    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');
    figure.appendChild(image);
    figure.appendChild(caption);

    function makeButton(className, label, symbol)
    {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'lightbox-btn ' + className;
        button.setAttribute('aria-label', label);
        button.textContent = symbol;
        return button;
    }

    const closeButton = makeButton('lightbox-close', 'Close image viewer', '\u00D7');
    const prevButton = makeButton('lightbox-prev', 'Previous image', '\u2039');
    const nextButton = makeButton('lightbox-next', 'Next image', '\u203A');

    overlay.append(closeButton, prevButton, figure, nextButton);
    document.body.appendChild(overlay);

    function show(index)
    {
        current = (index + items.length) % items.length;
        const link = items[current];
        const thumb = link.querySelector('img');
        image.src = link.getAttribute('href');
        image.alt = thumb ? thumb.alt : '';
        caption.textContent = (link.dataset.caption || image.alt) + '  (' + (current + 1) + ' of ' + items.length + ')';
    }

    function open(index)
    {
        lastFocused = document.activeElement;
        show(index);
        overlay.hidden = false;
        document.body.classList.add('no-scroll');
        closeButton.focus();
    }

    function close()
    {
        overlay.hidden = true;
        document.body.classList.remove('no-scroll');
        if (lastFocused) { lastFocused.focus(); }
    }

    items.forEach(function (link, index)
    {
        link.addEventListener('click', function (event)
        {
            event.preventDefault();
            open(index);
        });
    });

    closeButton.addEventListener('click', close);
    prevButton.addEventListener('click', function () { show(current - 1); });
    nextButton.addEventListener('click', function () { show(current + 1); });

    // Clicking the dark area outside the picture closes the viewer
    overlay.addEventListener('click', function (event)
    {
        if (event.target === overlay) { close(); }
    });

    // Keyboard support: Esc closes, arrows move, Tab stays inside the viewer
    document.addEventListener('keydown', function (event)
    {
        if (overlay.hidden) { return; }

        if (event.key === 'Escape') { close(); }
        else if (event.key === 'ArrowLeft') { show(current - 1); }
        else if (event.key === 'ArrowRight') { show(current + 1); }
        else if (event.key === 'Tab')
        {
            const focusable = [closeButton, prevButton, nextButton];
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first)
            {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last)
            {
                event.preventDefault();
                first.focus();
            }
        }
    });
})();

/* ---------- 4. Shared form-validation helpers ---------- */
window.KC = {
    // Simple email format: something@something.tld
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

    // South African numbers: 0 or +27 followed by 9 digits (spaces, dashes and brackets are ignored)
    isValidPhone: function (value)
    {
        return /^(\+27|0)\d{9}$/.test(value.replace(/[\s\-()]/g, ''));
    },

    // Letters (including accents), spaces, hyphens and apostrophes
    isValidName: function (value)
    {
        return /^[A-Za-z\u00C0-\u00FF' -]+$/.test(value);
    },

    // Shows or clears the error message under a field and styles the field
    setFieldState: function (input, message)
    {
        const errorBox = document.getElementById(input.id + '-error');

        if (errorBox) { errorBox.textContent = message; }

        input.classList.toggle('invalid', message !== '');
        input.classList.toggle('valid', message === '' && input.value.trim() !== '');
        input.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
    },

    // Removes all validation styling and messages from a form
    clearFormState: function (form)
    {
        Array.from(form.elements).forEach(function (element)
        {
            if (!element.id) { return; }

            element.classList.remove('valid', 'invalid');
            element.removeAttribute('aria-invalid');

            const errorBox = document.getElementById(element.id + '-error');
            if (errorBox) { errorBox.textContent = ''; }
        });
    },

    // Keeps the "x / max characters" hint under a textarea up to date
    attachCounter: function (textarea, hint, max)
    {
        function update() { hint.textContent = textarea.value.length + ' / ' + max + ' characters'; }
        textarea.addEventListener('input', update);
        update();
    }
};