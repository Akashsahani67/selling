/* ============================================================
   PRODUCT CATALOG
   ------------------------------------------------------------
   HOW TO ADD A NEW PRODUCT
   1. Copy one object below (from the opening { to closing },)
   2. Paste it into the PRODUCTS array (anywhere in the list)
   3. Edit the fields:
        id          -> unique number, just increase from the last one
        name        -> product name shown on the card
        category    -> used for the filter chips + dropdown
        price       -> current price, e.g. "$24.99"
        oldPrice    -> optional "was" price, leave "" if none
        image       -> path to a photo in assets/images/products/
                       (drop your product photo in that folder)
        link        -> YOUR affiliate / product link
        badge       -> optional ribbon text, e.g. "Editor's Pick"
                       leave "" for no badge
        blurb       -> one short line about the product
   4. Save the file. That's it — it shows up on the Products
      page and, if "featured: true", on the Home page too.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Aro Ceramic Pour-Over Kettle",
    category: "Kitchen",
    price: "$42.00",
    oldPrice: "$56.00",
    image: "assets/images/products/kettle.svg",
    link: "https://example.com/your-affiliate-link-1",
    badge: "Editor's Pick",
    blurb: "Gooseneck spout for slow, even pours.",
    featured: true
  },
  {
    id: 2,
    name: "Fen Woven Desk Lamp",
    category: "Home",
    price: "$68.00",
    oldPrice: "",
    image: "assets/images/products/lamp.svg",
    link: "https://example.com/your-affiliate-link-2",
    badge: "",
    blurb: "Warm dimmable light, hand-woven shade.",
    featured: true
  },
  {
    id: 3,
    name: "Kojo Weighted Blanket",
    category: "Home",
    price: "$89.00",
    oldPrice: "$120.00",
    image: "assets/images/products/blanket.svg",
    link: "https://example.com/your-affiliate-link-3",
    badge: "Best Seller",
    blurb: "7 kg glass-bead fill, breathable cotton.",
    featured: true
  },
  {
    id: 4,
    name: "Solstice Leather Notebook",
    category: "Stationery",
    price: "$28.00",
    oldPrice: "",
    image: "assets/images/products/notebook.svg",
    link: "https://example.com/your-affiliate-link-4",
    badge: "",
    blurb: "Refillable cover, 240 dot-grid pages.",
    featured: true
  },
  {
    id: 5,
    name: "Marlo Travel Tripod",
    category: "Tech",
    price: "$54.00",
    oldPrice: "$70.00",
    image: "assets/images/products/tripod.svg",
    link: "https://example.com/your-affiliate-link-5",
    badge: "New",
    blurb: "Packs to 12in, holds phones + cameras.",
    featured: false
  },
  {
    id: 6,
    name: "Bramble Enamel Mug Set",
    category: "Kitchen",
    price: "$32.00",
    oldPrice: "",
    image: "assets/images/products/mugs.svg",
    link: "https://example.com/your-affiliate-link-6",
    badge: "",
    blurb: "Set of two, chip-resistant enamel.",
    featured: false
  },
  {
    id: 7,
    name: "Halden Cork Yoga Mat",
    category: "Fitness",
    price: "$58.00",
    oldPrice: "$75.00",
    image: "assets/images/products/mat.svg",
    link: "https://example.com/your-affiliate-link-7",
    badge: "Editor's Pick",
    blurb: "Natural cork top, non-slip rubber base.",
    featured: false
  },
  {
    id: 8,
    name: "Puro Steel Water Bottle",
    category: "Fitness",
    price: "$26.00",
    oldPrice: "",
    image: "assets/images/products/bottle.svg",
    link: "https://example.com/your-affiliate-link-8",
    badge: "",
    blurb: "24-hour cold retention, 750ml.",
    featured: false
  },
  {
    id: 9,
    name: "Nook Linen Throw Pillow",
    category: "Home",
    price: "$24.00",
    oldPrice: "",
    image: "assets/images/products/pillow.svg",
    link: "https://example.com/your-affiliate-link-9",
    badge: "",
    blurb: "Stonewashed linen, feather insert.",
    featured: false
  },
  {
    id: 10,
    name: "Ridge Slim Card Wallet",
    category: "Accessories",
    price: "$36.00",
    oldPrice: "$45.00",
    image: "assets/images/products/wallet.svg",
    link: "https://example.com/your-affiliate-link-10",
    badge: "Best Seller",
    blurb: "Aluminum shell, holds up to 8 cards.",
    featured: false
  }
];
