Website Project Proposal 1: Karabo’s Confectionery
Karabo Ngobeni ST10522201
## ORGANISATION OVERVIEW
Name: Karabo’s Confectionery
Karabo’s Confectionery is a home-based small business specializing in freshly baked biscuits, cakes, cupcakes, muffins, and scones, along with items such as rusks, cinnamon rolls, bread rolls, and snowballs. The business will primarily serve customers in Polokwane and surrounding areas. This business began as a home-baking hobby and has grown through customer referrals and social media orders into a business ready to establish a professional online presence.
Mission: To bake fresh, high-quality confectionery using the best ingredients, with love and attention to detail in every order.
Vision:  My vision is to become Polokwane’s most trusted bakery for custom cakes, known for creativity and heart, as we grow into a brand that makes celebrations sweeter across South Africa.
Target audience: Individuals and families looking for freshly baked everyday treats, as well as those planning celebrations and birthday parties, generally aged 17+, who value quality, freshness, and personalized design over mass-produced alternatives. 
## WEBSITE GOALS AND OBJECTIVES
The main goal of the website will be to create a professional online presence for Karabo’s Confectionery. The website will allow potential customers to learn about the business, view available products and make enquiries.
The key objectives will be to:
•	Establish a professional online presence in order to build customer trust.
•	Increase awareness of Karabo’s Confectionery.
•	Provide customers with contact and location information.
•	Showcase the full product range, including flavours and pricing, through a clear products page.
•	Generate leads via an online enquiry form. 
•	Provide clear information on pricing, available sizes, and the ordering process. 
Key Performance Indicators: number of enquiry form submissions per month, website traffic, average time spent on the products page, and social media click-throughs to the site.
## PROPOSED WEBSITE FEATURES AND FUNCTIONALITY
This website will contain at least five pages, namely: Home, About Us, Services, Enquiry and Contact. The Home page will introduce the business and include a call-to-action encouraging visitors to view the products or make an enquiry. The Services page will display the available baked goods, descriptions as well as the prices. The Enquiry page will contain a form that customers can use to enquire about products and orders. The Contact page will provide contact details and the location.
## TIMELINE AND MILESTONES
The project will progress through research and planning, website structure development, CSS styling, JavaScript functionality, testing and final deployment. 
## SITEMAP
Home page, Enquiries page, Contact page, Services page, About page
## FILE AND FOLDER STRUCTURE
```
WEDE5020POE1/
├── index.html
├── about.html
├── services.html
├── enquiries.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css_assets/
│   └── myfirststyles.css
├── js_assets/
│   ├── main.js
│   ├── services.js
│   ├── enquiry.js
│   └── contact.js
└── _images/
```

## TECHNICAL REQUIREMENTS
The website is built with HTML (W3C, 2026c), styled with CSS (MDN Web Docs, 2026a) and made interactive with JavaScript (MDN Web Docs, 2026c). A .co.za domain name can be registered through a registry such as ZA Registry Consortium (ZARC) (2026), and hosting options were compared from providers such as Web Hosters (2026) and Dalkom (2026). For this portfolio the site is deployed on a free hosting platform.

## PART 3 DETAILS
### Interactive elements
- **FAQ accordion** on the About page, built following the W3C accordion pattern (W3C, 2026a).
- **Gallery lightbox** on the Home page, with previous and next buttons and keyboard support (Esc and the arrow keys), following the W3C modal dialog pattern (W3C, 2026b).
- **Scroll animations** using the Intersection Observer API (MDN Web Docs, 2026b), plus CSS transitions on cards, buttons and the accordion.
- **Two embedded Google Maps** on the Contact page, one for the main studio and one for the pickup point at Limpopo Mall (Google, 2026b).

### Dynamic content and search
The Services page builds its product cards from a JavaScript array. Visitors can search by name or variety, filter by category, and sort by name or price.

### Forms
| Form | Purpose | Validation | Result |
|---|---|---|---|
| Enquiry form (`enquiries.html`) | Ask about a product or service | Name, email, South African phone number, event date (not in the past), product, size, quantity and message length | Shows an estimated cost and whether the date is available, based on notice periods |
| Contact form (`contact.html`) | Send a general message to the business | Name, email, optional phone number, message type and message length | Compiles the details into an email addressed to the recipient set in `contact.js`, ready to send |

Each of these pages also has an embedded Google Form (Google, 2026a) alongside the coded form.

### Search engine optimisation
| Item | Implementation |
|---|---|
| Title tags | A unique title on every page |
| Meta description and keywords | Unique on every page, using bakery and Polokwane keywords |
| Headings | One `h1` per page, with `h2` and `h3` for sections |
| Images | Descriptive file names (for example `decorated-cupcakes.jpg`) and alt text on every image |
| Internal linking | Navigation, footer links and call-to-action buttons |
| Local SEO | Polokwane keywords, plus Bakery structured data in JSON-LD on the Home page (Schema.org, 2026) |
| `robots.txt` and `sitemap.xml` | Both added in the root folder |
| Mobile-friendliness | Responsive design from Part 2 |
| Page speed | Images lazy-loaded and scripts loaded with `defer` |
| Security | External links use `rel="noopener noreferrer"`, and user input is displayed as plain text, never as raw HTML |

### Browser and device testing
 I TESTED USING CHROME, EDGE, A PHONE AND A TABLET

### Deployment
The site is deployed on GitHub Pages (GitHub, 2026) at https://karabo847.github.io/WEDE5020POE1/. Repository: https://github.com/Karabo847/WEDE5020POE1

