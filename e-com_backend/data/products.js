const products = {
  Electronics: {
    Smartphones: [
      {
        id: "phone1",
        title: "iPhone 17 Pro",
        description:
          "256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System; Deep Blue",
        price: 134900,
        category: "Smartphones",
        rating: { rate: 4.5, count: 2300 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/618vU2qKXQL._AC_UL330_SR330,330_.jpg",
      },
      {
        id: "phone2",
        title: "Samsung Galaxy Z Fold7",
        description:
          "5G Smartphone with Galaxy AI (JetBlack, 12GB RAM, 256GB Storage), Ultra Sleek Design with 200MP Camera, Powerful Snapdragon 8 Elite, Google Gemini",
        price: 174999,
        category: "Smartphones",
        rating: { rate: 4.2, count: 38 },
        image:
          "https://m.media-amazon.com/images/I/31058Y9953L._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "phone3",
        title: "Google Pixel 10 5G",
        description: "Google Pixel 10 5G (Obsidian, 12GB RAM, 256GB Storage)",
        price: 70890,
        category: "Smartphones",
        rating: { rate: 4.1, count: 23 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/516HIUddM3L._AC_UL330_SR330,330_.jpg",
      },
      {
        id: "phone4",
        title: "Samsung Galaxy S25 Ultra",
        description:
          "5G Smartphone with Galaxy AI (Titanium Black, 12GB RAM, 512GB Storage), Titanium Frame, Snapdragon 8 Elite, 200 MP Camera with ProVisual Engine and 5000mAh Battery",
        price: 135499,
        category: "Smartphones",
        rating: { rate: 4.3, count: 614 },
        image: "https://m.media-amazon.com/images/I/71uqj6BKnRL._SX679_.jpg",
      },
      {
        id: "phone5",
        title: "Vivo X200 Pro 5G",
        description:
          "(Titanium Grey, 16GB RAM, 512GB Storage) with No Cost EMI/Additional Exchange Offers",
        price: 94999,
        category: "Smartphones",
        rating: { rate: 4.7, count: 332 },
        image:
          "https://m.media-amazon.com/images/I/41MSicX6jhL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "phone6",
        title: "OnePlus 13s",
        description:
          "OnePlus 13s | Snapdragon® 8 Elite | Best Battery Life Ever on a Compact Phone | Lifetime Display Warranty | 12GB+256GB | Green Silk",
        price: 54999,
        category: "Smartphones",
        rating: { rate: 4.5, count: 1240 },
        image:
          "https://m.media-amazon.com/images/I/41Jy7YK8V7L._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "phone7",
        title: "Samsung Galaxy S24 Ultra",
        description:
          "AI Smartphone with Galaxy AI (Titanium Gray, 12GB, 512GB Storage), Snapdragon 8 Gen 3, 200 MP Camera, 5000mAh Battery",
        price: 99900,
        category: "Smartphones",
        rating: { rate: 4.6, count: 1780 },
        image:
          "https://m.media-amazon.com/images/I/41X9qNxoJKL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "phone8",
        title: "Motorola Edge 60 Pro",
        description:
          "Motorola Edge 60 Pro Pantone Shadow, 12GB RAM, 256GB Storage, Grey",
        price: 31976,
        category: "Smartphones",
        rating: { rate: 3.6, count: 74 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/71ciwmAEyRL._AC_UL232_SR232,232_.jpg",
      },
      {
        id: "phone9",
        title: "Nothing Phone (3a) Pro 5G",
        description:
          "Nothing Phone (3a) Pro 5G (Grey, 12GB RAM + 256GB Storage)",
        price: 31515,
        category: "Smartphones",
        rating: { rate: 4.4, count: 81 },
        image: "https://m.media-amazon.com/images/I/51fqCY02DlL._AC_SY400_.jpg",
      },
    ],

    Laptops: [
      {
        id: "lapi1",
        title: "Apple MacBook Air 2025",
        description:
          "Apple 2025 MacBook Air (13-inch, Apple M4 chip with 10-core CPU and 10-core GPU, 24GB Unified Memory, 512GB) - Midnight",
        price: 127990,
        category: "Laptops",
        rating: { rate: 4.6, count: 625 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/71pKJ+Mjd8L._AC_UL400_SR400,400_.jpg",
      },
      {
        id: "lapi2",
        title: "HP Pavilion x360",
        description:
          "HP Pavilion x360, 13th Gen Intel Core i5-1335U (16GB DDR4, 1TB SSD) FHD, 14''/35.6 cm, Touchscreen 2-in-1, Win 11, Office 21, Silver, 1.51 kg, ek1010TU/1149tu, FPR, 5MP Camera, B&O, Backlit Laptop",
        price: 72490,
        category: "Laptops",
        rating: { rate: 3.7, count: 490 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/71qGu5K01uL._AC_UL330_SR330,330_.jpg",
      },
      {
        id: "lapi3",
        title: "Dell SmartChoice G15-5530",
        description:
          "Dell SmartChoice G15-5530, Intel Core i5 13th Gen - 13450HX, NVIDIA RTX 3050-6GB, 16GB RAM, 1TB SSD, FHD 15.6 /39.62 cm, Windows 11, MS Office 21, Dark Shadow Grey, 2.65Kg Gaming Laptop",
        price: 78990,
        category: "Laptops",
        rating: { rate: 4.0, count: 1317 },
        image: "https://m.media-amazon.com/images/I/61LOOMpEgxL._SX679_.jpg",
      },
      {
        id: "lapi4",
        title: "Lenovo IdeaPad Slim 3",
        description:
          "Lenovo IdeaPad Slim 3 13th Gen Intel Core i5-13420H 15.3 (38.8cm) WUXGA IPS Laptop(16GB RAM/512GB SSD/Win 11/Office Home 2024/Backlit/1Yr ADP Free/Top Metal Cover & IR Camera/Grey/1.6Kg), 83K100CGIN",
        price: 54290,
        category: "Laptops",
        rating: { rate: 4.0, count: 279 },
        image: "https://m.media-amazon.com/images/I/71Q6JmLZE7L._SX679_.jpg",
      },
      {
        id: "lapi5",
        title: "Asus Vivobook 15",
        description:
          "ASUS Vivobook 15, Smartchoice,Intel Core i5 13th Gen 13420H,16GB RAM, 512GB SSD, FHD 15.6,Windows 11, Office Home 2024, Quiet Blue, 1.70 kg, X1502VA-BQ836WS,Intel UHD iGPU, M365 Basic (1Year)* Laptop",
        price: 56990,
        category: "Laptops",
        rating: { rate: 4.6, count: 625 },
        image: "https://m.media-amazon.com/images/I/81gNMbbeqvL._SX679_.jpg",
      },
      {
        id: "lapi6",
        title: "HP 15",
        description:
          "HP 15, 13th Gen Intel Core i5-1334U (16GB DDR4, 512GB SSD) Anti-Glare, Micro-Edge, 15.6''/39.6cm, FHD, Win 11, Office 24, Silver, 1.59kg, fd0467tu, Iris Xe Graphics, FHD Camera, Backlit KB Laptop",
        price: 54990,
        category: "Laptops",
        rating: { rate: 3.7, count: 201 },
        image: "https://m.media-amazon.com/images/I/71FXHAM+jWL._SX679_.jpg",
      },
      {
        id: "lapi7",
        title: "DELL 15 (2025)",
        description:
          "DELL 15 (2025) Intel Core i5 12th Gen 1235U - (16 GB/512 GB SSD/Intel Iris Xe Graphics/Windows 11 Home) Thin and Light Laptop/15.6 FHD Display/Backlit Keyboard/Black/1.5kg/MSO 2021/3 Years Warranty",
        price: 48490,
        category: "Laptops",
        rating: { rate: 5.0, count: 1 },
        image: "https://m.media-amazon.com/images/I/71wO-8XLiAL._SX679_.jpg",
      },
      {
        id: "lapi8",
        title: "Lenovo IdeaPad 5",
        description:
          "Lenovo IdeaPad 5 2-in-1 AMD Ryzen AI 7 350 (24GB RAM/1TB SSD/14 (35.5cm)/WUXGA OLED/Windows 11 AI Now/Copilot+PC/Office Home 2024/Digital Pen 2/Grey/1.5Kg), 83KT000LIN Convertible Laptop",
        price: 95990,
        category: "Laptops",
        rating: { rate: 4.2, count: 9 },
        image: "https://m.media-amazon.com/images/I/71068lNQ06L._SX679_.jpg",
      },
    ],

    Earphones: [
      {
        id: "earphone1",
        title: "Sony WH-1000XM5",
        description:
          "Industry-leading noise canceling wireless headphones with superior comfort.",
        price: 1499,
        category: "Earphones",
        rating: { rate: 4.7, count: 1450 },
        image: "https://m.media-amazon.com/images/I/51aXvjzcukL._SX679_.jpg",
      },
      {
        id: "earphone2",
        title: "Boat Airdopes 800",
        description:
          "Boat Airdopes 800 with Dolby Audio, Adaptive EQ by Mimi, AI ENx Mics, App Support, Fast Charge, IPX5, Bluetooth 5.3.",
        price: 1799,
        category: "Earphones",
        rating: { rate: 4.0, count: 6510 },
        image:
          "https://m.media-amazon.com/images/I/41kWMvhJyEL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "earphone3",
        title: "Boat Wired BassHeads Earphones",
        description: "Boat BassHeads 100 in-Ear Headphones with Mic (Black)",
        price: 339,
        category: "Earphones",
        rating: { rate: 4.1, count: 428661 },
        image:
          "https://m.media-amazon.com/images/I/313U7Xx9b4L._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "earphone4",
        title: "OnePlus Bullets Wireless Z2 ANC",
        description:
          "OnePlus Bullets Wireless Z2 ANC Bluetooth in Ear Earphones with Mic, 45dB Hybrid ANC, Bombastic Bass - 12.4 mm Drivers, 10 Mins Charge - 20 Hrs Music, 28 Hrs Battery (Booming Black)",
        price: 2099,
        category: "Earphones",
        rating: { rate: 4.1, count: 212014 },
        image:
          "https://m.media-amazon.com/images/I/51sZ0bOotML._AC_UY327_FMwebp_QL65_.jpg",
      },
      {
        id: "earphone5",
        title: "GOBOULT x Mustang Dyno TWS Earbuds",
        description:
          "GOBOULT x Mustang Dyno TWS Earbuds with 60H Playtime, App Support, Dual Pairing, 4 Mics ENC, 45ms Low Latency, 13mm Drivers, Touch Controls, Made in India, IPX5 Ear Buds Wireless (Silver)",
        price: 1199,
        category: "Earphones",
        rating: { rate: 4.1, count: 10189 },
        image:
          "https://m.media-amazon.com/images/I/41yJeu6uSxL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "earphone6",
        title: "boAt Rockerz 255 Z Plus",
        description:
          "boAt Rockerz 255 Z Plus, AI-Enx Tech, Spatial Audio, 50HRS Battery, Low Latency Mode, Fast Charge, App Support, IPX4 BT V5.3, Bluetooth Neckband, Wireless With Mic In ear Phones (Active/Classic Black)",
        price: 1099,
        category: "Earphones",
        rating: { rate: 3.9, count: 243084 },
        image:
          "https://m.media-amazon.com/images/I/31ptXJDnWxL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "earphone7",
        title: "boAt Rockerz 480",
        description:
          "boAt Rockerz 480, RGB LEDs,6 Light Modes, 40mm Drivers,Beast Mode, 60H Battery, ENx Tech, Stream Ad Free Music via App Support, Bluetooth Headphones, Wireless Over Ear Headphone with Mic (Black Sabre)",
        price: 1799,
        category: "Earphones",
        rating: { rate: 4.1, count: 3053 },
        image:
          "https://m.media-amazon.com/images/I/41VFJcUHTvL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "earphone8",
        title: "Noise Buds VS601",
        description:
          "Noise Newly Launched Buds VS601 in Ear Truly Wireless Earbuds with 50H of Playtime, Transparent Case Lid, Quad Mic ENC, Dual Device Pairing, 10Mm Driver, BT V5.3 (Copper Brown)",
        price: 1399,
        category: "Earphones",
        rating: { rate: 4.0, count: 393 },
        image: "https://m.media-amazon.com/images/I/71g5FSQQl-L._SX679_.jpg",
      },
    ],

    SmartWatches: [
      {
        id: "smartwatch1",
        title: "Fire-Boltt Ninja Call Pro Max",
        description:
          "2.01 inch Display, Bluetooth Calling, 120+ Sports Modes, Health Suite, Voice Assistant.",
        price: 1399,
        category: "Smartwatches",
        rating: { rate: 3.8, count: 80329 },
        image:
          "https://m.media-amazon.com/images/I/41szskqocrL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "smartwatch2",
        title: "Apple Watch Series 11",
        description:
          "Apple Watch Series 11 GPS 46mm Jet Black Aluminium Case with Black Sport Band - M/L",
        price: 49399,
        category: "Smartwatches",
        rating: { rate: 4.8, count: 18 },
        image:
          "https://m.media-amazon.com/images/I/41mUfdF4HaL._SX342_SY445_QL70_FMwebp_.jpg",
      },
      {
        id: "smartwatch3",
        title: "Titan Celestor",
        description:
          "Titan Celestor 1.43 AMOLED Smart Watch with Built-in GPS, Advanced Health Intelligence, AI Voice Assistant, Aluminium Case, 100+ Sports Modes, Water Resistance (Black)",
        price: 9995,
        category: "Smartwatches",
        rating: { rate: 3.8, count: 301 },
        image: "https://m.media-amazon.com/images/I/61ofV82kMKL._SX679_.jpg",
      },
      {
        id: "smartwatch4",
        title: "Noise Pro 6 Max",
        description:
          "Noise Pro 6 Max Smart Watch:Intelligent with Noise AI, Endless AI Watch Faces, AI Companion, 1.96” AMOLED, Stainless Steel Build, for iOS & Android(Chrome Black)",
        price: 7999,
        category: "Smartwatches",
        rating: { rate: 4.0, count: 22097 },
        image:
          "https://m.media-amazon.com/images/I/41vOpiDrdwL._SY300_SX300_QL70_FMwebp_.jpg",
      },
    ],

    Accessories: [
      {
        id: "accessory1",
        title: "Ambrane Type C Cable",
        description:
          "Ambrane Unbreakable 3A Fast Charging 1.5m Braided Type C Cable, 480Mbps Data Sync, Quick Charge 3.0.",
        price: 129,
        category: "Accessories & Gadgets",
        rating: { rate: 4.0, count: 82015 },
        image: "https://m.media-amazon.com/images/I/61W8xeZTwxL._SX679_.jpg",
      },
      {
        id: "accessory2",
        title: "UN1QUE 36W GaN Fast Charger",
        description:
          "UN1QUE 36W GaN Fast Charger 2 in 1 PD QC Dual Port Type C Adapter, Compact Fast Charger Adapter for iPhone, Samsung, Realme, Xiaomi, Vivio, Oppo, Android, White (36W Charger)",
        price: 698,
        category: "Accessories & Gadgets",
        rating: { rate: 3.5, count: 95 },
        image:
          "https://m.media-amazon.com/images/I/51HlSmYUifL._AC_UF480,480_SR480,480_.jpg",
      },
      {
        id: "accessory3",
        title: "Ambrane OTG Adapter",
        description:
          "AMBRANE USB Type C Female to USB Male OTG Adapter with 5 Gbps High-Speed Data Transfer, Compatible with Laptops, Tablets, Smartphone, Chargers and More Devices (AOTG-A1, Grey)",
        price: 149,
        category: "Accessories & Gadgets",
        rating: { rate: 4.2, count: 2884 },
        image: "https://m.media-amazon.com/images/I/61s4K51Go3L._SX679_.jpg",
      },
      {
        id: "accessory4",
        title: "Honeywell Type C Docking Station",
        description:
          "Honeywell 7-in-1 TypeC Docking Station with 4K HDMI,1xUSB 3.0, 2xUSB 2.0 & TypeC 3.0 PD 100W Charging Port, SD & Micro SD Slot,for All Type C Devices- MacBook,Laptop, Thunderbolt 3,PC,3 Years Warranty",
        price: 149,
        category: "Accessories & Gadgets",
        rating: { rate: 4.3, count: 4725 },
        image: "https://m.media-amazon.com/images/I/61tPYsj5cGL._SX679_.jpg",
      },
      {
        id: "accessory5",
        title: "Dyazo Laptop Sleeve",
        description:
          "Dyazo Water Resistant Laptop Sleeve/Laptop case/laptop cover with Handle Compatible for 15 Inch to 15.6 Inches laptops & Notebooks - Grey",
        price: 299,
        category: "Accessories & Gadgets",
        rating: { rate: 4.3, count: 11811 },
        image:
          "https://m.media-amazon.com/images/I/4154nCPCBaL._SY300_SX300_QL70_FMwebp_.jpg",
      },
      {
        id: "accessory6",
        title: "WOLFBOX MF100 Electric Air Duster",
        description:
          "WOLFBOX MF100 Electric Air Duster - 150,000 RPM Rechargeable Cordless Blower, Brushless Motor, 3-Speed Adjustable for Cleaning Computers, Keyboards, Cars, Homes, and Outdoor Spaces",
        price: 6999,
        category: "Accessories & Gadgets",
        rating: { rate: 4.6, count: 4147 },
        image:
          "https://m.media-amazon.com/images/I/61TMyUXV2NL._AC_UY327_FMwebp_QL65_.jpg",
      },
      {
        id: "accessory7",
        title: "Portronics MODESK Universal Mobile Holder Stand",
        description:
          "Portronics MODESK Universal Mobile Holder Stand with Metal Body, Anti Skid Design, Light Weight for All Smartphones, Tablets, Kindle, iPad(Black)",
        price: 119,
        category: "Accessories & Gadgets",
        rating: { rate: 4.2, count: 28539 },
        image: "https://m.media-amazon.com/images/I/51u2MqPaQwL._SX679_.jpg",
      },
      {
        id: "accessory8",
        title: "Philips OneBlade Turbo2X Hybrid Trimmer & Styler",
        description:
          "Philips OneBlade Turbo2X Hybrid Trimmer & Styler|Perfected for Skin Comfort|Dual Protech Tech|Suits all skin types & beard thickness, Wet & Dry Use| QP 2724/10",
        price: 1899,
        category: "Accessories & Gadgets",
        rating: { rate: 4.1, count: 43395 },
        image:
          "https://m.media-amazon.com/images/I/71DFol2sNKL._AC_SX416_CB1169409_QL70_.jpg",
      },
      {
        id: "accessory9",
        title: "Philips Hair Dryer HP8100/60",
        description:
          "Philips Hair Dryer 1000 Watts | Perfect Blow Dry For Men & Women | 2 Heat Settings (Hot/Warm) | ThermoProtect Technology prevents overheating | HP8100/60 - Blue | | 2 years Warranty",
        price: 799,
        category: "Accessories & Gadgets",
        rating: { rate: 4.2, count: 35537 },
        image:
          "https://m.media-amazon.com/images/I/61I2seGaPUL._AC_UL480_FMwebp_QL65_.jpg",
      },
    ],
  },

  MensWear: {
    Traditional: [
      {
        id: "traditional1",
        title: "Kurta & Nehru Jacket Set",
        description:
          "SOJANYA Pista Green Kurta & Cream Nehru Jacket for the Festive Season.",
        price: 1933,
        category: "Traditional",
        rating: { rate: 2.9, count: 39 },
        image: "https://m.media-amazon.com/images/I/71saKDW09xL._SY879_.jpg",
      },
      {
        id: "traditional2",
        title: "Polyester Embroidered Long Kurta",
        description:
          "Symbol Premium Men's Regular Polyester Embroidered Long Kurta",
        price: 1299,
        category: "Traditional",
        rating: { rate: 4.6, count: 22 },
        image: "https://m.media-amazon.com/images/I/81uSYYULqCL._SY879_.jpg",
      },
      {
        id: "traditional3",
        title: "Cotton Floral Printed Kurta",
        description: "FOXDX Men's Traditional Cotton Floral Printed Only Kurta",
        price: 499,
        category: "Traditional",
        rating: { rate: 3.7, count: 302 },
        image: "https://m.media-amazon.com/images/I/71LvbQq443L._SY879_.jpg",
      },
      {
        id: "traditional4",
        title: "Cotton Polyester Blend Solid Kurta",
        description:
          "ROYALSCOUT Men's Cotton Polyester Blend Solid Regular Fit Full Sleeve Short Kurta | Ethnic, Lightweight Summer Kurta for Daily & Occasion Use",
        price: 499,
        category: "Traditional",
        rating: { rate: 4.1, count: 1161 },
        image: "https://m.media-amazon.com/images/I/616wcCoQNWL._SX679_.jpg",
      },
      {
        id: "traditional5",
        title: "kurta Pajama Set with Long Jacket",
        description:
          "Amzira Men's Stylish Ethnic Wear Black Kurta Pajama Set with Long Jacket",
        price: 1879,
        category: "Traditional",
        rating: { rate: 3.2, count: 66 },
        image: "https://m.media-amazon.com/images/I/51Zd0+htwTL._SX679_.jpg",
      },
      {
        id: "traditional6",
        title: "Viscose Chikankari Sequined Kurta Set",
        description:
          "Manyavar Men's Viscose Chikankari Sequined Kurta Set (2pcs)",
        price: 4999,
        category: "Traditional",
        rating: { rate: 5.0, count: 12 },
        image: "https://m.media-amazon.com/images/I/71pyl41JKdL._SY879_.jpg",
      },
      {
        id: "traditional7",
        title: "Silk Blend Kurta Churidar Pyjama with Nehru Jacket",
        description:
          "Uri and MacKenzie Men's Silk Blend Regular Kurta Churidar Pyjama with Bundi Nehru Jacket/Waistcoat",
        price: 1612,
        category: "Traditional",
        rating: { rate: 3.9, count: 4233 },
        image: "https://m.media-amazon.com/images/I/612aNUsZvUL._SY879_.jpg",
      },
      {
        id: "traditional8",
        title: "Silk Blend Kurta with Paisley Design",
        description:
          "SOJANYA Men’s Silk Blend Kurta with Paisley Design | Designer Ethnic Wear for Garba Nights & Indian Festivals",
        price: 895,
        category: "Traditional",
        rating: { rate: 3.8, count: 136 },
        image: "https://m.media-amazon.com/images/I/61RomwTROjL._SY879_.jpg",
      },
    ],

    Western: [
      {
        id: "western1",
        title: "Formal Blazer",
        description:
          "NEOPOL KHALAK Men's Formal Blazer | Fully Lined | Slim Fit | Professional Office Wear.",
        price: 1399,
        category: "Western",
        rating: { rate: 4.1, count: 53 },
        image: "https://m.media-amazon.com/images/I/41LyjGtmzRL.jpg",
      },
      {
        id: "western2",
        title: "Slim Fit Blazer",
        description: "MANQ Men's Slim Fit Single Breasted Blazer",
        price: 1999,
        category: "Western",
        rating: { rate: 3.8, count: 10434 },
        image: "https://m.media-amazon.com/images/I/51kyY5T0nKL._SX679_.jpg",
      },
      {
        id: "western3",
        title: "Embroidered Velvet Black Bandhgala",
        description: "WINTAGE Embroidered Velvet Black Bandhgala",
        price: 4779,
        category: "Western",
        rating: { rate: 4.2, count: 20 },
        image: "https://m.media-amazon.com/images/I/81tFRCasD9L._SX679_.jpg",
      },
      {
        id: "western4",
        title: "Formal Suit Blazer & Pant Set",
        description:
          "L'MONTE Imported 2 Piece Suit Blazer for Men Formal Slim Fit Two Button Closure Coat & Pant Set for Business and Wedding Party",
        price: 8558,
        category: "Western",
        rating: { rate: 4.1, count: 11 },
        image: "https://m.media-amazon.com/images/I/61NG00B0AaL._SX679_.jpg",
      },
      {
        id: "western5",
        title: "Embroidered Indo Western 3 Piece Set",
        description:
          "AESTHELIA Men's Multicoloured Embroidered Indo Western 3 Piece Set - Designer Blazer with Black Inner and Trouser, Festive Ethnic Wear, Regular Fit",
        price: 6999,
        category: "Western",
        rating: { rate: 4.4, count: 56 },
        image: "https://m.media-amazon.com/images/I/517B6YKr5uL._SY879_.jpg",
      },
      {
        id: "western6",
        title: "Jodhpuri Coat",
        description:
          "VASTRAMAY Mirror Work Embellished Viscose Jodhpuri Coat for Men – Stylish Ethnic Wear for Weddings & Special Occasions",
        price: 2999,
        category: "Western",
        rating: { rate: 3.4, count: 17 },
        image: "https://m.media-amazon.com/images/I/71DEE9JpmlL._SY879_.jpg",
      },
      {
        id: "western7",
        title: "Tuxedo Blazer",
        description: "FAVOROSKI Men's Polyester and Viscose Tuxedo Blazers",
        price: 2503,
        category: "Western",
        rating: { rate: 3.8, count: 1620 },
        image: "https://m.media-amazon.com/images/I/71OhvvYpnSL._SY879_.jpg",
      },
      {
        id: "western8",
        title: "Slim Jodhpuri",
        description: "VASTRAMAY Men's Slim Jodhpuri",
        price: 2999,
        category: "Western",
        rating: { rate: 5.0, count: 1 },
        image: "https://m.media-amazon.com/images/I/61IXA+cueDL._SY879_.jpg",
      },
    ],
    Casual: [
      {
        id: "casual1",
        title: "Cotton Casual Shirt",
        description:
          "Men's Regular Fit Solid Soft Touch Cotton Casual Shirt with Pocket Design, Spread Collar & Full Sleeves.",
        price: 699,
        category: "Casual & Formal",
        rating: { rate: 3.7, count: 3181 },
        image: "https://m.media-amazon.com/images/I/71DU0wuXOSL._SX679_.jpg",
      },
      {
        id: "casual2",
        title: "Buttondown Casual Shirt",
        description:
          "Symbol Premium Men's Stylish Solid All Day Fresh Buttondown Casual Shirt - Regular Fit | Plain | Full Sleeve | Cotton Semi Formal Wear (Available in Plus Size & Combo Pack)",
        price: 1399,
        category: "Casual & Formal",
        rating: { rate: 3.9, count: 303 },
        image: "https://m.media-amazon.com/images/I/71NCBXev2YL._SY879_.jpg",
      },
      {
        id: "casual3",
        title: "Slim Fit Cotton Casual Checks Shirt",
        description: "Majestic Man Slim Fit Cotton Casual Checks Shirt for Men",
        price: 499,
        category: "Casual & Formal",
        rating: { rate: 3.9, count: 3072 },
        image: "https://m.media-amazon.com/images/I/715pbgxBXzL._SY879_.jpg",
      },

      {
        id: "casual4",
        title: "Cotton Smart Casual Shirt",
        description:
          "Symbol Premium Men's Cotton Smart Casual Shirt (Regular Fit | Solid Oxford | All Day Fresh)",
        price: 999,
        category: "Casual & Formal",
        rating: { rate: 4.1, count: 205 },
        image: "https://m.media-amazon.com/images/I/71IAVVgzsTL._SY879_.jpg",
      },
      {
        id: "casual5",
        title: "Cotton Cargo Pants",
        description:
          "Lymio Men Cargo || Cotton Cargo Pants for Men || Regular Fit High Rise Solid Pants (1Cargo-34-37)",
        price: 749,
        category: "Casual & Formal",
        rating: { rate: 3.9, count: 2611 },
        image: "https://m.media-amazon.com/images/I/61a3N7wPZNL._SY879_.jpg",
      },
      {
        id: "casual6",
        title: "Cotton Casual Shirt",
        description:
          "FINIVO FASHION Men's Casual Cotton Plain Button Down Shirt Long Sleeve Textured Summer Beach Shirt for Men",
        price: 489,
        category: "Casual & Formal",
        rating: { rate: 4.0, count: 1450 },
        image: "https://m.media-amazon.com/images/I/51yn92oL9fL.jpg",
      },
      {
        id: "casual7",
        title: "Lycra Cargo Track Pants",
        description:
          "GRECIILOOKS Men's Lycra Cargo Track Pants – Loose Fit Joggers for Men | Korean Style Travel & Lounge Wear with Pockets (Available in Plus Size and Combo Pack of 2)",
        price: 499,
        category: "Casual & Formal",
        rating: { rate: 3.9, count: 3999 },
        image: "https://m.media-amazon.com/images/I/51efXl8NOnL._SY879_.jpg",
      },
      {
        id: "casual8",
        title: "Satin Formal Shirt",
        description: "CVC Mens Satin Regular Fit Formal Shirt",
        price: 499,
        category: "Casual & Formal",
        rating: { rate: 3.7, count: 1335 },
        image: "https://m.media-amazon.com/images/I/61C9iG4XPDL._SX679_.jpg",
      },
    ],
    Jackets: [
      {
        id: "jacket1",
        title: "Bomber Jacket",
        description:
          "JVX Men's Lightweight Bomber Jacket | Sportswear Outwear Jacket (JACKET-02).",
        price: 768,
        category: "Jackets",
        rating: { rate: 4.8, count: 228 },
        image: "https://m.media-amazon.com/images/I/51UpcCdgcFL._SY879_.jpg",
      },
      {
        id: "jacket2",
        title: "Winter Jacket with Hoodie",
        description:
          "Boldfit jackets for men stylish latest puffer winter jacket for men standard length jacket man full sleeves bomber jackets for man winter wear with hoodie",
        price: 999,
        category: "Jackets",
        rating: { rate: 3.9, count: 1116 },
        image: "https://m.media-amazon.com/images/I/51tkmHjrvPL._SX679_.jpg",
      },
      {
        id: "jacket3",
        title: "Lightweight Outwear Jacket",
        description:
          "Lymio Jackets || Jacket for men || Lightweight Outwear Jacket (J-07-09)",
        price: 799,
        category: "Jackets",
        rating: { rate: 4.3, count: 184 },
        image: "https://m.media-amazon.com/images/I/61YT6E6bWvL._SY879_.jpg",
      },
      {
        id: "jacket4",
        title: "Denim Jacket",
        description: "JACK & JONES Spread Collar Cotton Washed Denim Jacket",
        price: 2024,
        category: "Jackets",
        rating: { rate: 3.4, count: 16 },
        image: "https://m.media-amazon.com/images/I/6190gW-q4DL._SY879_.jpg",
      },
      {
        id: "jacket5",
        title: "Casual Jacket",
        description:
          "TAGAS Men's Regular Fit Zip-Up Casual Jacket for MENS || Bomber Jacket for Men || Latest Stylish Jacket For Men ||Men's Regular Fit Zip-Up Casual jacket|| bomber jacket for men (MJ-9090)",
        price: 749,
        category: "Jackets",
        rating: { rate: 3.9, count: 410 },
        image: "https://m.media-amazon.com/images/I/71P4HMBzalL._SY879_.jpg",
      },
      {
        id: "jacket6",
        title: "Bomber Jacket",
        description:
          "GLASGO Men's Casual Bomber Jacket ||Lightweight Zip-Up, Modern Fit, Versatile Winter Warm Stylish - Fall Outerwear || GJ-2-SOLID-$",
        price: 694,
        category: "Jackets",
        rating: { rate: 5.0, count: 11 },
        image: "https://m.media-amazon.com/images/I/61CqfQUvBlL._SY879_.jpg",
      },
      {
        id: "jacket7",
        title: "Faux Leather Jacket",
        description: "Leather Retail Suede Faux Leather Jacket For Men's",
        price: 2198,
        category: "Jackets",
        rating: { rate: 3.9, count: 602 },
        image: "https://m.media-amazon.com/images/I/71ma-aIucEL._SY879_.jpg",
      },
      {
        id: "jacket8",
        title: "A-Line Coat",
        description: "JACK & JONES Men's Polyester Standard A-Line Coat",
        price: 8099,
        category: "Jackets",
        rating: { rate: 4.0, count: 234 },
        image: "https://m.media-amazon.com/images/I/61lpVCS064L._SY879_.jpg",
      },
    ],
    Shoes: [
      {
        id: "shoes1",
        title: "Running Shoes",
        description: "Bacca Bucci Men Lace Up Running Shoes",
        price: 1287,
        category: "shoes",
        rating: { rate: 3.7, count: 2958 },
        image: "https://m.media-amazon.com/images/I/61r9oNywMeL._SY695_.jpg",
      },
      {
        id: "shoes2",
        title: "Casual Sneakers",
        description:
          "BRUTON EVA Lite Sneakers Casual Shoes Walking Shoes for Men-White",
        price: 467,
        category: "shoes",
        rating: { rate: 3.6, count: 121 },
        image: "https://m.media-amazon.com/images/I/71ZXhCT3J8L._SY695_.jpg",
      },
      {
        id: "shoes3",
        title: "Sports Shoes",
        description: "Campus Men Camp-Glacier Running Shoes",
        price: 1099,
        category: "shoes",
        rating: { rate: 4.1, count: 708 },
        image: "https://m.media-amazon.com/images/I/61e6ved+oZL._SY695_.jpg",
      },
      {
        id: "shoes4",
        title: "Formal Leather Shoes",
        description: "Bata Men's Lace-up Formal Shoes",
        price: 767,
        category: "shoes",
        rating: { rate: 3.6, count: 8881 },
        image: "https://m.media-amazon.com/images/I/71rYxtbE8SS._SX695_.jpg",
      },
      {
        id: "shoes5",
        title: "Casual Sneakers",
        description:
          "U.S. POLO ASSN. USPA|Stefan| Stylish Casual Sneaker Shoes for Man",
        price: 2000,
        category: "shoes",
        rating: { rate: 4.4, count: 725 },
        image: "https://m.media-amazon.com/images/I/71Jqccq3+aL._SY695_.jpg",
      },
      {
        id: "shoes6",
        title: "Walking Shoes",
        description: "Campus Men Oxyfit (N) Walking Shoes",
        price: 699,
        category: "shoes",
        rating: { rate: 4.1, count: 24504 },
        image: "https://m.media-amazon.com/images/I/7198NljaZlL._SX695_.jpg",
      },
      {
        id: "shoes7",
        title: "Slip-On Chelsea Boots",
        description:
          "AADI Men's Synthetic Leather Lightweight Comfortable Trendy Outdoor Casual Shoes Slip On Chelsea Boots",
        price: 540,
        category: "shoes",
        rating: { rate: 3.8, count: 420 },
        image: "https://m.media-amazon.com/images/I/71A-T7rYeGL._SY695_.jpg",
      },
      {
        id: "shoes8",
        title: "YOHO Sneakers",
        description:
          "YOHO Trip Sneakers for Men | Stylish Casual Shoes with Elastic Laces | Comfortable, Stretchable & Ultra-Lightweight | Premium Breathable Mesh Fabric",
        price: 1289,
        category: "shoes",
        rating: { rate: 3.7, count: 24 },
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/618vU2qKXQL._AC_UL330_SR330,330_.jpg",
      },
    ],
  },
};

module.exports = products;
