// Firebase upload script for honeymoon gifts
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyC5MhE5RkPvf3Nwz5G3F_RfqTok59Lw53M",
  authDomain: "wedding-website-174f9.firebaseapp.com",
  projectId: "wedding-website-174f9",
  storageBucket: "wedding-website-174f9.firebasestorage.app",
  messagingSenderId: "796313870387",
  appId: "1:796313870387:web:d0d64293271b89d7ddc346",
  measurementId: "G-HHY6BM3KVL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Japan honeymoon gifts with funny titles and proper images
const honeymoonGifts = [
  { 
    id: "kfc", 
    name: "Embracing the culture - Japanese KFC", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd41e5de6-d7f8-4de2-b9b0-27db92dd87d7_1141x998.png",
    description: "Experience the unique flavors of KFC Japan"
  },
  { 
    id: "pokemon-cards", 
    name: "Andy says please - Pokemon Cards", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMPBk0B5Eo4MOO1rJfrTZUA6muttWLv2Nyh0EKOAk81uWE8Id8SX0SjBmb_C_exBiShDX1FF8MrxfQlPc-cJVGbhKcP3VZvvru0DJ001FnxKVU7UzXJ-49b6H2-XxEuku-dxeHkjs&usqp=CAc",
    description: "Collect exclusive Japanese Pokemon cards"
  },
  { 
    id: "pokemon-plush", 
    name: "Let's take a peak at you - Our favourite Pokemon Plush", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR03FRzWfv-oUyC8PoQwzEyJVq3zMCYFDQartNC2tuGgIfhGy5JrSLBfDJBRLrNxIxW4u9vm-8Khf5JISCpKLTQViUl56D5SN1T5-0y04WCn7bwTHqJz27CTMNJNRTb3bXW0gUx5g&usqp=CAc",
    description: "Adorable Pokemon plushies from Japan"
  },
  { 
    id: "wagyu", 
    name: "I'll be wagging my tail - Wagyu Steak Meal", 
    price: 50, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://wagyushop.com/cdn/shop/articles/120721.WagyuShop.A5SteaksBokChoy.026_600x.jpg?v=1639114318",
    description: "Authentic Japanese Wagyu beef experience"
  },
  { 
    id: "himeji", 
    name: "Open the drawbridge - Access to Himeji castle", 
    price: 22, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.japan-guide.com/g21/3501_11.jpg",
    description: "Visit the famous Himeji Castle"
  },
  { 
    id: "driving-permits", 
    name: "50cc - International Driving Permits", 
    price: 11, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://internationaldrivingpermit.org/wp-content/uploads/2024/05/idp-sample-jpg.webp",
    description: "Drive around Japan with proper permits"
  },
  { 
    id: "mario-kart", 
    name: "Watch out for bananas - Mario Kart", 
    price: 83, 
    quantity: 2, 
    purchased: 0, 
    contributors: [], 
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/c4/c3/a7/shibuya.jpg?w=1200&h=-1&s=1",
    description: "Real-life Mario Kart experience in Tokyo"
  },
  { 
    id: "ryokan", 
    name: "Living it up - Ryokan with Kaiseki meal in hot spring town", 
    price: 150, 
    quantity: 2, 
    purchased: 0, 
    contributors: [], 
    image: "https://images.squarespace-cdn.com/content/v1/5e019397a7a9f4232e428e43/1608705874208-4VTS7WIHQ9AG4N8GM7KY/Photo+5-4-18%2C+6+27+57+pm.jpg",
    description: "Traditional Japanese inn with hot springs"
  },
  { 
    id: "kimono", 
    name: "Cultural Appropriation - Traditional Kimono", 
    price: 50, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://yae-japan.com/wp/wp-content/uploads/2018/06/Eng-couple-regular.jpg",
    description: "Dress up in traditional Japanese attire"
  },
  { 
    id: "tea-ceremony", 
    name: "Tea for two - Traditional tea ceremony", 
    price: 50, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.thewhistlingkettle.com/cdn/shop/articles/tea-ceremony-tools-1689272217231.jpg?v=1755290193&width=1600",
    description: "Experience authentic Japanese tea ceremony"
  },
  { 
    id: "goshuin", 
    name: "It's kinda like a tattoo - Two Goshuin Books (travel stamps)", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://images.squarespace-cdn.com/content/v1/6354f31408faa42115499bca/611a40ec-6512-47e6-a553-e26a9a745d63/Goshuincho-Japan.jpg",
    description: "Collect temple and shrine stamps across Japan"
  },
  { 
    id: "vending-machines", 
    name: "Anything but coconut - Fun at the vending machines", 
    price: 10, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.planmyjapan.com/wp-content/uploads/2024/03/photo-26-09-2023-17-57-47-1127x800.jpg",
    description: "Explore Japan's unique vending machine culture"
  },
  { 
    id: "souvenir-shopping", 
    name: "Tat-a-tat-tat - Souvenir Shopping", 
    price: 15, 
    quantity: 3, 
    purchased: 0, 
    contributors: [], 
    image: "https://anorcadianabroad.com/wp-content/uploads/2024/09/dsc01605.jpg",
    description: "Browse unique Japanese souvenirs"
  },
  { 
    id: "depachika", 
    name: "Nighttime nibbles - Evening Depachika", 
    price: 10, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2017/10/depachika-sushi_gdl.jpg",
    description: "Explore department store food halls"
  },
  { 
    id: "massage", 
    name: "A flight with Fraser, you're gonna need a - Couples massage", 
    price: 100, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-2,5000-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/KYO/KYO_161_original.jpg",
    description: "Relax with a traditional Japanese massage"
  },
  { 
    id: "onsen", 
    name: "Pack your trunks - Couples day at the Onsen", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.travelandleisure.com/thmb/SXh3LhAfY9GlICz8nEiiQ-WGYVg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-takaragawa-onsen-osenkaku-hot-spring-HOTSPRINGHTL1222-b74c0500acc6463d9767c8249f6437e3.jpg",
    description: "Soak in natural hot springs together"
  },
  { 
    id: "sake", 
    name: "Nice Rice (Wine) - Bottle of Sake", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://cdn.britannica.com/29/124629-004-7FD56995/Barrels-sake-Japan.jpg",
    description: "Premium Japanese sake tasting"
  },
  { 
    id: "sushi-date", 
    name: "Will try not to get my tie stuck in the conveyor - Sushi Date", 
    price: 40, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://static.japan-food.guide/uploads/ckeditor_asset/data/000/008/103/980fa925f924a04ee4b00c845642e7778dab4d18ec406e271389436f7dca11e6/eye_catch_sushi.jpg",
    description: "Fresh sushi at a traditional restaurant"
  },
  { 
    id: "souffle-pancakes", 
    name: "Wibble Wibble - Souffle Pancakes", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://qeleg.com/cdn/shop/articles/20240408073943-japanese-souffl-c3-a9-pancakes.webp?v=1712562797",
    description: "Fluffy Japanese-style pancakes"
  },
  { 
    id: "bullet-train", 
    name: "No not the movie - Bullet Train", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSqMYVJdt-Or-duJulqiGq71JhzUmYfZFcA&s",
    description: "High-speed rail travel across Japan"
  },
  { 
    id: "polaroids", 
    name: "Make it snappy - Pack of Polaroids to take", 
    price: 10, 
    quantity: 4, 
    purchased: 0, 
    contributors: [], 
    image: "https://preview.redd.it/polaroids-from-my-trip-to-japan-v0-j6xhev868szc1.jpg?width=640&crop=smart&auto=webp&s=7afaef5185f69ca939f9335d971068f16cb8b2ad",
    description: "Instant camera memories"
  },
  { 
    id: "izakaya", 
    name: "Itadakimasu - Dinner and beers at an Izakaya", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/03/iStock-izakay-JohnnyGreig-1024x600.jpg",
    description: "Traditional Japanese pub experience"
  },
  { 
    id: "gyozas", 
    name: "Give us ya yozas - Gyozas for the gang !!", 
    price: 10, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://i.redd.it/k3vdntm9yr531.jpg",
    description: "Delicious Japanese dumplings"
  },
  { 
    id: "uniqlo", 
    name: "Enabling Charley - Charley shopping-spree in Uniqlo.", 
    price: 40, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://knittingindustry.com/uploads/7451/uniqlo.jpeg",
    description: "Japanese fashion shopping"
  },
  { 
    id: "donki", 
    name: "Enabling Andy - Andy buys Tat at Don Quijote.", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://cdn.shopify.com/s/files/1/1083/2612/files/donki4_0dec456f-59ca-4e1a-8b7e-04436340e2d5_480x480.jpg?v=1744267053",
    description: "Quirky finds at Japan's famous discount store"
  },
  { 
    id: "suitcase", 
    name: "You're over encumbered - Extra suitcase to bring home souvenirs", 
    price: 30, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://i.redd.it/don-quijote-shibuya-find-v0-ed3la1h25oqc1.jpg?width=2160&format=pjpg&auto=webp&s=dfcae7737b1b1dd57f5b9933e1730bb89acd78d6",
    description: "Additional luggage for all the treasures"
  },
  { 
    id: "wasabi", 
    name: "No more horseradish - Proper Wasabi", 
    price: 3, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.thai-food-online.co.uk/cdn/shop/products/s-and-b-japanese-wasabi-paste-in-tube.jpg?v=1589290726",
    description: "Fresh wasabi root experience"
  },
  { 
    id: "chopsticks", 
    name: "Wowcher - Proper Chopsticks", 
    price: 3, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://cdn.shopify.com/s/files/1/2077/0683/files/Palcke-25_82bafe99-6f01-47b5-b0af-4f068b11e5e7.jpg?v=1751634570",
    description: "Beautiful handcrafted chopsticks"
  },
  { 
    id: "knife", 
    name: "Bling bling - Japanese Damascus Steel Knife from Kappabashi", 
    price: 100, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://i.redd.it/visited-every-shop-on-kappabashi-street-in-tokyo-before-v0-jqzrh6nuglra1.jpg?width=3024&format=pjpg&auto=webp&s=1569b2753c5d2cf66bd15f17ef5e3959df5cb603",
    description: "Premium Japanese kitchen knife"
  },
  { 
    id: "blu-ray", 
    name: "Another One - Blu Ray from Tower Records", 
    price: 5, 
    quantity: 4, 
    purchased: 0, 
    contributors: [], 
    image: "https://i0.wp.com/halcyonrealms.com/blogpics/toktrip2025014.jpg?resize=750%2C500&ssl=1",
    description: "Japanese movies and music"
  },
  { 
    id: "matcha", 
    name: "There's no Matcha - Some proper matcha", 
    price: 10, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://ichef.bbci.co.uk/images/ic/480xn/p0lgrs69.jpg.webp",
    description: "Authentic ceremonial grade matcha"
  },
  { 
    id: "kyoto-tour", 
    name: "Kicking it in Kyoto - Walking Tour in Kyoto", 
    price: 40, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/dc/47/26/caption.jpg?w=500&h=400&s=1",
    description: "Guided tour of historic Kyoto"
  },
  { 
    id: "lemon-beer", 
    name: "Refill Lemon Beer in Miyajima", 
    price: 5, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_11_12/92cc75b99f591b181356ba0460f9dd6a_c_1527921534_raw.jpg",
    description: "Refreshing drinks on the island"
  },
  { 
    id: "omurice", 
    name: "Omurice Date Night", 
    price: 20, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Omurice_by_Taimeiken.jpg/1280px-Omurice_by_Taimeiken.jpg",
    description: "Japanese-style omelet rice"
  },
  { 
    id: "baseball", 
    name: "Take me out to the ballgame - Japanese Baseball", 
    price: 40, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/2014_MLB_Japan_All-Star_Series.jpg",
    description: "Experience Japanese baseball culture"
  },
  { 
    id: "coffee-date", 
    name: "Matcha Morning - Morning Coffee Date", 
    price: 10, 
    quantity: 1, 
    purchased: 0, 
    contributors: [], 
    image: "https://www.thewaytocoffee.com/wp-content/uploads/2021/06/img_60b590a229fd1.jpg",
    description: "Japanese coffee culture experience"
  },
  { 
    id: "spending-10", 
    name: "Spending money", 
    price: 10, 
    quantity: 100, 
    purchased: 0, 
    contributors: [], 
    image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iLA9gWLeGNAs/v1/-1x-1.webp",
    description: "Extra spending money for adventures"
  },
  { 
    id: "spending-20", 
    name: "Spending money", 
    price: 20, 
    quantity: 100, 
    purchased: 0, 
    contributors: [], 
    image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iLA9gWLeGNAs/v1/-1x-1.webp",
    description: "Extra spending money for adventures"
  },
  { 
    id: "spending-50", 
    name: "Spending money", 
    price: 50, 
    quantity: 100, 
    purchased: 0, 
    contributors: [], 
    image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iLA9gWLeGNAs/v1/-1x-1.webp",
    description: "Extra spending money for adventures"
  },
  { 
    id: "suggest-splurge", 
    name: "Suggest a Splurge!", 
    price: 0, 
    quantity: 100, 
    purchased: 0, 
    contributors: [], 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&q=80",
    description: "Have a brilliant idea for our Japan honeymoon? Suggest it here and we'll add it to our registry!"
  }
];

async function uploadGifts() {
  try {
    const giftsRef = doc(db, "wedding", "gifts");
    await setDoc(giftsRef, { items: honeymoonGifts });
    console.log("✅ Successfully uploaded", honeymoonGifts.length, "gifts to Firebase!");
    console.log("🎁 Gift registry is now ready!");
  } catch (error) {
    console.error("❌ Error uploading gifts:", error);
  }
}

uploadGifts();