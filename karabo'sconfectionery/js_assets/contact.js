/* Karabo's Confectionery - Contact page
   1. Interactive map (Leaflet) with two locations
   2. Contact form validation and email preparation */

(function ()
{
    'use strict';

    // The email address that receives messages from the contact form
    const RECIPIENT_EMAIL = 'hello@karaboconfectionery.co.za';

    const LOCATIONS = [
        {
            name: 'Main studio \u2013 Polokwane',
            address: '35 Rome Ave, Mahlasedi Park Phase 1, Polokwane',
            lat: -23.8900,
            lng: 29.4500
        },
        {
            name: 'Pickup point \u2013 Polokwane city centre',
            address: 'Polokwane city centre',
            lat: -23.9045,
            lng: 29.4688
        }
    ];

    /* ---------- 1. Interactive map ---------- */
    function initMap()
    {
        const canvas = document.getElementById('map-canvas');
        if (!canvas) { return; }

        // If the Leaflet library did not load (for example, no internet), show a message instead
        if (typeof L === 'undefined')
        {
            canvas.textContent = 'The map could not be loaded. Please check your internet connection.';
            return;
        }

        const map = L.map('map-canvas', { scrollWheelZoom: false });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = [];

        LOCATIONS.forEach(function (place)
        {
            // The popup is built with DOM methods so the text can never be treated as HTML
            const popup = document.createElement('div');

            const title = document.createElement('strong');
            title.textContent = place.name;

            const address = document.createElement('p');
            address.textContent = place.address;

            const directions = document.createElement('a');
            directions.href = 'https://www.google.com/maps/dir/?api=1&destination=' + place.lat + ',' + place.lng;
            directions.target = '_blank';
            directions.rel = 'noopener noreferrer';
            directions.textContent = 'Get directions';

            popup.append(title, address, directions);

            L.marker([place.lat, place.lng]).addTo(map).bindPopup(popup);
            points.push([place.lat, place.lng]);
        });

        // Zoom the map so both markers are visible
        map.fitBounds(points, { padding: [50, 50] });

        // Scroll-wheel zoom is switched on once the map is clicked, so page scrolling is not blocked
        map.on('click', function () { map.scrollWheelZoom.enable(); });
    }

    /* ---------- 2. Contact form ---------- */
    const form = document.getElementById('message-form');

    function initForm()
    {
        if (!form) { return; }

        function byId(id) { return document.getElementById(id); }

        const nameInput = byId('contact-name');
        const emailInput = byId('contact-email');
        const phoneInput = byId('contact-phone');
        const typeSelect = byId('message-type');
        const messageInput = byId('contact-message');
        const preview = byId('email-preview');

        // Each rule returns an error message, or '' when the value is fine
        const validators = {
            'contact-name': function (value)
            {
                if (value === '') { return 'Please enter your full name.'; }
                if (value.length < 2 || value.length > 60) { return 'Your name must be between 2 and 60 characters.'; }
                if (!KC.isValidName(value)) { return 'Names can only contain letters, spaces, hyphens and apostrophes.'; }
                return '';
            },
            'contact-email': function (value)
            {
                if (value === '') { return 'Please enter your email address.'; }
                if (!KC.emailPattern.test(value)) { return 'Enter a valid email address, for example name@example.com.'; }
                return '';
            },
            'contact-phone': function (value)
            {
                if (value === '') { return ''; }   // optional field
                if (!KC.isValidPhone(value)) { return 'Enter a valid South African number, for example 069 516 8683 or +27 69 516 8683.'; }
                return '';
            },
            'message-type': function (value)
            {
                return value === '' ? 'Please choose the type of message.' : '';
            },
            'contact-message': function (value)
            {
                if (value === '') { return 'Please type your message.'; }
                if (value.length < 10) { return 'Please write at least 10 characters.'; }
                if (value.length > 1000) { return 'Your message is too long. Please keep it under 1000 characters.'; }
                return '';
            }
        };

        function validateField(input)
        {
            const message = validators[input.id](input.value.trim());
            KC.setFieldState(input, message);
            return message === '';
        }

        // Validate when the user leaves a field, and re-check while fixing an error
        [nameInput, emailInput, phoneInput, typeSelect, messageInput].forEach(function (field)
        {
            field.addEventListener('blur', function () { validateField(field); });
            field.addEventListener('input', function ()
            {
                if (field.classList.contains('invalid')) { validateField(field); }
            });
        });

        // Compiles the validated form into an email the visitor can send
        function prepareEmail()
        {
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim() === '' ? 'Not provided' : phoneInput.value.trim();
            const type = typeSelect.value;

            const subject = type + ' from ' + name;
            const body = [
                'Hello Karabo\'s Confectionery,',
                '',
                messageInput.value.trim(),
                '',
                '---',
                'Message type: ' + type,
                'Name: ' + name,
                'Email: ' + emailInput.value.trim(),
                'Phone: ' + phone
            ].join('\n');

            byId('preview-to').textContent = RECIPIENT_EMAIL;
            byId('preview-subject').textContent = subject;
            byId('preview-body').textContent = body;

            // mailto: opens the visitor's own email app with everything filled in
            byId('send-email-link').href = 'mailto:' + RECIPIENT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            form.hidden = true;
            preview.hidden = false;
            byId('preview-heading').focus();
        }

        form.addEventListener('submit', function (event)
        {
            event.preventDefault();

            let firstInvalid = null;
            [nameInput, emailInput, phoneInput, typeSelect, messageInput].forEach(function (field)
            {
                if (!validateField(field) && firstInvalid === null) { firstInvalid = field; }
            });

            if (firstInvalid !== null)
            {
                firstInvalid.focus();
                return;
            }

            prepareEmail();
        });

        // "Edit message" goes back to the form with the text still filled in
        byId('edit-message').addEventListener('click', function ()
        {
            preview.hidden = true;
            form.hidden = false;
            messageInput.focus();
        });

        KC.attachCounter(messageInput, byId('contact-message-hint'), 1000);
    }

    initMap();
    initForm();
})();