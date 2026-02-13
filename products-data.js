export const productsData = [
    {
        id: 1,
        name: "Camera",
        subtitle: "Compact 4K camera with stabilized zoom and crisp low-light shots.",
        image: "../images/product1.jpg",
        price: "$69.99",
        rating: 4.6,
        reviewCount: 2184,
        inStock: true,
        shippingMin: 2,
        shippingMax: 4,
        shippingMode: "range",
        bullets: [
            "4K video recording with ultra-clear color and detail.",
            "2.7x optical zoom with digital stabilization for smooth shots.",
            "Compact, lightweight body with 64GB memory included.",
            "USB-C fast charging and 12-hour battery life."
        ],
        description: "Capture everyday moments and big adventures with a compact camera built for sharp photos and smooth video. The balanced lens and stabilization keep footage steady while the low-light sensor preserves true-to-life color. Designed for travel, this camera fits in a small bag, charges quickly, and keeps you recording longer.",
        specs: {
            "Brand": "AmazoCam",
            "Max resolution": "4K (3840 x 2160)",
            "Zoom": "2.7x optical",
            "Storage": "64GB included",
            "Battery life": "Up to 12 hours"
        }
    },
    {
        id: 2,
        name: "Lotion",
        subtitle: "Hydrating lotion with vitamin E and natural moisture lock.",
        image: "../images/product2.jpg",
        price: "$39.99",
        rating: 4.1,
        reviewCount: 941,
        inStock: true,
        shippingMin: 3,
        shippingMax: 5,
        shippingMode: "range",
        bullets: [
            "Enriched with vitamin E and shea butter for deep hydration.",
            "Non-greasy formula absorbs quickly into skin.",
            "Suitable for all skin types, dermatologist tested.",
            "Fresh scent lasts throughout the day."
        ],
        description: "Nourish your skin with a lightweight lotion that hydrates without leaving residue. Infused with natural ingredients, it absorbs fast and leaves skin feeling smooth and refreshed. Perfect for daily use, morning or night.",
        specs: {
            "Brand": "SkinCare Essentials",
            "Volume": "16 fl oz",
            "Skin type": "All types",
            "Main ingredients": "Vitamin E, Shea butter",
            "Fragrance": "Light fresh scent"
        }
    },
    {
        id: 3,
        name: "Man Perfume",
        subtitle: "Bold woody fragrance with long-lasting wear.",
        image: "../images/product3.jpg",
        price: "$29.99",
        rating: 4.8,
        reviewCount: 5702,
        inStock: true,
        shippingMin: 2,
        shippingMode: "by",
        bullets: [
            "Rich blend of cedarwood, sandalwood, and citrus notes.",
            "Long-lasting scent up to 8 hours.",
            "Sophisticated fragrance for day or evening wear.",
            "Premium glass bottle with stylish design."
        ],
        description: "Make a lasting impression with a refined fragrance that balances boldness with elegance. The woody base notes blend seamlessly with fresh citrus for a versatile scent that works for any occasion. Crafted with high-quality oils for extended wear.",
        specs: {
            "Brand": "Noir Essence",
            "Volume": "3.4 fl oz (100ml)",
            "Fragrance family": "Woody aromatic",
            "Top notes": "Bergamot, Lemon",
            "Base notes": "Cedarwood, Sandalwood"
        }
    },
    {
        id: 4,
        name: "Soap",
        subtitle: "Gentle moisturizing soap bar with natural oils.",
        image: "../images/product4.jpg",
        price: "$9.99",
        rating: 3.9,
        reviewCount: 412,
        inStock: true,
        shippingMin: 5,
        shippingMax: 7,
        shippingMode: "range",
        bullets: [
            "Made with coconut oil and glycerin for soft skin.",
            "pH balanced formula gentle on sensitive skin.",
            "Creates a rich lather that rinses clean.",
            "Long-lasting bar, lasts up to 4 weeks."
        ],
        description: "Cleanse and nourish with a moisturizing bar soap that doesn't dry out your skin. Formulated with natural oils, it produces a gentle lather while maintaining your skin's natural moisture barrier. Ideal for face and body.",
        specs: {
            "Brand": "Pure Clean",
            "Weight": "4 oz",
            "Skin type": "All types, sensitive",
            "Main ingredients": "Coconut oil, Glycerin",
            "pH level": "Balanced 5.5"
        }
    },
    {
        id: 5,
        name: "Shampoo",
        subtitle: "Strengthening shampoo for healthy, shiny hair.",
        image: "../images/shampoo.jpeg",
        price: "$6.99",
        rating: 4.3,
        reviewCount: 1238,
        inStock: true,
        shippingMin: 2,
        shippingMax: 3,
        shippingMode: "range",
        bullets: [
            "Keratin-enriched formula strengthens hair from root to tip.",
            "Sulfate-free and gentle on color-treated hair.",
            "Adds volume and shine without weighing hair down.",
            "Pleasant botanical scent."
        ],
        description: "Revitalize your hair with a strengthening formula designed to repair and protect. Infused with keratin and natural botanicals, this sulfate-free shampoo cleanses gently while enhancing shine and body. Safe for daily use on all hair types.",
        specs: {
            "Brand": "Hair Vitality",
            "Volume": "12 fl oz",
            "Hair type": "All types",
            "Key benefits": "Strengthening, shine",
            "Sulfate-free": "Yes"
        }
    },
    {
        id: 6,
        name: "Conditioner",
        subtitle: "Ultra-hydrating conditioner for smooth, manageable hair.",
        image: "../images/Ultra-Hydrating_Conditioner.png",
        price: "$3.99",
        rating: 4.0,
        reviewCount: 688,
        inStock: true,
        shippingMin: 4,
        shippingMax: 6,
        shippingMode: "range",
        bullets: [
            "Deep conditioning treatment with argan oil.",
            "Detangles and reduces frizz instantly.",
            "Leaves hair soft and silky without buildup.",
            "Works with all hair textures."
        ],
        description: "Lock in moisture and tame frizz with a hydrating conditioner that transforms dry, tangled hair. Enriched with argan oil, it penetrates deep to repair and smooth each strand. Perfect partner to any shampoo routine.",
        specs: {
            "Brand": "Hair Vitality",
            "Volume": "12 fl oz",
            "Hair type": "All types",
            "Key ingredient": "Argan oil",
            "Paraben-free": "Yes"
        }
    },
    {
        id: 7,
        name: "Hair Gel",
        subtitle: "Strong-hold styling gel for all-day control.",
        image: "../images/hair_gel.jpg",
        price: "$14.99",
        rating: 3.7,
        reviewCount: 319,
        inStock: true,
        shippingMin: 4,
        shippingMode: "by",
        bullets: [
            "Maximum hold that lasts all day without flaking.",
            "Non-sticky formula easy to wash out.",
            "Adds shine and definition to any hairstyle.",
            "Alcohol-free to prevent dryness."
        ],
        description: "Style with confidence using a strong-hold gel that keeps your look in place from morning to night. The non-flaking formula provides control without stiffness, and rinses out easily at the end of the day. Ideal for slicked-back looks and defined styles.",
        specs: {
            "Brand": "StyleMax",
            "Volume": "8 oz",
            "Hold level": "Maximum",
            "Finish": "Shine",
            "Alcohol-free": "Yes"
        }
    },
    {
        id: 8,
        name: "Hair Spray",
        subtitle: "Flexible-hold hairspray with humidity resistance.",
        image: "../images/hair_spray.jpg",
        price: "$14.99",
        rating: 4.2,
        reviewCount: 1004,
        inStock: true,
        shippingMin: 3,
        shippingMax: 4,
        shippingMode: "range",
        bullets: [
            "Flexible hold allows natural movement.",
            "Humidity-resistant formula fights frizz all day.",
            "Brushes out easily without residue.",
            "Light, fresh scent won't overpower."
        ],
        description: "Keep your hairstyle secure while maintaining natural movement. This flexible hairspray locks in your look without making hair stiff or sticky, and it protects against humidity for all-day confidence. Quick-drying and easy to apply.",
        specs: {
            "Brand": "StyleMax",
            "Volume": "10 oz",
            "Hold level": "Flexible",
            "Features": "Humidity resistant",
            "Finish": "Natural"
        }
    },
    {
        id: 9,
        name: "Body Wash",
        subtitle: "Refreshing gel body wash with invigorating scent.",
        image: "../images/bodywash.jpg",
        price: "$5.99",
        rating: 4.5,
        reviewCount: 2642,
        inStock: true,
        shippingMin: 2,
        shippingMax: 5,
        shippingMode: "range",
        bullets: [
            "Rich lather cleanses and refreshes skin.",
            "Infused with menthol for a cooling sensation.",
            "Moisturizing formula won't strip natural oils.",
            "Energizing scent wakes you up in the morning."
        ],
        description: "Start your day with an energizing body wash that cleanses deeply while leaving skin hydrated. The cooling menthol provides a refreshing sensation, and the balanced formula maintains your skin's natural moisture. Perfect for daily showers.",
        specs: {
            "Brand": "Fresh Start",
            "Volume": "18 fl oz",
            "Skin type": "All types",
            "Key ingredient": "Menthol",
            "Scent": "Cool mint"
        }
    },
    {
        id: 10,
        name: "Face Wash",
        subtitle: "Deep cleansing face wash for clear, healthy skin.",
        image: "../images/facewash.jpg",
        price: "$9.99",
        rating: 4.4,
        reviewCount: 1781,
        inStock: true,
        shippingMin: 3,
        shippingMode: "by",
        bullets: [
            "Salicylic acid formula unclogs pores and prevents breakouts.",
            "Gentle enough for daily use, morning and night.",
            "Oil-free and non-comedogenic.",
            "Leaves skin feeling clean and refreshed."
        ],
        description: "Achieve clear, radiant skin with a deep-cleansing face wash that targets impurities and excess oil. Formulated with salicylic acid, it helps prevent breakouts while being gentle enough for everyday use. The balanced formula won't over-dry your skin.",
        specs: {
            "Brand": "ClearSkin Pro",
            "Volume": "6 fl oz",
            "Skin type": "All types, acne-prone",
            "Key ingredient": "Salicylic acid",
            "Oil-free": "Yes"
        }
    }
];
