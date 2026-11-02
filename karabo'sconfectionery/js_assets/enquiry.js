/* Karabo's Confectionery - Enquiry form
   Validates the form, then shows an estimated cost and availability. */

(function ()
{
    'use strict';

    const form = document.getElementById('enquiry-form');
    if (!form) { return; }

    // ----- Pricing and notice periods -----
    // Biscuit prices by variety and tub size (litres)
    const BISCUIT_PRICES = 
    {
        'Romany creams': 
        { 
            5: 300, 
            10: 550, 
            20: 850 
        },
        'Ginger biscuits': 
        { 
            5: 300, 
            10: 550, 
            20: 700 
        },
        'Peanut butter cornflakes': 
        { 
            5: 300, 
            10: 550 
        },
        'Plain biscuits': 
        { 
            5: 300, 
            10: 500, 
            20: 700 
        },
        'Mixed biscuits': 
        { 
            5: 400, 
            10: 600, 
            20: 800 
        }
    };

    function biscuitOptions()
    {
        const options = [];
        Object.keys(BISCUIT_PRICES).forEach(function (variety)
        {
            Object.keys(BISCUIT_PRICES[variety]).forEach(function (size)
            {
                options.push({ label: variety + ' \u2013 ' + size + 'L', price: BISCUIT_PRICES[variety][size] });
            });
        });
        return options;
    }

    const PRICING = {
        cakes: 
        {
            name: 'Cake',
            leadDays: 7,
            options: [
                { label: 'Small cake (serves up to 10)', price: 550, serves: 10 },
                { label: 'Medium cake (serves up to 20)', price: 800, serves: 20 },
                { label: 'Large cake (serves up to 30)', price: 1050, serves: 30 }
            ]
        },
        cupcakes: 
        {
            name: 'Cupcakes',
            leadDays: 3,
            options: [
                { label: '6 cupcakes', price: 120 },
                { label: '12 cupcakes', price: 240 }
            ]
        },
        muffins: 
        {
            name: 'Muffins',
            leadDays: 3,
            options: [
                { label: '5L tub', price: 300 },
                { label: '10L tub', price: 550 },
                { label: '20L tub', price: 700 }
            ]
        },
        biscuits: 
        {
            name: 'Biscuits',
            leadDays: 3,
            options: biscuitOptions()
        },
        scones: 
        {
            name: 'Scones',
            leadDays: 3,
            options: [
                { label: '5L tub', price: 300 },
                { label: '10L tub', price: 450 },
                { label: '20L tub', price: 580 }
            ]
        },
        other: 
        {
            name: 'Snowballs, buns, rusks or cinnamon rolls',
            leadDays: 3,
            options: []
        }
    };

    // ----- Page elements -----
    function byId(id) { return document.getElementById(id); }

    const nameInput = byId('full-name');
    const emailInput = byId('email');
    const phoneInput = byId('phone');
    const dateInput = byId('event-date');
    const productSelect = byId('product-type');
    const optionSelect = byId('product-option');
    const quantityInput = byId('quantity');
    const guestInput = byId('guest-count');
    const messageInput = byId('message');
    const optionFields = byId('option-fields');
    const responseBox = byId('enquiry-response');

    // ----- Date helpers (all dates are handled in local time) -----
    function startOfToday()
    {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    function parseLocalDate(value)
    {
        const parts = value.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function toIsoDate(date)
    {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return date.getFullYear() + '-' + month + '-' + day;
    }

    // The date picker only allows today up to one year ahead
    const today = startOfToday();
    const lastDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    dateInput.min = toIsoDate(today);
    dateInput.max = toIsoDate(lastDate);

    // ----- Validation rules: each returns an error message, or '' when the value is fine -----
    const validators = {
        'full-name': function (value)
        {
            if (value === '') { return 'Please enter your full name.'; }
            if (value.length < 2 || value.length > 60) { return 'Your name must be between 2 and 60 characters.'; }
            if (!KC.isValidName(value)) { return 'Names can only contain letters, spaces, hyphens and apostrophes.'; }
            return '';
        },
        'email': function (value)
        {
            if (value === '') { return 'Please enter your email address.'; }
            if (!KC.emailPattern.test(value)) { return 'Enter a valid email address, for example name@example.com.'; }
            return '';
        },
        'phone': function (value)
        {
            if (value === '') { return 'Please enter your phone number.'; }
            if (!KC.isValidPhone(value)) { return 'Enter a valid South African number, for example 069 516 8683 or +27 69 516 8683.'; }
            return '';
        },
        'event-date': function (value)
        {
            if (value === '') { return 'Please choose your event date.'; }

            const date = parseLocalDate(value);
            if (isNaN(date.getTime())) { return 'Enter a valid date.'; }
            if (date < today) { return 'The event date cannot be in the past.'; }
            if (date > lastDate) { return 'Please choose a date within the next 12 months.'; }
            return '';
        },
        'product-type': function (value)
        {
            return value === '' ? 'Please choose what you are enquiring about.' : '';
        },
        'product-option': function (value)
        {
            return value === '' ? 'Please choose a size or option.' : '';
        },
        'quantity': function (value)
        {
            const number = Number(value);
            if (value === '') { return 'Please enter a quantity.'; }
            if (!Number.isInteger(number) || number < 1 || number > 50) { return 'Quantity must be a whole number from 1 to 50.'; }
            return '';
        },
        'guest-count': function (value)
        {
            if (value === '') { return ''; }   // optional field
            const number = Number(value);
            if (!Number.isInteger(number) || number < 1 || number > 500) { return 'Guests must be a whole number from 1 to 500.'; }
            return '';
        },
        'message': function (value)
        {
            if (value === '') { return 'Please tell us about your order.'; }
            if (value.length < 10) { return 'Please write at least 10 characters so we understand your order.'; }
            if (value.length > 500) { return 'Your message is too long. Please keep it under 500 characters.'; }
            return '';
        }
    };

    // Validates one field and shows its message
    function validateField(input)
    {
        const message = validators[input.id](input.value.trim());
        KC.setFieldState(input, message);
        return message === '';
    }

    // Fields that must be checked right now (size and quantity only count for priced products)
    function activeFields()
    {
        const fields = [nameInput, emailInput, phoneInput, dateInput, productSelect, guestInput, messageInput];

        if (!optionFields.hidden)
        {
            fields.splice(5, 0, optionSelect, quantityInput);
        }
        return fields;
    }

    // ----- Size / option drop-down -----
    function buildOptions()
    {
        const config = PRICING[productSelect.value];
        optionSelect.textContent = '';

        if (!config || config.options.length === 0)
        {
            optionFields.hidden = true;
            return;
        }

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a size or option\u2026';
        optionSelect.appendChild(placeholder);

        config.options.forEach(function (option, index)
        {
            const item = document.createElement('option');
            item.value = String(index);
            item.textContent = option.label + ' \u2013 R' + option.price;
            optionSelect.appendChild(item);
        });

        optionFields.hidden = false;
    }

    // ----- Building the response -----
    function buildResult()
    {
        const config = PRICING[productSelect.value];
        const eventDate = parseLocalDate(dateInput.value);
        const daysAway = Math.round((eventDate - today) / 86400000);
        const guests = guestInput.value.trim() === '' ? 0 : Number(guestInput.value);

        const result = {
            item: config.name,
            quantity: 'To be confirmed',
            cost: 'Quote on request. We will price your order after we hear the details.',
            note: 'Final prices depend on flavour, design and any extras.'
        };

        if (config.options.length > 0)
        {
            const option = config.options[Number(optionSelect.value)];
            const quantity = Number(quantityInput.value);

            result.item = config.name + ' \u2013 ' + option.label;
            result.quantity = String(quantity);
            result.cost = 'R' + (option.price * quantity) + ' (R' + option.price + ' each)';

            if (option.serves && guests > option.serves * quantity)
            {
                result.note = 'You mentioned ' + guests + ' guests, but this option serves up to ' +
                    (option.serves * quantity) + '. Consider a larger size. Final prices depend on flavour, design and any extras.';
            }
        }

        if (daysAway >= config.leadDays)
        {
            result.availability = 'Available. We need ' + config.leadDays + ' days notice and your date is ' + daysAway + ' days away.';
        }
        else
        {
            result.availability = 'Short notice. We normally need ' + config.leadDays +
                ' days. Please call 069 516 8683 so we can check if we can fit you in.';
        }

        result.date = eventDate.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        return result;
    }

    function showResponse()
    {
        const result = buildResult();
        const firstName = nameInput.value.trim().split(/\s+/)[0];

        byId('response-heading').textContent = 'Thank you, ' + firstName + '!';
        byId('res-item').textContent = result.item;
        byId('res-quantity').textContent = result.quantity;
        byId('res-cost').textContent = result.cost;
        byId('res-date').textContent = result.date;
        byId('res-availability').textContent = result.availability;
        byId('res-email').textContent = emailInput.value.trim();
        byId('res-note').textContent = result.note + ' We will email you within 2 business days to confirm your order.';

        form.hidden = true;
        responseBox.hidden = false;
        byId('response-heading').focus();
    }

    // ----- Events -----

    // Validates each field when the user leaves it, and re-check while fixing an error
    Array.from(form.elements).forEach(function (element)
    {
        if (!validators[element.id]) { return; }

        element.addEventListener('blur', function () { validateField(element); });
        element.addEventListener('input', function ()
        {
            if (element.classList.contains('invalid')) { validateField(element); }
        });
    });

    productSelect.addEventListener('change', function ()
    {
        buildOptions();
        validateField(productSelect);
    });

    form.addEventListener('submit', function (event)
    {
        event.preventDefault();

        let firstInvalid = null;
        activeFields().forEach(function (field)
        {
            if (!validateField(field) && firstInvalid === null) { firstInvalid = field; }
        });

        if (firstInvalid !== null)
        {
            firstInvalid.focus();
            return;
        }

        showResponse();
    });

    byId('new-enquiry').addEventListener('click', function ()
    {
        form.reset();
        KC.clearFormState(form);
        buildOptions();
        byId('message-hint').textContent = '0 / 500 characters';
        responseBox.hidden = true;
        form.hidden = false;
        nameInput.focus();
    });

    KC.attachCounter(messageInput, byId('message-hint'), 500);

    // Arriving from a "Enquire about..." button on the Services page pre-selects the product
    const preset = new URLSearchParams(window.location.search).get('product');
    if (preset && PRICING[preset])
    {
        productSelect.value = preset;
        buildOptions();
    }
})();