### Image credits
All photographs on this website are original photographs taken by Karabo Ngobeni.

### AI usage statement
Generative AI (Anthropic, 2026) was used to help plan the Part 3 features and to write and check code for the JavaScript, form validation, SEO tags, embedded content and README. I tested, edited and understand the code I submitted.

## CHANGELOG
Sitemap was added
Home page, Enquiries page, Contact page, Services page, About page were added as well
### Part 2
#### Fixed
- Corrected broken image file names in `_images` (several had duplicate
  file extensions, e.g. `logo.png.png`, and did not match the file names
  used in the HTML `src` attributes).
- Fixed all `<img>` src paths across index.html, services.html, about.html,
  contact.html, and enquiries.html to match the corrected file names.

#### Added
- Created external stylesheet `css_assets/myfirststyles.css` and linked it
  to all five pages.
- Added a CSS reset and site-wide base styles for font, colour, and spacing.
- Added CSS custom properties for the brand colour palette and fonts.
- Added a typographic scale for headings and body text.
- Added a Flexbox header and navigation bar with an active-page indicator.
- Added CSS Grid layouts for the hero section, service cards, and
  location cards.
- Added :hover, :focus and :active styles for links, buttons, cards, and
  form fields.
- Styled the enquiry and contact forms with consistent inputs and
  focus states.
- Added media queries at 768px (tablet) and 480px (mobile) so the layout,
  typography, and navigation menu adapt to smaller screens.
- Added responsive image sizing (`srcset`/`sizes`) to the hero image.
- Added desktop, tablet, and mobile screenshots to this README.
### Part 3
#### Part 2 feedback
- Linked `css_assets/myfirststyles.css` in `index.html`, the only page that was missing it. All five pages now use the same stylesheet.
- Rewrote the reference list with full web addresses, italic titles, alphabetical order and a/b/c suffixes for same-year sources, and added in-text citations.
- Changelog: each entry now states the file changed, what changed and why.

### Fixed
- Corrected the "Request an order" button link on `index.html` (`enquiry.html` to `enquiries.html`).
- Wrapped the logo image inside its link on `index.html` and `services.html`.
- Corrected the class name `class-grid` to `card-grid` on `index.html`.
- Corrected the background image path in the CSS (`../images/` to `../_images/`).
- Added an `<h1>` to `about.html`.

#### Added
- Unique `<title>`, meta description and meta keywords on all five pages.
- Descriptive image file names and alt text; updated every `src` path and the CSS background path.
- `js_assets/main.js`: scroll animation, FAQ accordion and gallery lightbox.
- `js_assets/services.js`: dynamic product cards with search, category filter and sorting.
- `js_assets/enquiry.js`: enquiry form validation, estimated cost and availability response.
- `js_assets/contact.js`: contact form validation and an email compiled into a `mailto:` link.
- Two embedded Google Maps on `contact.html`.
- An embedded Google Form on `enquiries.html` and on `contact.html`.
- Bakery structured data (JSON-LD) on `index.html`.
- `robots.txt` and `sitemap.xml`.
- `.embedded-form` and `.map-frame` styles so embedded content fits every screen size.
## REFERENCES
Anthropic (2026) *Claude Sonnet 5.5* [Large language model]. Available at: https://claude.ai (Accessed: 1 November 2026).

Dalkom (2026) *Web hosting South Africa*. Available at: (https://dalkom.co.za/hosting/) (Accessed: 14 August 2026).

GitHub (2026) *GitHub Pages*. Available at: https://pages.github.com (Accessed: 1 November 2026).

Google (2026a) *Google Forms*. Available at: https://forms.google.com (Accessed: 1 November 2026).

Google (2026b) *Google Maps*. Available at: https://www.google.com/maps (Accessed: 1 November 2026).

Google Chrome Labs (2026) *Squoosh*. Available at: https://squoosh.app (Accessed: 1 November 2026).

MDN Web Docs (2026a) *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 14 August 2026).

MDN Web Docs (2026b) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 1 November 2026).

MDN Web Docs (2026c) *JavaScript*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript (Accessed: 14 August 2026).

Schema.org (2026) *Bakery*. Available at: https://schema.org/Bakery (Accessed: 1 November 2026).

W3C (2026a) *Accordion pattern*, ARIA Authoring Practices Guide. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (Accessed: 1 November 2026).

W3C (2026b) *Dialog (modal) pattern*, ARIA Authoring Practices Guide. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (Accessed: 1 November 2026).

W3C (2026c) *HTML: HyperText Markup Language*. Available at: https://www.w3.org/html/ (Accessed: 14 August 2026).

Web Hosters (2026) *Web hosting and domain registration*. Available at: https://www.domains.co.za/web-hosting-south-africa (Accessed: 14 August 2026).

ZA Registry Consortium (ZARC) (2026) *ZA Registry Consortium*. Available at: https://zarc.web.za/ (Accessed: 14 August 2026).

### Screenshots
<img width="206" height="293" alt="Screenshot 2026-09-18 212135" src="https://github.com/user-attachments/assets/019f42cb-c24f-4c1e-86d4-ac9780f2c2ac" /> desktop
<img width="206" height="302" alt="Screenshot 2026-09-18 212217" src="https://github.com/user-attachments/assets/b45d5918-61dc-468c-b51e-1f9be76dbed5" /> tablet
<img width="175" height="299" alt="Screenshot 2026-09-18 212801" src="https://github.com/user-attachments/assets/2580dcae-47de-45de-a282-121454ca6590" /> mobile
