# The Shortlist — starter site

A 5-page affiliate/product site: Home, Products (with search), About Us, Contact.
Pure HTML/CSS/JS — no build tools, no frameworks. Open any `.html` file in a
browser, or serve the folder with any static host (GitHub Pages, Netlify,
Vercel, cPanel, etc.).

## Folder structure

```
index.html          Home page
products.html        Product catalog + search + filters
about.html            About Us page
contact.html          Contact page (form + FAQ)
assets/
  css/style.css       All styling (one shared file)
  js/products-data.js  <-- YOUR PRODUCT LIST LIVES HERE
  js/products-render.js  Renders product cards, search, filters
  js/main.js           Nav, scroll animations, FAQ, forms
  images/
    products/          Put your product photos here
    site/               Any other site images (logo, etc.)
```

## Adding a product (do this anytime)

Open `assets/js/products-data.js`. Copy one product object, paste it into the
`PRODUCTS` array, and edit the fields:

```js
{
  id: 11,                                    // unique number
  name: "Your Product Name",
  category: "Home",                          // powers the filter chips
  price: "$29.99",
  oldPrice: "",                               // optional "was" price
  image: "assets/images/products/photo.jpg",  // your product photo
  link: "https://your-affiliate-link.com",    // where "Get it" goes
  badge: "",                                  // "Editor's Pick", "New", etc — or ""
  blurb: "One short line about it.",
  featured: false                             // true = also shows on Home
}
```

Save the file — the product instantly appears on the Products page (and on
Home if `featured: true`). No other code needs to change.

Drop the matching photo into `assets/images/products/`. If a photo is
missing, the card shows a placeholder label instead of breaking.

## Product photos

Each product currently ships with a custom illustrated icon (`.svg`) in the
site's own color palette, so the catalog looks designed rather than like
random stock photos. To swap in a real photo instead:

- Recommended size: roughly 800×600px (4:3), JPG, PNG, or WebP, under ~300KB.
- Save it into `assets/images/products/`, then update that product's `image`
  path in `products-data.js` to point at your new file (e.g. `kettle.jpg`
  instead of `kettle.svg`). Nothing else needs to change.
- If an image fails to load, the card falls back to a plain text label
  instead of breaking.

## WhatsApp contact

The number **+91 81285 32292** is wired in three places: the floating
chat button (bottom-right, every page), the green "Prefer WhatsApp?" card
on the Contact page, and the WhatsApp row in the contact info list. All
three point to the same link — search each `.html` file for `wa.me` if you
ever need to change the number or the pre-filled message text.

## Customizing

- **Colors, fonts, spacing** — all in `assets/css/style.css` under the
  `:root` variables at the top of the file.
- **Site name / logo text** — search for "Shortlist" across the HTML files.
- **Affiliate disclosure banner** — the thin strip at the top of every page,
  edit the text directly in each `.html` file.
- **Contact form** — currently shows a confirmation message but doesn't send
  anywhere. Connect it to a form service (Formspree, Getform, etc.) or your
  own backend by setting the `<form>`'s `action`/`method`, or by editing
  `initContactForm()` in `assets/js/main.js`.
- **Newsletter form** — same idea, in `initNewsletterForm()`.

## Notes

- The search bar on the Products page matches product name, category, and
  the short blurb — no backend needed, it all runs in the browser.
- All "Get it" buttons open in a new tab with `rel="nofollow sponsored"`,
  which is what affiliate links should use.
- Animations respect `prefers-reduced-motion` for accessibility.
