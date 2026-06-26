import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShoppingBag, Sparkles, Heart, Gift, MessageCircle, Truck, User, ShieldCheck, 
  Trash2, Plus, Minus, Search, ArrowRight, Upload, Sliders, ChevronRight, 
  Check, Phone, Eye, Star, Share2, DollarSign, Image as ImageIcon, Send, 
  Volume2, Settings, ListFilter, Languages, HelpCircle, FileText, Info
} from 'lucide-react';
  
const injectFontsAndStyles = () => {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100..900&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
  
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    body {
      font-family: 'Poppins', sans-serif;
      scroll-behavior: smooth;
    }
    .serif-font {
      font-family: 'Playfair Display', serif;
    }
    /* Luxury scrollbar custom stylings */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #FFF8F0;
    }
    ::-webkit-scrollbar-thumb {
      background: #E5989B;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #D4AF37;
    }
  `;
  document.head.appendChild(styleTag);
};
  
const CATEGORIES = {
  PAINTINGS: 'Customized Portrait Paintings',
  HAMPERS: 'Luxury Gift Hampers'
};
  
const INITIAL_PRODUCTS = [
  {
    id: 'paint-01',
    name: 'Eternal Love Couple Portrait',
    category: CATEGORIES.PAINTINGS,
    subCategory: 'Couple Portraits',
    price: 3999,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
    description: 'Transform your favorite couple photograph into a premium masterpiece. Individually customized and crafted by master artists.',
    sizes: [
      { name: 'A4 Size Pencil Sketch', price: 999 },
      { name: 'A3 Size Watercolor Painting', price: 1999 },
      { name: 'Premium Canvas Portrait', price: 3999 },
      { name: 'Museum-Quality Oil Painting', price: 7999 }
    ]
  },
  {
    id: 'paint-02',
    name: 'Legacy Family Canvas Portrait',
    category: CATEGORIES.PAINTINGS,
    subCategory: 'Family Portraits',
    price: 7999,
    rating: 4.8,
    reviewsCount: 89,
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600',
    description: 'A timeless heirloom celebrating family legacy. Designed in an oil paint styling and printed on exquisite canvas material.',
    sizes: [
      { name: 'A3 Size Portrait', price: 3999 },
      { name: 'Premium Classic Canvas', price: 5999 },
      { name: 'Grand Luxury Oil Portrait', price: 7999 }
    ]
  },
  {
    id: 'paint-03',
    name: 'Royal Pet Majesty Portrait',
    category: CATEGORIES.PAINTINGS,
    subCategory: 'Pet Portraits',
    price: 1999,
    rating: 5.0,
    reviewsCount: 204,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    description: 'Drape your beloved pet in gorgeous royal uniforms, hand-drawn into whimsical digital paintings.',
    sizes: [
      { name: 'Digital Art High-Res Copy', price: 999 },
      { name: 'Premium Canvas Wrap', price: 1999 },
      { name: 'Gold-Framed Canvas', price: 2999 }
    ]
  },
  {
    id: 'hamper-01',
    name: 'Royal Amour Celebration Hamper',
    category: CATEGORIES.HAMPERS,
    subCategory: 'Anniversary Hampers',
    price: 3999,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'Luxury Pack',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    description: 'A handpicked curation of luxurious chocolates, ambient scented candles, and imported roses arranged in a gorgeous velvet casket.',
    sizes: [
      { name: 'Standard Celebration Box', price: 1999 },
      { name: 'Grand Velvet Casket', price: 3999 },
      { name: 'Premium Luxury Gold Edition', price: 7999 }
    ]
  },
  {
    id: 'hamper-02',
    name: 'Golden Blossoms Luxury Birthday Box',
    category: CATEGORIES.HAMPERS,
    subCategory: 'Birthday Hampers',
    price: 1999,
    rating: 4.7,
    reviewsCount: 95,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=600',
    description: 'Light up their birthday with a handwoven wooden hamper carrying customized mugs, ambient room fragrance, and chocolates.',
    sizes: [
      { name: 'Mini Birthday Cheer Box', price: 999 },
      { name: 'Standard Fragrant Hamper', price: 1999 },
      { name: 'VVIP Personalized Birthday Basket', price: 3999 }
    ]
  },
  {
    id: 'hamper-03',
    name: 'Golden Velvet Wedding Casket',
    category: CATEGORIES.HAMPERS,
    subCategory: 'Wedding Hampers',
    price: 7999,
    rating: 5.0,
    reviewsCount: 74,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80&w=600',
    description: 'An ultimate wedding compilation with personalized frames, rich chocolates, high-end perfume, and custom notes.',
    sizes: [
      { name: 'Exclusive Couple Hamper', price: 3999 },
      { name: 'Ultimate Imperial Wedding Casket', price: 7999 }
    ]
  }
];
  
const HAMPER_ITEMS = [
  { id: 'item-01', name: 'Ferrero Rocher Box (16 Pcs)', price: 499, icon: '🍫', image: 'https://images.unsplash.com/photo-1549007994-cb92ca87df46?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-02', name: 'Gourmet Lindt Excellence Bar', price: 299, icon: '🍫', image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-03', name: 'Red Roses Handcrafted Bouquet', price: 599, icon: '🌹', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-04', name: 'Elegant Scented Soy Candle', price: 399, icon: '🕯️', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-05', name: 'Personalized Art Mug', price: 499, icon: '☕', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-06', name: 'Premium French Perfume', price: 1299, icon: '✨', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-07', name: 'Charming Teddy Companion', price: 450, icon: '🧸', image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=300' },
  { id: 'item-08', name: 'Luxury Gilt-Edged Photo Frame', price: 590, icon: '🖼️', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=300' }
];
  
const PRESET_BOXES = [
  { id: 'box-pink', name: 'Blush Velvet Box', price: 350, color: '#FFD6E0' },
  { id: 'box-gold', name: 'Gold-Trimmed Imperial Box', price: 550, color: '#D4AF37' },
  { id: 'box-lavender', name: 'Elegant Lavender Case', price: 350, color: '#E6D6FF' },
  { id: 'box-sage', name: 'Sage Green Eco Wooden Box', price: 400, color: '#D8E8D0' }
];
  
const TRANSLATIONS = {
  en: {
    heroTitle: 'Turn Memories Into Masterpieces',
    heroSub: 'Handcrafted Paintings & Personalized Luxury Gift Hampers Designed For Your Loved Ones',
    customPaintingBtn: 'Create Custom Painting',
    buildHamperBtn: 'Build Gift Hamper',
    exploreCollection: 'Explore Collection',
    tagline: 'Made With Love, Crafted For You',
    aboutUs: 'About Us',
    contact: 'Contact',
    cart: 'Shopping Cart',
    trackOrder: 'Track Order',
    aiStudio: 'AI Design Lab',
    hamperStudio: 'Hamper Builder',
    shopTab: 'Shop Luxury',
    dashboard: 'My Account'
  },
  hi: {
    heroTitle: 'यादों को उत्कृष्ट कलाकृतियों में बदलें',
    heroSub: 'आपके प्रियजनों के लिए डिज़ाइन की गई हस्तनिर्मित पेंटिंग और व्यक्तिगत लक्जरी उपहार हैम्पर्स',
    customPaintingBtn: 'कस्टम पेंटिंग बनाएं',
    buildHamperBtn: 'उपहार हैम्पर बनाएं',
    exploreCollection: 'संग्रह का पता लगाएं',
    tagline: 'प्यार से निर्मित, केवल आपके लिए',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क करें',
    cart: 'कार्ट',
    trackOrder: 'ऑर्डर ट्रैकिंग',
    aiStudio: 'एआई आर्ट लैब',
    hamperStudio: 'हैम्पर बिल्डर',
    shopTab: 'शॉप लक्ज़री',
    dashboard: 'मेरा खाता'
  },
  pb: {
    heroTitle: 'ਯਾਦਾਂ ਨੂੰ ਸ਼ਾਨਦਾਰ ਕਲਾਕ੍ਰਿਤੀਆਂ ਵਿੱਚ ਬਦਲੋ',
    heroSub: 'ਤੁਹਾਡੇ ਪਿਆਰਿਆਂ ਲਈ ਤਿਆਰ ਕੀਤੀਆਂ ਹੱਥੀਂ ਬਣਾਈਆਂ ਪੇਂਟਿੰਗਾਂ ਅਤੇ ਲਗਜ਼ਰੀ ਤੋਹਫ਼ੇ ਹੈਂਪਰ',
    customPaintingBtn: 'ਕਸਟਮ ਪੇਂਟਿੰਗ ਬਣਾਓ',
    buildHamperBtn: 'ਹੈਂਪਰ ਬਣਾਓ',
    exploreCollection: 'ਕਲੈਕਸ਼ਨ ਦੇਖੋ',
    tagline: 'ਪਿਆਰ ਨਾਲ ਬਣਾਇਆ, ਸਿਰਫ਼ ਤੁਹਾਡੇ ਲਈ',
    aboutUs: 'ਸਾਡੇ ਬਾਰੇ',
    contact: 'ਸੰਪਰਕ ਕਰੋ',
    cart: 'ਕਾਰਟ',
    trackOrder: 'ਆਰਡਰ ਟ੍ਰੈਕਿੰਗ',
    aiStudio: 'ਏਆਈ ਆਰਟ ਲੈਬ',
    hamperStudio: 'ਹੈਂਪਰ ਬਿਲਡਰ',
    shopTab: 'ਲਗਜ਼ਰੀ ਸ਼ਾਪ',
    dashboard: 'ਮੇਰਾ ਖਾਤਾ'
  }
};
  
export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [activeTheme, setActiveTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  // Cart, Wishlist & Search/Filter states
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(10000);
  const [sortOption, setSortOption] = useState('popular');
  
  // AI Painting Preview Sandbox States
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('watercolor');
  const [aiPreviewImage, setAiPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [ttsCritiquePlaying, setTtsCritiquePlaying] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [useActualGemini, setUseActualGemini] = useState(false);
  
  // Hamper Builder States
  const [hamperBox, setHamperBox] = useState(PRESET_BOXES[0]);
  const [hamperItems, setHamperItems] = useState([]);
  const [hamperGreetings, setHamperGreetings] = useState('');
  
  // AI Occasion Finder States
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [recommendedGift, setRecommendedGift] = useState(null);
  const [isFinding, setIsFinding] = useState(false);
  
  // Interactive Real-Time Chat Simulator States
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'artist', text: 'Namaste! Welcome to FORYOU Luxury Studio. I am Devraj, your lead artist. Share your photograph or order ideas and I will bring them to life!', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isArtistTyping, setIsArtistTyping] = useState(false);
  
  // Tracking System States
  const [trackingId, setTrackingId] = useState('');
  const [activeTracking, setActiveTracking] = useState(null);
  
  // User Dashboard State
  const [orders, setOrders] = useState([
    {
      id: 'FY-89240',
      date: '2026-06-20',
      total: 3999,
      status: 'AI Preview Shared',
      item: 'Eternal Love Couple Portrait (Premium Canvas)',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=150'
    }
  ]);
  
  // Custom interactive notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your custom Watercolor painting design has been reviewed by Senior Artist.', unread: true },
    { id: 2, text: 'Summer Luxe Hamper event is live! Apply code FORYOUGOLD.', unread: false }
  ]);
  
  // Canvas refs for styling uploaded photos
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    injectFontsAndStyles();
  }, []);
  
  // Multi-lingual Helper
  const t = useMemo(() => TRANSLATIONS[language], [language]);
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesPrice = p.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // Default Popular
    });
  }, [products, searchQuery, activeCategory, priceRange, sortOption]);
  
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };
  
  const addToCart = (product, selectedOption = null) => {
    const chosenPrice = selectedOption ? selectedOption.price : product.price;
    const chosenName = selectedOption ? `${product.name} (${selectedOption.name})` : product.name;
    
    const existing = cart.find(item => item.id === product.id && item.option === (selectedOption?.name || ''));
    if (existing) {
      setCart(cart.map(item => 
        (item.id === product.id && item.option === (selectedOption?.name || ''))
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        name: chosenName,
        price: chosenPrice,
        option: selectedOption?.name || '',
        quantity: 1
      }]);
    }
    // Switch view to cart for positive immediate conversion feedback
    setCurrentTab('cart');
  };
  
  const removeFromCart = (id, option) => {
    setCart(cart.filter(item => !(item.id === id && item.option === option)));
  };
  
  const updateCartQty = (id, option, delta) => {
    setCart(cart.map(item => {
      if (item.id === id && item.option === option) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };
  
  const processCanvasFilter = (imgSrc, style) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;
    img.onload = () => {
      // Scale canvas to a reasonable preview size while keeping aspect ratio
      const maxDim = 600;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (height / width) * maxDim;
          width = maxDim;
        } else {
          width = (width / height) * maxDim;
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
  
      // Extract and manipulate pixel data for premium custom stylized filters
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
  
      if (style === 'sketch') {
        // High quality Sobel edge detection or pencil sketch contrast conversion
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          // Grayscale conversion
          let gray = 0.299 * r + 0.587 * g + 0.114 * b;
          // Pencil sketch high contrast line look
          gray = gray > 120 ? 245 : (gray < 50 ? 30 : gray + 40);
          data[i] = gray;
          data[i+1] = gray;
          data[i+2] = gray;
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (style === 'watercolor') {
        // Bright watercolor saturation overlay & soft blending simulation
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.15 + 15);     // Red Boost
          data[i+1] = Math.min(255, data[i+1] * 1.1 + 10); // Green Boost
          data[i+2] = Math.min(255, data[i+2] * 1.25 + 25); // Blue Dreamy Tone
        }
        ctx.putImageData(imgData, 0, 0);
        // Draw decorative abstract paint splatters or overlay light paper texture
        ctx.fillStyle = "rgba(255, 248, 240, 0.15)";
        ctx.fillRect(0, 0, width, height);
      } else if (style === 'oil') {
        // High saturation posterized thick brush style
        for (let i = 0; i < data.length; i += 4) {
          // Posterization of colors to yield paint palette segments
          data[i] = Math.round(data[i] / 45) * 45;
          data[i+1] = Math.round(data[i+1] / 45) * 45;
          data[i+2] = Math.round(data[i+2] / 45) * 45;
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (style === 'digital') {
        // Vivid pop-art high contrast illustration look
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.3);
          data[i+1] = Math.min(255, data[i+1] * 1.1);
          data[i+2] = Math.min(255, data[i+2] * 1.35);
        }
        ctx.putImageData(imgData, 0, 0);
      } else {
        // Canvas Style / Classical
        ctx.putImageData(imgData, 0, 0);
      }
  
      setAiPreviewImage(canvas.toDataURL());
    };
  };
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setAiPreviewImage(null); // Reset preview
    };
    reader.readAsDataURL(file);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setAiPreviewImage(null);
    };
    reader.readAsDataURL(file);
  };
  
  // Generate Preview Handler (Supports real Gemini image API call or smart Canvas simulation fallback)
  const generateArtPreview = async () => {
    if (!uploadedImage) return;
    setIsGenerating(true);
    setGenerationStep('Analyzing reference features and proportions...');
    
    // Step-by-step gorgeous sensory loading simulation
    setTimeout(() => {
      setGenerationStep('Applying high-fidelity premium background textures...');
      setTimeout(async () => {
        setGenerationStep('Synthesizing bespoke color palettes and master strokes...');
        
        if (useActualGemini) {
          // Actual Live Gemini / Imagen Call execution
          try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
            const prompt = `A premium professional customized ${selectedStyle} painting of the person based on reference photo description: ${aiPromptInput || "a beautiful subject portrait with artistic background and exquisite premium lighting"}`;
            const payload = {
              instances: { prompt: prompt },
              parameters: { sampleCount: 1 }
            };
            const res = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (result.predictions && result.predictions[0]?.bytesBase64Encoded) {
              setAiPreviewImage(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
            } else {
              processCanvasFilter(uploadedImage, selectedStyle);
            }
          } catch (err) {
            console.error("Gemini Image API request failed, fallback to local canvas engine", err);
            processCanvasFilter(uploadedImage, selectedStyle);
          }
        } else {
          // High fidelity native rendering
          processCanvasFilter(uploadedImage, selectedStyle);
        }
        
        setIsGenerating(false);
        setGenerationStep('');
      }, 1500);
    }, 1200);
  };
  
  const playArtistCritique = async () => {
    if (ttsCritiquePlaying) return;
    setTtsCritiquePlaying(true);
    
    const promptText = `Praise this customer's premium custom ${selectedStyle} portrait painting in a warm, welcoming artistic tone. Explain how the brushstrokes capture beauty and say 'We have sent this design draft to our physical master workshop'. Keep it short and elegant, under 45 words.`;
  
    try {
      const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Puck" } // Upbeat elegant voice
            }
          }
        }
      };
      
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const part = result?.candidates?.[0]?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;
  
      if (audioData && mimeType) {
        // Convert signed PCM data inside binary structure into playable WAV blob
        const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)?.[1] || "24000", 10);
        const binaryString = atob(audioData);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const pcm16 = new Int16Array(bytes.buffer);
        
        // Convert PCM to WAV
        const wavBlob = pcmToWav(pcm16, sampleRate);
        const audioUrl = URL.createObjectURL(wavBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setTtsCritiquePlaying(false);
      } else {
        // Simulated audio fallback if API limits hit
        const syntheticVoice = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(`Your custom ${selectedStyle} painting looks absolutely stunning! The color balance and delicate shading highlight every detail perfectly. We have forwarded this beautiful design blueprint to our master physical workshop for premium handcrafted canvas creation!`);
        utter.onend = () => setTtsCritiquePlaying(false);
        syntheticVoice.speak(utter);
      }
    } catch (err) {
      console.warn("TTS API call error, falling back to local Speech Synthesis", err);
      const syntheticVoice = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Your custom ${selectedStyle} portrait is masterfully styled! Our artists are excited to finish this physical luxury product for you.`);
      utter.onend = () => setTtsCritiquePlaying(false);
      syntheticVoice.speak(utter);
    }
  };
  
  // Helper converting Int16 PCM array to RIFF/WAVE file
  const pcmToWav = (pcm16, sampleRate) => {
    const buffer = new ArrayBuffer(44 + pcm16.length * 2);
    const view = new DataView(buffer);
    view.setUint32(0, 0x52494646, false); // RIFF
    view.setUint32(4, 36 + pcm16.length * 2, true);
    view.setUint32(8, 0x57415645, false); // WAVE
    view.setUint32(12, 0x666d7420, false); // fmt
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // Linear PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    view.setUint32(36, 0x64617461, false); // data
    view.setUint32(40, pcm16.length * 2, true);
    for (let i = 0; i < pcm16.length; i++) {
      view.setInt16(44 + i * 2, pcm16[i], true);
    }
    return new Blob([buffer], { type: 'audio/wav' });
  };
  
  const toggleHamperItem = (item) => {
    if (hamperItems.some(i => i.id === item.id)) {
      setHamperItems(hamperItems.filter(i => i.id !== item.id));
    } else {
      setHamperItems([...hamperItems, item]);
    }
  };
  
  const totalHamperPrice = useMemo(() => {
    const baseBox = hamperBox?.price || 0;
    const itemsTotal = hamperItems.reduce((acc, curr) => acc + curr.price, 0);
    return baseBox + itemsTotal;
  }, [hamperBox, hamperItems]);
  
  const addCustomHamperToCart = () => {
    const customHamperProduct = {
      id: `custom-hamper-${Date.now()}`,
      name: `Customized "${hamperBox.name}" Luxe Hamper`,
      category: CATEGORIES.HAMPERS,
      price: totalHamperPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300',
      description: `Bespoke combination containing: ${hamperItems.map(i => i.name).join(', ') || 'No custom items'}. Custom Greeting Card: "${hamperGreetings || 'None'}"`
    };
    addToCart(customHamperProduct);
  };
  
  const findPerfectRecommendation = () => {
    if (!recipient || !occasion) return;
    setIsFinding(true);
    setTimeout(() => {
      // Find the absolute closest product catalog item
      let matched = products[0];
      if (occasion === 'Anniversary') {
        matched = products.find(p => p.id === 'paint-01' || p.id === 'hamper-01') || products[0];
      } else if (occasion === 'Birthday') {
        matched = products.find(p => p.id === 'hamper-02' || p.id === 'paint-03') || products[1];
      } else if (recipient === 'Parents') {
        matched = products.find(p => p.id === 'paint-02') || products[1];
      }
      setRecommendedGift(matched);
      setIsFinding(false);
    }, 1200);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const userMsg = { id: Date.now(), sender: 'customer', text: newMessage, time: '10:05 AM' };
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsArtistTyping(true);
  
    // Dynamic smart responses based on user messages
    setTimeout(() => {
      let artistResponseText = "That sounds lovely! I can absolutely sketch that in classic oil canvas or soft pastel shades. Would you like to upload a photo so I can share an interactive AI layout draft?";
      if (newMessage.toLowerCase().includes('price') || newMessage.toLowerCase().includes('cost')) {
        artistResponseText = "Our custom portraits range from ₹999 for standard Pencil Sketch to ₹7,999 for Museum Quality large Oil Paintings. Which sizing suits your living room space best?";
      } else if (newMessage.toLowerCase().includes('time') || newMessage.toLowerCase().includes('delivery')) {
        artistResponseText = "Our hand-sketching and physical preparation takes 3-4 days. We then dispatch it via express luxury courier so it reaches you safely in 5-6 days overall.";
      }
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'artist',
        text: artistResponseText,
        time: '10:06 AM'
      }]);
      setIsArtistTyping(false);
    }, 1500);
  };
  
  const triggerOrderSearch = () => {
    if (!trackingId.trim()) return;
    // Generate simulated elegant tracking structure based on simulated order ID
    setActiveTracking({
      id: trackingId.toUpperCase(),
      productName: 'Eternal Love Watercolor Portrait - Gold Framed',
      currentStatus: 'Quality Checked & Packed',
      steps: [
        { title: 'Order Received & Verified', date: 'June 20, 2026', done: true },
        { title: 'Designing Sketch Draft', date: 'June 21, 2026', done: true },
        { title: 'AI Preview Shared & Approved', date: 'June 22, 2026', done: true },
        { title: 'Bespoke Framing & Painting Process', date: 'June 23, 2026', done: true },
        { title: 'Premium Packaging & Quality Assurance', date: 'June 24, 2026', done: true },
        { title: 'Handed to Express Courier', date: 'Expected June 25, 2026', done: false },
        { title: 'Delivered with Love', date: 'Expected June 27, 2026', done: false }
      ]
    });
  };

  const handlePlaceOrder = () => {
    // Generate fresh mock order
    const newOrderId = `FY-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      total: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
      status: 'Order Placed',
      item: cart.map(i => `${i.name} (x${i.quantity})`).join(', '),
      image: cart[0]?.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=150'
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    
    // Auto populate tracking key
    setTrackingId(newOrderId);
    setCurrentTab('tracking');
    triggerOrderSearch();
  };
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${activeTheme === 'dark' ? 'bg-[#121212] text-gray-100' : 'bg-[#FFF8F0] text-[#4A3E3D]'}`}>
      
      {/* Offscreen canvas strictly for rendering custom filters */}
      <canvas ref={canvasRef} className="hidden" />
  
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#E5989B]/20 shadow-sm transition-all duration-300 px-4 py-3 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-10 h-10 rounded-full bg-[#FFD6E0] flex items-center justify-center border-2 border-[#D4AF37] shadow-inner">
            <span className="serif-font font-black text-[#E5989B] text-xl">U</span>
          </div>
          <div>
            <h1 className="serif-font text-2xl font-extrabold tracking-wider text-[#E5989B] hover:text-[#D4AF37] transition-colors">FORYOU</h1>
            <p className="text-[9px] tracking-widest font-semibold uppercase text-gray-400">Crafted For Memories</p>
          </div>
        </div>
  
        {/* Central Nav links */}
        <div className="hidden md:flex items-center gap-6 font-medium text-sm">
          <button onClick={() => setCurrentTab('home')} className={`hover:text-[#E5989B] transition-colors ${currentTab === 'home' ? 'text-[#E5989B] border-b-2 border-[#E5989B]' : ''}`}>{t.exploreCollection}</button>
          <button onClick={() => setCurrentTab('shop')} className={`hover:text-[#E5989B] transition-colors ${currentTab === 'shop' ? 'text-[#E5989B] border-b-2 border-[#E5989B]' : ''}`}>{t.shopTab}</button>
          <button onClick={() => setCurrentTab('ai-preview')} className={`hover:text-[#E5989B] transition-colors flex items-center gap-1 ${currentTab === 'ai-preview' ? 'text-[#E5989B] border-b-2 border-[#E5989B]' : ''}`}>
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" /> 
            {t.aiStudio}
          </button>
          <button onClick={() => setCurrentTab('build-hamper')} className={`hover:text-[#E5989B] transition-colors ${currentTab === 'build-hamper' ? 'text-[#E5989B] border-b-2 border-[#E5989B]' : ''}`}>{t.hamperStudio}</button>
          <button onClick={() => setCurrentTab('tracking')} className={`hover:text-[#E5989B] transition-colors ${currentTab === 'tracking' ? 'text-[#E5989B] border-b-2 border-[#E5989B]' : ''}`}>{t.trackOrder}</button>
        </div>
  
        {/* Action utility selectors (Cart, Wishlist, Themes, Language, Profile) */}
        <div className="flex items-center gap-4">
          
          {/* Language selection dropdown */}
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 text-xs">
              <Languages className="w-4 h-4 text-[#E5989B]" />
              <span className="uppercase font-semibold">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden scale-0 group-hover:scale-100 transition-transform origin-top-right text-gray-800 w-28">
              <button onClick={() => setLanguage('en')} className="w-full py-2 px-3 text-left hover:bg-[#FFF8F0] text-xs">English</button>
              <button onClick={() => setLanguage('hi')} className="w-full py-2 px-3 text-left hover:bg-[#FFF8F0] text-xs">Hindi</button>
              <button onClick={() => setLanguage('pb')} className="w-full py-2 px-3 text-left hover:bg-[#FFF8F0] text-xs">Punjabi</button>
            </div>
          </div>
  
          {/* Theme switcher */}
          <button 
            onClick={() => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 hover:text-[#E5989B]"
            title="Toggle theme"
          >
            {activeTheme === 'light' ? '🌙' : '☀️'}
          </button>
  
          {/* Chat shortcut button */}
          <button 
            onClick={() => setCurrentTab('chat')} 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-[#E5989B]"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white font-bold rounded-full text-[9px] w-4 h-4 flex items-center justify-center animate-bounce">1</span>
          </button>
  
          {/* Wishlist */}
          <button onClick={() => { setCurrentTab('shop'); setActiveCategory('All'); }} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-[#E5989B]">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-400 text-white font-bold rounded-full text-[9px] w-4 h-4 flex items-center justify-center">{wishlist.length}</span>
            )}
          </button>
  
          {/* Cart with count badge */}
          <button onClick={() => setCurrentTab('cart')} className="relative p-2 bg-[#FFD6E0] hover:bg-[#E5989B] rounded-full transition-all text-[#E5989B] hover:text-white px-3 py-2 flex items-center gap-1 border border-dashed border-[#E5989B]">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold">{cart.length}</span>
          </button>
  
          {/* Dashboard Profile */}
          <button onClick={() => setCurrentTab('dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-[#E5989B]">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
  
      {/* Mobile Sticky Quick navigation menu bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 z-50 flex justify-around py-3 text-xs text-gray-600 shadow-xl backdrop-blur-md">
        <button onClick={() => setCurrentTab('home')} className={`flex flex-col items-center gap-1 ${currentTab === 'home' ? 'text-[#E5989B]' : ''}`}>
          <Gift className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button onClick={() => setCurrentTab('shop')} className={`flex flex-col items-center gap-1 ${currentTab === 'shop' ? 'text-[#E5989B]' : ''}`}>
          <ShoppingBag className="w-5 h-5" />
          <span>Shop</span>
        </button>
        <button onClick={() => setCurrentTab('ai-preview')} className={`flex flex-col items-center gap-1 ${currentTab === 'ai-preview' ? 'text-[#E5989B]' : ''}`}>
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>AI Lab</span>
        </button>
        <button onClick={() => setCurrentTab('build-hamper')} className={`flex flex-col items-center gap-1 ${currentTab === 'build-hamper' ? 'text-[#E5989B]' : ''}`}>
          <Sliders className="w-5 h-5" />
          <span>Hamper</span>
        </button>
        <button onClick={() => setCurrentTab('cart')} className={`flex flex-col items-center gap-1 ${currentTab === 'cart' ? 'text-[#E5989B]' : ''}`}>
          <ShoppingBag className="w-5 h-5" />
          <span>Cart ({cart.length})</span>
        </button>
      </div>
  
      {currentTab === 'home' && (
        <div className="animate-fadeIn">
          
          {/* Main Hero Showcase */}
          <header className="relative py-12 lg:py-24 px-4 lg:px-12 bg-gradient-to-br from-[#FFF8F0] via-[#FFD6E0]/20 to-[#E6D6FF]/15 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E6D6FF] text-[#E5989B] border border-[#E5989B]/30 mb-6 uppercase tracking-wider">
                  ✨ Celebrated Luxury Gifting Portal
                </span>
                <h1 className="serif-font text-4xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-800 dark:text-white">
                  {t.heroTitle}
                </h1>
                <p className="text-base lg:text-lg text-gray-500 mb-8 max-w-lg leading-relaxed font-light">
                  {t.heroSub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setCurrentTab('ai-preview')}
                    className="px-8 py-4 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] text-white font-bold transition-all shadow-lg shadow-rose-200/50 flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-5 h-5" />
                    {t.customPaintingBtn}
                  </button>
                  <button 
                    onClick={() => setCurrentTab('build-hamper')}
                    className="px-8 py-4 rounded-xl bg-white hover:bg-[#FAF3EA] text-[#E5989B] border border-[#E5989B] font-bold transition-all flex items-center gap-2"
                  >
                    <Gift className="w-5 h-5" />
                    {t.buildHamperBtn}
                  </button>
                </div>
  
                {/* Animated counters row */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200/30">
                  <div>
                    <h4 className="serif-font text-3xl font-bold text-[#E5989B]">5k+</h4>
                    <p className="text-xs text-gray-400">Happy Clients</p>
                  </div>
                  <div>
                    <h4 className="serif-font text-3xl font-bold text-[#D4AF37]">10k+</h4>
                    <p className="text-xs text-gray-400">Gifts Dispatched</p>
                  </div>
                  <div>
                    <h4 className="serif-font text-3xl font-bold text-[#E5989B]">4.9⭐</h4>
                    <p className="text-xs text-gray-400">Average Rating</p>
                  </div>
                </div>
              </div>
  
              {/* Decorative side-by-side Hero visual montage */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" 
                    alt="Couple Portrait Showcase" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <p className="serif-font italic text-lg text-amber-200">"The best anniversary surprise ever. Truly flawless!"</p>
                    <span className="text-xs text-gray-300">- Shalini & Rohan</span>
                  </div>
                </div>
  
                {/* Overlaid absolute positioning luxury card */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-amber-200 flex items-center gap-3 animate-bounce">
                  <img 
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=150" 
                    alt="Luxury Hamper miniature" 
                    className="w-12 h-12 rounded-xl object-cover" 
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-800">Double Luxe Hamper</p>
                    <p className="text-[10px] text-amber-600 font-bold">Premium Wood Wrap</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
  
          <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFD6E0]/40 via-[#E6D6FF]/40 to-[#FFF8F0] rounded-3xl p-8 lg:p-12 shadow-sm border border-white/50">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs font-bold text-[#E5989B] uppercase tracking-wider">⚡ Intelligently Personalized</span>
                <h2 className="serif-font text-3xl font-bold mt-1 text-gray-800">Find The Perfect Gift in 1-Click</h2>
                <p className="text-xs text-gray-400 mt-2">Specify who you are gifting and the special milestone, our AI Curator matches our luxury inventory instantly.</p>
              </div>
  
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
                
                {/* Recipient Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Who Are You Gifting?</label>
                  <select 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-white border border-[#E5989B]/20 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5989B]"
                  >
                    <option value="">Select Recipient</option>
                    <option value="Boyfriend">Boyfriend / Husband</option>
                    <option value="Girlfriend">Girlfriend / Wife</option>
                    <option value="Parents">Parents</option>
                    <option value="Friends">Best Friends</option>
                    <option value="Colleagues">Corporate Colleagues</option>
                  </select>
                </div>
  
                {/* Occasion Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">What Is The Special Occasion?</label>
                  <select 
                    value={occasion} 
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-white border border-[#E5989B]/20 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5989B]"
                  >
                    <option value="">Select Occasion</option>
                    <option value="Birthday">Grand Birthday Celebration</option>
                    <option value="Anniversary">Romantic Anniversary</option>
                    <option value="Wedding">Dream Wedding Day</option>
                    <option value="Festival">Festive Cheer</option>
                  </select>
                </div>
  
                {/* CTA Action button */}
                <button 
                  onClick={findPerfectRecommendation}
                  className="w-full bg-[#E5989B] hover:bg-[#D4AF37] text-white p-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-6 md:mt-0"
                >
                  <Sparkles className="w-4 h-4" />
                  {isFinding ? 'AI Curator is scanning...' : 'Match Best Gift'}
                </button>
              </div>
  
              {/* Dynamic matched recommended result card */}
              {recommendedGift && (
                <div className="mt-8 max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-xl border border-rose-100 flex gap-4 animate-scaleUp">
                  <img src={recommendedGift.image} alt={recommendedGift.name} className="w-24 h-24 rounded-xl object-cover" />
                  <div>
                    <span className="px-2 py-0.5 bg-[#FFF8F0] text-[#D4AF37] rounded font-bold text-[10px] uppercase border border-[#D4AF37]/30">Matched Masterpiece</span>
                    <h3 className="serif-font font-bold text-lg mt-1 text-gray-800">{recommendedGift.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{recommendedGift.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-extrabold text-base text-[#E5989B]">₹{recommendedGift.price}</span>
                      <button 
                        onClick={() => addToCart(recommendedGift)}
                        className="px-3 py-1.5 bg-[#FFD6E0] hover:bg-[#E5989B] text-[#E5989B] hover:text-white rounded-lg text-xs font-bold transition-all"
                      >
                        Add To Bag
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
  
          {/* Painting creation Step-by-Step interactive process timeline */}
          <section className="py-16 px-4 bg-[#FAF3EA] dark:bg-[#1C1C1C]">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <span className="text-[#E5989B] font-bold text-xs uppercase tracking-widest">How We Design Magic</span>
              <h2 className="serif-font text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mt-1">Our Seven-Step Artistic Process</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
              {[
                { step: '1', title: 'Upload Photo', desc: 'Share your memory' },
                { step: '2', title: 'Artist Sketch', desc: 'Handcrafted layouts' },
                { step: '3', title: 'AI Preview', desc: 'Interactive filters' },
                { step: '4', title: 'Your Approval', desc: 'Approve or customize' },
                { step: '5', title: 'Painting Room', desc: 'Brush strokes' },
                { step: '6', title: 'Quality Check', desc: 'Perfect contrast' },
                { step: '7', title: 'Door Delivery', desc: 'Delivered with love' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#252525] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-rose-100/40 text-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#FFD6E0] text-[#E5989B] font-black mx-auto flex items-center justify-center text-sm mb-3">
                    {item.step}
                  </div>
                  <h4 className="serif-font font-bold text-sm text-gray-700 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
  
          <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">🌟 Elite Selections</span>
                <h2 className="serif-font text-3xl font-extrabold text-gray-800 dark:text-white mt-1">Gifts of Love, Handcrafted with Care</h2>
              </div>
              <button onClick={() => setCurrentTab('shop')} className="mt-4 md:mt-0 text-[#E5989B] hover:text-[#D4AF37] font-semibold flex items-center gap-1 text-sm">
                View Entire Collection <ChevronRight className="w-4 h-4" />
              </button>
            </div>
  
            <div className="grid md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((prod) => (
                <div key={prod.id} className="bg-white dark:bg-[#222] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <button 
                      onClick={() => toggleWishlist(prod)}
                      className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full shadow hover:bg-rose-50 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === prod.id) ? 'fill-rose-400 text-rose-400' : 'text-gray-400'}`} />
                    </button>
                    {prod.badge && (
                      <span className="absolute top-4 left-4 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">{prod.category}</span>
                    <h3 className="serif-font font-bold text-lg text-gray-800 dark:text-white leading-snug hover:text-[#E5989B] cursor-pointer" onClick={() => { setSelectedProduct(prod); }}>
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 mb-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{prod.rating}</span>
                      <span className="text-[10px] text-gray-400">({prod.reviewsCount} verified reviews)</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-grow">{prod.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div>
                        <p className="text-[10px] text-gray-400">Premium Price starts at</p>
                        <span className="serif-font font-black text-xl text-[#E5989B]">₹{prod.price}</span>
                      </div>
                      <button 
                        onClick={() => { setSelectedProduct(prod); }}
                        className="px-4 py-2 bg-[#E5989B] hover:bg-[#D4AF37] text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Customize Option
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Social Proof / Artistic Studio video testimonial simulation block */}
          <section className="py-16 px-4 bg-gradient-to-br from-[#FFD6E0]/20 to-[#E6D6FF]/20">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-md border border-rose-100/40 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-[#E5989B] uppercase tracking-wider">🌿 Handcrafted Masterpieces</span>
                <h3 className="serif-font text-2xl lg:text-4xl font-bold text-gray-800 mt-2">"We paint feelings, not just faces"</h3>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Every brush stroke is carefully evaluated by physical designers. We employ multiple mockups, high-end frame material, and double varnish layers to ensure that your gifts preserve memory forever.
                </p>
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E6D6FF] flex items-center justify-center">✔️</div>
                    <span className="text-xs font-semibold text-gray-600">100% Cotton Canvas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D8E8D0] flex items-center justify-center">✔️</div>
                    <span className="text-xs font-semibold text-gray-600">Waterproof Ink</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-[#D4AF37]/20 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=600" 
                  alt="Artist Painting close up" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-12 h-12 rounded-full bg-white text-[#E5989B] flex items-center justify-center font-bold shadow-lg transform hover:scale-110 transition-transform">
                    ▶️
                  </button>
                </div>
              </div>
            </div>
          </section>
  
        </div>
      )}
  
      {currentTab === 'shop' && (
        <div className="py-10 px-4 lg:px-12 max-w-7xl mx-auto animate-fadeIn">
          <div className="text-center mb-10">
            <span className="text-[#E5989B] font-bold text-xs uppercase tracking-widest">Royal Catalog</span>
            <h2 className="serif-font text-3xl lg:text-5xl font-extrabold text-gray-800 mt-1">Our Curated Luxury Items</h2>
            <p className="text-xs text-gray-400 mt-2">Bespoke customized canvases and carefully formatted premium hampers.</p>
          </div>
  
          {/* Filtering Layout Row */}
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl shadow-sm border border-rose-100/40 h-fit space-y-6">
              
              {/* Category selector */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1">
                  <ListFilter className="w-4 h-4 text-[#E5989B]" /> Select Category
                </h4>
                <div className="space-y-1">
                  {['All', CATEGORIES.PAINTINGS, CATEGORIES.HAMPERS].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all ${activeCategory === cat ? 'bg-[#FFD6E0] text-[#E5989B]' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price selector */}
              <div>
                <div className="flex justify-between items-center mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>Price Range Limit</span>
                  <span className="text-[#E5989B]">₹{priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="999" 
                  max="10000" 
                  step="500"
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#E5989B]" 
                />
              </div>
  
              {/* Sorting option */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Sort Collection By</h4>
                <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-white border border-[#E5989B]/20 rounded-xl p-2.5 text-xs focus:outline-none"
                >
                  <option value="popular">Popularity / Stars</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated Only</option>
                </select>
              </div>
  
              {/* Search Bar */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Search Products</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search paintings, chocolates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs pl-8 focus:ring-1 focus:ring-[#E5989B] outline-none" 
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-3.5 text-gray-400" />
                </div>
              </div>
            </aside>
  
            {/* Product items display list */}
            <main className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl p-8 border border-dashed border-gray-200">
                  <p className="text-gray-400 text-sm">No items matching your select criteria. Try resetting price filters.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredProducts.map(prod => (
                    <div key={prod.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-rose-100/30 flex flex-col h-full group">
                      <div className="relative aspect-square">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button 
                          onClick={() => toggleWishlist(prod)}
                          className="absolute top-3 right-3 bg-white/95 p-2 rounded-full shadow hover:bg-rose-50"
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlist.some(w => w.id === prod.id) ? 'fill-rose-400 text-rose-400' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">{prod.category}</span>
                        <h3 className="serif-font font-bold text-base text-gray-800 dark:text-white leading-tight mb-2 hover:text-[#E5989B] cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                          {prod.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-semibold text-gray-600">{prod.rating}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                          <div>
                            <p className="text-[9px] text-gray-400">Starting price</p>
                            <span className="serif-font font-black text-lg text-[#E5989B]">₹{prod.price}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedProduct(prod)}
                            className="px-3 py-1.5 bg-[#FFD6E0] hover:bg-[#E5989B] text-[#E5989B] hover:text-white rounded-lg text-[11px] font-bold transition-all"
                          >
                            Customize
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      )}
  
      {currentTab === 'ai-preview' && (
        <div className="py-10 px-4 lg:px-12 max-w-7xl mx-auto animate-fadeIn">
          <div className="text-center mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E6D6FF] text-[#E5989B] border border-[#E5989B]/20">
              ⚡ Leading Generative Art Simulator
            </span>
            <h2 className="serif-font text-3xl lg:text-5xl font-extrabold text-gray-800 mt-3">Interactive AI Painting Studio</h2>
            <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">Upload your couple, family or pet photo, select your choice style, and watch our artificial intelligence model create a hand-drawn preview instantly!</p>
          </div>
  
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel: Photo upload & styles option */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-6">
              
              {/* Image upload zone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">1. Upload Photo (Mobile Gallery, Camera, Desktop Explorer)</label>
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#E5989B]/40 hover:border-[#E5989B] bg-[#FFF8F0] rounded-2xl p-6 text-center cursor-pointer transition-colors"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden" 
                  />
                  {uploadedImage ? (
                    <div className="relative aspect-video max-h-40 rounded-xl overflow-hidden mx-auto border border-amber-200">
                      <img src={uploadedImage} alt="Uploaded source" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-bold">Replace Photo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-[#E5989B] shadow-sm">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">Drag and drop photo here, or click to browse</p>
                      <p className="text-[10px] text-gray-400">Supports JPG, PNG, WEBP, HEIC</p>
                    </div>
                  )}
                </div>
              </div>
  
              {/* Style selection selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">2. Select Handcraft Painting Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'watercolor', name: 'Watercolor Paint', icon: '🎨' },
                    { id: 'oil', name: 'Royal Oil', icon: '🖼️' },
                    { id: 'sketch', name: 'Pencil Sketch', icon: '✏️' },
                    { id: 'digital', name: 'Dreamy Digital', icon: '✨' },
                    { id: 'canvas', name: 'Raw Canvas Layout', icon: '🪵' }
                  ].map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${selectedStyle === style.id ? 'border-[#E5989B] bg-[#FFD6E0]/40 shadow-inner' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <span className="text-lg">{style.icon}</span>
                      <span className="text-[10px] font-bold text-gray-700 leading-none">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Custom Prompt Context */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">3. Describe details (Background/Details - Optional)</label>
                <textarea 
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  placeholder="e.g. Add glowing golden background, soft natural lights, or classic studio feel..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#E5989B] outline-none"
                  rows="2"
                />
              </div>
  
              {/* Toggle Actual Generative Imagen API vs Smart Canvas Sandbox */}
              <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/40">
                <div>
                  <h5 className="text-[11px] font-bold text-indigo-900 uppercase">Interactive generative AI Engine</h5>
                  <p className="text-[9px] text-indigo-500 font-semibold">Enable genuine high-resolution synthesized AI output</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={useActualGemini} 
                  onChange={(e) => setUseActualGemini(e.target.checked)}
                  className="w-4 h-4 accent-[#E5989B]" 
                />
              </div>
  
              {/* Trigger Button */}
              <button
                onClick={generateArtPreview}
                disabled={!uploadedImage || isGenerating}
                className="w-full py-4 rounded-xl bg-[#E5989B] disabled:bg-gray-200 hover:bg-[#D4AF37] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? 'Rendering Custom Canvas...' : 'Generate AI Preview'}
              </button>
            </div>
  
            {/* Display Sandbox: Side-by-side comparative split screen slider */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-sm text-gray-800">Bespoke Comparative Layout Sandbox</h4>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500">Left: Original</span>
                    <span className="px-2 py-0.5 bg-[#FFD6E0] rounded text-[10px] font-bold text-[#E5989B]">Right: AI Styled Draft</span>
                  </div>
                </div>
  
                {isGenerating ? (
                  <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#FFF8F0] via-[#FFD6E0]/20 to-[#E6D6FF]/15 flex flex-col items-center justify-center p-6 border text-center animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-[#E5989B] border-t-transparent animate-spin mb-4" />
                    <p className="serif-font text-lg font-bold text-gray-800">{generationStep}</p>
                    <p className="text-xs text-gray-400 mt-1">Simulating artist tools on custom cotton canvas...</p>
                  </div>
                ) : uploadedImage ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 select-none">
                    
                    {/* Render base image */}
                    <img 
                      src={aiPreviewImage || uploadedImage} 
                      alt="Transformed art" 
                      className="w-full h-full object-cover" 
                    />
  
                    {/* Left layer sliding split */}
                    {aiPreviewImage && (
                      <div 
                        className="absolute inset-y-0 left-0 overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                      >
                        <img 
                          src={uploadedImage} 
                          alt="Source original file" 
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{width: canvasRef.current?.width || '100%', maxWidth: 'none' }}
                        />
                      </div>
                    )}
  
                    {/* Interactive drag slider bar */}
                    {aiPreviewImage && (
                      <div 
                        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-[#E5989B] flex items-center justify-center text-[10px] font-bold text-[#E5989B]">
                          ↔️
                        </div>
                      </div>
                    )}
  
                    {/* Split control slider range selector */}
                    {aiPreviewImage && (
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPosition} 
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full" 
                      />
                    )}
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
                    <p className="text-xs">No photograph selected yet. Drag a picture in the upload container to generate design.</p>
                  </div>
                )}
  
                {/* Microinteractions: Listen to critic comments & artist actions */}
                {aiPreviewImage && (
                  <div className="mt-6 flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={playArtistCritique}
                      className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 className={`w-4 h-4 ${ttsCritiquePlaying ? 'animate-bounce text-[#E5989B]' : ''}`} />
                      {ttsCritiquePlaying ? 'Artist Critiquing Live...' : 'Listen to Artist critique'}
                    </button>
  
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          addToCart({
                            id: `ai-order-${Date.now()}`,
                            name: `Custom Painting - ${selectedStyle.toUpperCase()}`,
                            category: CATEGORIES.PAINTINGS,
                            price: 3999,
                            image: aiPreviewImage,
                            description: `Personalized masterpiece reference: ${uploadedFileName || 'Customer file'}`
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] text-white text-xs font-bold transition-colors"
                      >
                        Approve Design & Order Portrait
                      </button>
                      <button 
                        onClick={() => setCurrentTab('chat')}
                        className="px-4 py-2.5 rounded-xl bg-[#FFF8F0] hover:bg-[#FAF3EA] text-[#E5989B] border border-[#E5989B] text-xs font-bold transition-colors"
                      >
                        Chat with Artist
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Premium Artist note / guarantee cards */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 flex gap-3">
                <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
                <div>
                  <h5 className="font-bold text-xs text-amber-900 uppercase">100% Artist Originality Assurance</h5>
                  <p className="text-[11px] text-amber-700/80 mt-1">Our AI drafts serve solely as structural drafts. Every single stroke in the physical frame you purchase will be hand-painted by professional veteran designers with museum-quality standards.</p>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      )}
  
      {currentTab === 'build-hamper' && (
        <div className="py-10 px-4 lg:px-12 max-w-7xl mx-auto animate-fadeIn">
          <div className="text-center mb-10">
            <span className="text-[#E5989B] font-bold text-xs uppercase tracking-widest">Imperial Hamper Studio</span>
            <h2 className="serif-font text-3xl lg:text-5xl font-extrabold text-gray-800 mt-1">Build Your Own Custom Gift Hamper</h2>
            <p className="text-xs text-gray-400 mt-2">Pick your casket luxury base box and add imported items to generate unique curated surprises!</p>
          </div>
  
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Box style & items checklist selectors */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-6">
              
              {/* Box select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">1. Select Luxury Outer Case/Box Base</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PRESET_BOXES.map(box => (
                    <button
                      key={box.id}
                      onClick={() => setHamperBox(box)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${hamperBox.id === box.id ? 'border-[#E5989B] bg-rose-50/50' : 'border-gray-100'}`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-200" 
                        style={{ backgroundColor: box.color }}
                      />
                      <h5 className="font-bold text-[10px] text-gray-700 leading-tight">{box.name}</h5>
                      <span className="text-[11px] text-[#E5989B] font-semibold">₹{box.price}</span>
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Add custom inventory items */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">2. Choose Gourmet Chocolates, Flowers, Frames & Perfumes</label>
                <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {HAMPER_ITEMS.map(item => {
                    const isSelected = hamperItems.some(i => i.id === item.id);
                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleHamperItem(item)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'border-[#E5989B] bg-rose-50/20' : 'border-gray-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h5 className="font-bold text-xs text-gray-700 leading-snug">{item.name}</h5>
                            <span className="text-[11px] text-[#E5989B] font-semibold">₹{item.price}</span>
                          </div>
                        </div>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${isSelected ? 'bg-[#E5989B] text-white border-transparent' : 'border-gray-300'}`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
  
              {/* Add Personalized message card context */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">3. Write Personalized Greeting Card Text</label>
                <textarea 
                  value={hamperGreetings}
                  onChange={(e) => setHamperGreetings(e.target.value)}
                  placeholder="e.g. Happy 25th Anniversary Mom & Dad! From your dearest kids..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#E5989B]"
                  rows="3"
                />
              </div>
  
            </div>
  
            {/* Simulated Live visual basket box representation preview */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 text-center space-y-4">
                <h4 className="serif-font font-bold text-lg text-gray-800">Your Created Luxury Casket Hamper</h4>
                
                {/* Visual grid render representing the interior of box */}
                <div 
                  className="w-full aspect-square max-w-sm mx-auto rounded-3xl p-5 border-4 flex flex-col justify-between transition-all"
                  style={{ backgroundColor: hamperBox?.color || '#FFF8F0', borderColor: '#D4AF37' }}
                >
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase text-amber-900/60 tracking-wider">Premium Box: {hamperBox?.name}</span>
                  </div>
  
                  {/* Filled Items List view */}
                  <div className="grid grid-cols-3 gap-2 my-4 flex-grow items-center justify-center">
                    {hamperItems.length === 0 ? (
                      <div className="col-span-3 text-center py-10">
                        <p className="text-xs text-amber-900/40 italic">Add items from the menu checklist on the left side to populate the hamper container</p>
                      </div>
                    ) : (
                      hamperItems.map(item => (
                        <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center shadow-sm border border-[#D4AF37]/10 flex flex-col items-center justify-center animate-scaleUp">
                          <span className="text-xl mb-1">{item.icon}</span>
                          <span className="text-[9px] font-bold text-gray-700 leading-tight line-clamp-1">{item.name}</span>
                        </div>
                      ))
                    )}
                  </div>
  
                  {/* Ribbon decorative wrap illustration */}
                  <div className="pt-2 border-t border-amber-900/20 text-center">
                    <span className="text-xs font-bold text-amber-950">💝 Gold Silk Ribbon Wrapped</span>
                  </div>
                </div>
  
                {/* Greeting Card Preview */}
                {hamperGreetings && (
                  <div className="bg-[#FFF8F0] p-4 rounded-xl border border-dashed border-[#E5989B]/40 text-left max-w-sm mx-auto">
                    <span className="text-[9px] font-bold uppercase text-[#E5989B]">Greeting Card Inscribed Details</span>
                    <p className="serif-font italic text-xs text-gray-700 mt-1 leading-relaxed">"{hamperGreetings}"</p>
                  </div>
                )}
  
                {/* Recalculated pricing summary list */}
                <div className="border-t border-gray-100 pt-4 space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Base Casket Box Price</span>
                    <span>₹{hamperBox?.price}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Selected items count ({hamperItems.length})</span>
                    <span>₹{hamperItems.reduce((acc, curr) => acc + curr.price, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t">
                    <span>Dynamic Total Price</span>
                    <span className="text-[#E5989B] text-base">₹{totalHamperPrice}</span>
                  </div>
                </div>
  
                <button
                  onClick={addCustomHamperToCart}
                  disabled={hamperItems.length === 0}
                  className="w-full py-4 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] disabled:bg-gray-200 text-white font-bold transition-all flex items-center justify-center gap-2 max-w-sm mx-auto"
                >
                  <ShoppingBag className="w-5 h-5" /> Add Customized Basket to Cart
                </button>
              </div>
  
            </div>
          </div>
        </div>
      )}
  
      {currentTab === 'cart' && (
        <div className="py-10 px-4 lg:px-12 max-w-7xl mx-auto animate-fadeIn">
          <h2 className="serif-font text-3xl lg:text-5xl font-extrabold text-gray-800 mb-10 text-center">{t.cart}</h2>
  
          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl p-8 border border-dashed border-gray-200 max-w-xl mx-auto">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base font-medium mb-6">Your shopping cart is currently empty.</p>
              <button 
                onClick={() => setCurrentTab('shop')}
                className="px-6 py-3 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] text-white font-bold transition-all text-sm"
              >
                Go Shop Luxury Collection
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Items display table */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-4">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.option}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FFF8F0]/40 rounded-xl border border-rose-100/30 gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h4 className="serif-font font-bold text-sm text-gray-800 leading-snug">{item.name}</h4>
                        <p className="text-xs text-[#E5989B] font-semibold mt-0.5">₹{item.price}</p>
                      </div>
                    </div>
  
                    {/* Quantity Adjustment Buttons */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateCartQty(item.id, item.option, -1)}
                        className="p-1 rounded-md bg-white border hover:bg-gray-50 text-gray-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-gray-700 w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, item.option, 1)}
                        className="p-1 rounded-md bg-white border hover:bg-gray-50 text-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
  
                    {/* Delete Item button */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.option)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
  
              {/* Price Calculation and simulated checkout pay gate */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-6">
                <h4 className="serif-font font-bold text-lg text-gray-800 pb-3 border-b border-gray-100">Checkout Price Invoice</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Cart Subtotal</span>
                    <span>₹{cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Express Handcrafted Packaging</span>
                    <span className="text-green-600 font-bold">FREE (Premium Promo)</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Standard Express Shipping</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800 pt-3 border-t">
                    <span>Final Amount Payable</span>
                    <span className="text-[#E5989B] text-lg">₹{cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</span>
                  </div>
                </div>
  
                {/* Checkout forms */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="block text-[10px] font-bold uppercase text-gray-500">Delivery Address Details</label>
                  <input type="text" placeholder="Full Recipient Name" className="w-full border p-2.5 rounded-lg text-xs" />
                  <input type="text" placeholder="Contact Telephone Number" className="w-full border p-2.5 rounded-lg text-xs" />
                  <textarea placeholder="Complete Shipping Address (with Pin Code)" className="w-full border p-2.5 rounded-lg text-xs" rows="2" />
                </div>
  
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" /> Confirm & Place Order (Razorpay/UPI)
                </button>
              </div>
  
            </div>
          )}
        </div>
      )}
  
      {currentTab === 'tracking' && (
        <div className="py-10 px-4 max-w-3xl mx-auto animate-fadeIn">
          <div className="text-center mb-10">
            <span className="text-[#E5989B] font-bold text-xs uppercase tracking-widest">Real-Time Dispatch Courier</span>
            <h2 className="serif-font text-3xl lg:text-4xl font-extrabold text-gray-800 mt-1">Express Order Tracking</h2>
            <p className="text-xs text-gray-400 mt-2">Check the progress status of your customized portraits or gift boxes.</p>
          </div>
  
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-6">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Order Identification ID (e.g., FY-89240)" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-grow border border-gray-200 rounded-xl p-3.5 text-xs focus:ring-1 focus:ring-[#E5989B] outline-none font-bold uppercase" 
              />
              <button 
                onClick={triggerOrderSearch}
                className="px-6 py-3.5 rounded-xl bg-[#E5989B] hover:bg-[#D4AF37] text-white font-bold transition-all text-xs"
              >
                Track Now
              </button>
            </div>
  
            {activeTracking ? (
              <div className="pt-6 border-t border-gray-100 space-y-6 animate-scaleUp">
                <div className="flex justify-between items-center bg-[#FFF8F0] p-4 rounded-xl border">
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-400 uppercase">Order ID Tag</h5>
                    <span className="font-extrabold text-sm text-[#E5989B]">{activeTracking.id}</span>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-400 uppercase text-right">Current Status</h5>
                    <span className="px-2 py-1 rounded bg-[#FFD6E0] text-[#E5989B] font-bold text-[10px] block mt-1">{activeTracking.currentStatus}</span>
                  </div>
                </div>
  
                {/* Chronological vertical timeline */}
                <div className="space-y-6 pl-4 relative before:absolute before:inset-y-0 before:left-1 before:w-0.5 before:bg-gray-100">
                  {activeTracking.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 absolute -left-1.5 top-1 z-10 ${step.done ? 'bg-[#E5989B] border-[#E5989B]' : 'bg-white border-gray-200'}`} />
                      <div className="pl-6">
                        <h4 className={`font-bold text-xs ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>{step.title}</h4>
                        <span className="text-[10px] text-gray-400 font-semibold">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xs">Provide a valid Order ID (or place a mockup check order to generate track ID automatically).</p>
              </div>
            )}
          </div>
        </div>
      )}
  
      {currentTab === 'chat' && (
        <div className="py-10 px-4 max-w-4xl mx-auto animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-rose-100 h-[600px] flex flex-col">
            
            {/* Chat header area */}
            <div className="bg-[#FFF8F0] p-4 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5989B] text-white font-bold flex items-center justify-center border-2 border-[#D4AF37]">
                  DK
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Devraj K. (Senior Portraitist)</h4>
                  <span className="text-[10px] text-green-600 font-bold block">🟢 Online | Ready to Custom Sketch</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#FFD6E0] text-[#E5989B] font-bold text-[10px]">Studio Advisor</span>
            </div>
  
            {/* Message list area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {chatMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs rounded-2xl p-4 shadow-sm text-xs ${msg.sender === 'customer' ? 'bg-[#E5989B] text-white rounded-tr-none' : 'bg-white border text-gray-700 rounded-tl-none'}`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="block text-[8px] text-right mt-1 opacity-75">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isArtistTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-2xl px-4 py-2 text-xs text-gray-400 italic">
                    Artist is formulating layout thoughts...
                  </div>
                </div>
              )}
            </div>
  
            {/* Input message action bar */}
            <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Discuss canvas layout sizes, timelines or framing colors..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                className="flex-grow border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-[#E5989B]" 
              />
              <button 
                onClick={handleSendMessage}
                className="bg-[#E5989B] hover:bg-[#D4AF37] text-white p-3 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
  
          </div>
        </div>
      )}
      
      {currentTab === 'dashboard' && (
        <div className="py-10 px-4 lg:px-12 max-w-7xl mx-auto animate-fadeIn">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Dashboard Navigation side sidebar */}
            <aside className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-4">
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-[#E6D6FF] text-[#E5989B] font-bold text-xl mx-auto flex items-center justify-center border-2 border-dashed border-[#E5989B] mb-3">
                  AK
                </div>
                <h4 className="font-extrabold text-sm text-gray-800">Amit Kumar</h4>
                <p className="text-[10px] text-gray-400">Bronze Loyalty Tier member</p>
              </div>
  
              <div className="space-y-1">
                <button className="w-full text-left p-2.5 rounded-xl text-xs font-bold bg-[#FFD6E0] text-[#E5989B]">My Purchase History</button>
                <button onClick={() => setCurrentTab('tracking')} className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Track Shipment Status</button>
                <button onClick={() => setCurrentTab('chat')} className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Support Consultations</button>
                <button onClick={() => setCurrentTab('ai-preview')} className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Draft Painting Vault</button>
              </div>
            </aside>
  
            {/* Dashboard core center panels */}
            <main className="lg:col-span-9 bg-white rounded-2xl p-6 shadow-sm border border-rose-100 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="serif-font font-bold text-xl text-gray-800">Your Luxury Purchase Orders</h3>
                <span className="text-xs text-[#E5989B] font-semibold">Total Orders: {orders.length}</span>
              </div>
  
              <div className="space-y-4">
                {orders.map((ord, idx) => (
                  <div key={idx} className="border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={ord.image} alt="Order item representation" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-gray-800">{ord.item}</h5>
                        <div className="flex gap-2 text-[10px] text-gray-400 mt-1">
                          <span>Date: {ord.date}</span>
                          <span>|</span>
                          <span className="font-bold text-[#E5989B]">ID: {ord.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-xs text-gray-800">₹{ord.total}</span>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 font-bold text-[9px] rounded border border-yellow-200">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      )}
  
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative grid md:grid-cols-2 gap-8 shadow-2xl border border-amber-100">
            
            {/* Close modal button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-all"
            >
              ✕
            </button>
  
            {/* Detail Gallery visual preview */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm border mb-4">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <span className="px-3 py-1 bg-[#FFF8F0] text-[#D4AF37] rounded-lg font-bold text-[10px] uppercase border border-[#D4AF37]/20 block w-fit">
                Premium Handmade Standard
              </span>
            </div>
  
            {/* Custom sizing and pricing option selections */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#E5989B] tracking-wider uppercase">{selectedProduct.category}</span>
                <h3 className="serif-font font-bold text-2xl text-gray-800 mt-1 leading-snug">{selectedProduct.name}</h3>
              </div>
  
              <p className="text-xs text-gray-500 leading-relaxed font-light">{selectedProduct.description}</p>
  
              {/* Sizing options menu list with specific pricing delta */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-gray-500">Pick Custom Media Sizing</h5>
                <div className="space-y-1.5">
                  {selectedProduct.sizes?.map((sz, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        addToCart(selectedProduct, sz);
                        setSelectedProduct(null);
                      }}
                      className="w-full p-3 rounded-xl border border-gray-100 hover:border-[#E5989B] text-left hover:bg-rose-50/20 transition-all flex justify-between items-center text-xs"
                    >
                      <span className="font-semibold text-gray-700">{sz.name}</span>
                      <span className="font-black text-[#E5989B]">₹{sz.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
          </div>
        </div>
      )}
  
      <footer className="bg-white border-t border-rose-100/30 py-16 px-4 lg:px-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="serif-font text-2xl font-black text-[#E5989B] tracking-wider">FORYOU</h4>
            <p className="text-[11px] text-gray-400 mt-2 max-w-xs leading-relaxed">Made With Love, Crafted For You. Handcrafted Premium Canvas Painting Portraits & Custom Gift Hampers Built For Life's Most Beautiful Milestone Surprises.</p>
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-700 uppercase mb-3">Our Core Business Specs</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>Customized Family Portraits</li>
              <li>Hand-Drawn Pet Royal Canvas</li>
              <li>Luxe Chocolate Celebration Boxes</li>
              <li>AI Art Preview Generation</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-700 uppercase mb-3">Help & Support lines</h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>Artist Design Consultation</li>
              <li>Shipping & Handcraft Timelines</li>
              <li>Cancellation / Re-Draw Guarantees</li>
              <li>FAQs & Video Testimonials</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-700 uppercase mb-3">Corporate Studio Location</h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              Ludhiana Industrial Art Hub,<br />
              Punjab, India.<br />
              Email: devraj@foryoustudio.com<br />
              Phone: +91 98765-43210
            </p>
          </div>
        </div>
  
        <div className="border-t border-gray-100 mt-12 pt-6 text-center max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 FORYOU — Made With Love, Crafted For You. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-amber-500 cursor-pointer">Security Certifications</span>
            <span className="hover:text-amber-500 cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}