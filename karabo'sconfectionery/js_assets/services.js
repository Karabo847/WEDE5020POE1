/* Karabo's Confectionery - Services page
   Builds the product cards with JavaScript and adds search, category filter and sorting. */

(function ()
{
    'use strict';

    // ----- Product data -----
    const PRODUCTS = [
        {
            id: 'muffins',
            name: 'Muffins',
            category: 'Muffins & scones',
            description: 'Flavours: chocolate, vanilla, caramel choc chips, blueberry, bran, pineapple, and more.',
            images: [{ src: '_images/homemade-muffins.jpg', alt: 'Freshly baked bran muffins' }],
            options: [
                { label: '5L', price: 300 },
                { label: '10L', price: 550 },
                { label: '20L', price: 700 }
            ]
        },
        {
            id: 'biscuits',
            name: 'Biscuits',
            category: 'Biscuits',
            description: 'Available in Romany creams, ginger, peanut butter cornflakes, plain, and mixed varieties.',
            images: [{ src: '_images/homemade-biscuits.jpg', alt: 'Tray of freshly baked biscuits' }],
            options: [
                { group: 'Romany creams', label: '5L', price: 300 },
                { group: 'Romany creams', label: '10L', price: 550 },
                { group: 'Romany creams', label: '20L', price: 850 },
                { group: 'Ginger biscuits', label: '5L', price: 300 },
                { group: 'Ginger biscuits', label: '10L', price: 550 },
                { group: 'Ginger biscuits', label: '20L', price: 700 },
                { group: 'Peanut butter cornflakes', label: '5L', price: 300 },
                { group: 'Peanut butter cornflakes', label: '10L', price: 550 },
                { group: 'Plain biscuits', label: '5L', price: 300 },
                { group: 'Plain biscuits', label: '10L', price: 500 },
                { group: 'Plain biscuits', label: '20L', price: 700 },
                { group: 'Mixed biscuits', label: '5L', price: 400 },
                { group: 'Mixed biscuits', label: '10L', price: 600 },
                { group: 'Mixed biscuits', label: '20L', price: 800 }
            ]
        },
        {
            id: 'scones',
            name: 'Scones',
            category: 'Muffins & scones',
            description: 'Soft, fresh scones baked to order.',
            images: [{ src: '_images/fresh-scones.jpeg', alt: 'A plate of freshly baked scones' }],
            options: [
                { label: '5L', price: 300 },
                { label: '10L', price: 450 },
                { label: '20L', price: 580 }
            ]
        },
        {
            id: 'cupcakes',
            name: 'Cupcakes',
            category: 'Cakes & cupcakes',
            description: 'Decorated cupcakes for birthdays, showers and events.',
            images: [{ src: '_images/decorated-cupcakes.jpg', alt: 'Box of decorated cupcakes' }],
            options: [
                { label: '6 cupcakes', price: 120 },
                { label: '12 cupcakes', price: 240 }
            ]
        },
        {
            id: 'cakes',
            name: 'Cakes',
            category: 'Cakes & cupcakes',
            description: 'Custom cakes. Prices start from R550, depending on size, flavour, and design.',
            images: [
                { src: '_images/batman-birthday-cake.png', alt: 'Custom Batman themed birthday cake' },
                { src: '_images/spiderman-birthday-cake.png', alt: 'Custom Spider-Man themed birthday cake' }
            ],
            options: [{ label: 'Starting from', price: 550 }]
        },
        {
            id: 'other',
            name: 'Also available',
            category: 'Other treats',
            description: 'Snowballs, buns, rusks, and cinnamon rolls are now available. Enquire for pricing.',
            images: [{ src: '_images/coconut-snowballs.jpeg', alt: 'Coconut snowballs' }],
            options: []
        }
    ];

    // ----- Page elements -----
    const list = document.getElementById('product-list');
    const searchBox = document.getElementById('product-search');
    const categorySelect = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort-order');
    const resultCount = document.getElementById('result-count');

    if (!list) { return; }

    // ----- Helpers -----

    // Builds an element: el('p', { className: 'x', textContent: 'Hi' }, child1, child2)
    function el(tag, props)
    {
        const node = document.createElement(tag);
        Object.assign(node, props || {});

        for (let i = 2; i < arguments.length; i++)
        {
            node.appendChild(arguments[i]);
        }
        return node;
    }

    // Lowest price of a product (used for sorting). Products with no price go last.
    function lowestPrice(product)
    {
        if (product.options.length === 0) { return Infinity; }
        return Math.min.apply(null, product.options.map(function (option) { return option.price; }));
    }

    // Everything searchable about a product, in one lowercase string
    function searchText(product)
    {
        const groups = product.options.map(function (option) { return option.group || ''; }).join(' ');
        return (product.name + ' ' + product.category + ' ' + product.description + ' ' + groups).toLowerCase();
    }

    // ----- Rendering -----

    // Builds the price list, with a small heading when the options are grouped (e.g. biscuit types)
    function buildPriceList(product)
    {
        const wrapper = el('div');

        if (product.options.length === 0)
        {
            wrapper.appendChild(el('p', { textContent: 'Enquire for pricing.' }));
            return wrapper;
        }

        let currentGroup = null;
        let ul = null;

        product.options.forEach(function (option)
        {
            if (ul === null || option.group !== currentGroup)
            {
                currentGroup = option.group;

                if (currentGroup)
                {
                    wrapper.appendChild(el('h4', { textContent: currentGroup }));
                }

                ul = el('ul');
                wrapper.appendChild(ul);
            }

            ul.appendChild(el('li', { textContent: option.label + ' \u2013 R' + option.price }));
        });

        return wrapper;
    }

    function buildCard(product)
    {
        const card = el('section', { className: 'service-card', id: product.id });
        card.appendChild(el('h3', { textContent: product.name }));

        const pictures = el('div', { className: 'card-images' });
        product.images.forEach(function (image)
        {
            pictures.appendChild(el('img', {
                src: image.src,
                alt: image.alt,
                className: 'responsive-image',
                loading: 'lazy'
            }));
        });
        card.appendChild(pictures);

        card.appendChild(el('p', { textContent: product.description }));
        card.appendChild(buildPriceList(product));

        card.appendChild(el('a', {
            className: 'cta-button',
            href: 'enquiries.html?product=' + product.id,
            textContent: 'Enquire about ' + product.name.toLowerCase()
        }));

        return card;
    }

    // Applies the search text, category filter and sort order, then redraws the cards
    function render()
    {
        const query = searchBox.value.trim().toLowerCase();
        const category = categorySelect.value;
        const order = sortSelect.value;

        let results = PRODUCTS.filter(function (product)
        {
            const matchesCategory = category === 'all' || product.category === category;
            const matchesSearch = query === '' || searchText(product).indexOf(query) !== -1;
            return matchesCategory && matchesSearch;
        });

        if (order === 'name')
        {
            results.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
        else if (order === 'price-low')
        {
            results.sort(function (a, b) { return lowestPrice(a) - lowestPrice(b); });
        }
        else if (order === 'price-high')
        {
            // Products without a price stay at the end
            results.sort(function (a, b)
            {
                const priceA = lowestPrice(a) === Infinity ? -1 : lowestPrice(a);
                const priceB = lowestPrice(b) === Infinity ? -1 : lowestPrice(b);
                return priceB - priceA;
            });
        }

        list.textContent = '';

        if (results.length === 0)
        {
            list.appendChild(el('p', { className: 'no-results', textContent: 'No treats match your search. Try a different word or choose "All treats".' }));
        }
        else
        {
            results.forEach(function (product) { list.appendChild(buildCard(product)); });
        }

        resultCount.textContent = 'Showing ' + results.length + ' of ' + PRODUCTS.length + ' items';
    }

    // Fill the category drop-down from the data so it can never get out of date
    Array.from(new Set(PRODUCTS.map(function (product) { return product.category; }))).forEach(function (category)
    {
        categorySelect.appendChild(el('option', { value: category, textContent: category }));
    });

    // Wait 250 ms after typing stops before searching
    let timer = null;
    searchBox.addEventListener('input', function ()
    {
        clearTimeout(timer);
        timer = setTimeout(render, 250);
    });
    categorySelect.addEventListener('change', render);
    sortSelect.addEventListener('change', render);

    render();
})();