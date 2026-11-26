/**
 * City Drink Bilingual Digital Menu Data (Arabic & English/Franco)
 */

export const ALL_CATEGORY = 'all';

export const categories = [
  { id: ALL_CATEGORY, ar: 'الكل', en: 'All' },
  { id: 'mixat', ar: 'ميكسات وطاقة', en: 'Mixat' },
  { id: 'mojito', ar: 'موهيتو', en: 'Mojito' },
  { id: 'boba', ar: 'بوبا شيك', en: 'Boba Shake' },
  { id: 'fresh', ar: 'عصائر فريش', en: '3asayer Fresh' },
  { id: 'milkshake', ar: 'ميلك شيك', en: 'Milkshake' },
  { id: 'diet', ar: 'دايت وصحي', en: 'Diet w Se7y' },
  { id: 'halawyat', ar: 'حلويات', en: 'Halawyat' },
  { id: 'gym', ar: 'جيم', en: 'GYM' },
  { id: 'tasaly', ar: 'تسالي', en: 'Tasaly' },
];

const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

export const rawMenuData = [
  // --- Mixat / ميكسات وطاقة ---
  {
    id: 1,
    categoryId: 'mixat',
    price: 70,
    image: '/images/9e94ec72-de29-4394-86d0-de19bc40cb3a.webp',
    ar: { name: 'بطوط', description: 'فراولة، موز، آيس كريم' },
    en: { name: 'Batout', description: 'Farwla, Moz, Ice cream' },
  },
  {
    id: 2,
    categoryId: 'mixat',
    price: 50,
    image: '/images/9a9b17c6-5fbe-44b5-b008-9b010ed6d7fc.webp',
    ar: { name: 'زبادو فراولة', description: 'زبادي، فراولة' },
    en: { name: 'Zabado Farwla', description: 'Zabady, Farwla' },
  },
  {
    id: 3,
    categoryId: 'mixat',
    price: 60,
    image: '/images/watermarked_img_17781328477478781100.webp',
    ar: { name: 'كثافة', description: 'مانجو، موز، آيس كريم' },
    en: { name: 'Kasaafa', description: 'Mango, Moz, Ice cream' },
  },
  {
    id: 4,
    categoryId: 'mixat',
    price: 70,
    image: '/images/watermarked_img_15699785147070036422.webp',
    ar: { name: 'هافانا', description: 'أناناس، تفاح، برتقال' },
    en: { name: 'Havana', description: 'Ananas, Tofah, Borto2an' },
  },
  {
    id: 5,
    categoryId: 'mixat',
    price: 60,
    image: '/images/4fcd08a0-8548-4eff-b757-760da38f8272.webp',
    ar: { name: 'الاصفهانى', description: 'مانجو، زبادي، آيس كريم' },
    en: { name: 'El Asfahany', description: 'Mango, Zabady, Ice cream' },
  },
  {
    id: 6,
    categoryId: 'mixat',
    price: 110,
    image: '/images/watermarked_img_2307759776120667254.webp',
    ar: { name: 'مو صلاح', description: 'أفوكادو، كاجو' },
    en: { name: 'Mo Salah', description: 'Avocado, Cajo' },
  },
  {
    id: 7,
    categoryId: 'mixat',
    price: 110,
    image: '/images/c6ce84be-1ce1-4dbf-ad71-c3d572519239.webp',
    ar: { name: 'جاجوار', description: 'أفوكادو، جرجير، كاجو، عسل' },
    en: { name: 'Jaguar', description: 'Avocado, Garger, Cajo, Asal' },
  },
  {
    id: 8,
    categoryId: 'mixat',
    price: 70,
    image: '/images/f355b62c-f711-4250-932a-17d5ec26769a.webp',
    ar: { name: 'صاروخ', description: 'أناناس، موز، آيس كريم، مانجو' },
    en: { name: 'Saroukh', description: 'Ananas, Moz, Ice cream, Mango' },
  },
  {
    id: 9,
    categoryId: 'mixat',
    price: 70,
    image: '/images/19440b86-047f-4b57-806f-3e7b74498855.webp',
    ar: { name: 'بينا كولادا', description: 'أناناس، برتقال، جوز هند' },
    en: { name: 'Pina Colada', description: 'Ananas, Borto2an, Goz hend' },
  },

  // --- Mojito / موهيتو ---
  {
    id: 10,
    categoryId: 'mojito',
    price: 50,
    image: '/images/b0aac3b6-0118-462c-b6c0-0b403c7f6db6.webp',
    ar: { name: 'برازيلى', description: 'ليمون، صودا، نعناع' },
    en: { name: 'Brazilian', description: 'Lamoun, Soda, Na3na3' },
  },
  {
    id: 11,
    categoryId: 'mixat',
    price: 70,
    image: '/images/506b7e41-81bc-4d1f-8f7e-39b0663fb1e4.webp',
    ar: { name: 'چمايكا', description: 'برتقال، اناناس، خوخ' },
    en: { name: 'Jamayka', description: 'Borto2an, Ananas, Khokh' },
  },
  {
    id: 12,
    categoryId: 'mojito',
    price: 50,
    image: '/images/watermarked_img_18020129138890613956.webp',
    ar: { name: 'توت', description: 'توت، صودا، ليمون' },
    en: { name: 'Toot', description: 'Toot, Soda, Lamoun' },
  },
  {
    id: 13,
    categoryId: 'mojito',
    price: 50,
    image: '/images/watermarked_img_18299819113763820536.webp',
    ar: { name: 'كريز', description: 'كريز، صودا، ليمون' },
    en: { name: 'Cherry', description: 'Cherry, Soda, Lamoun' },
  },
  {
    id: 14,
    categoryId: 'mojito',
    price: 50,
    image: '/images/69470a91-5519-4d30-a8ed-63279cf62c3c.webp',
    ar: { name: 'برتقال نعناع', description: 'برتقال، نعناع، صودا' },
    en: { name: 'Orange Mint', description: 'Borto2an, Na3na3, Soda' },
  },

  // --- Boba Shake / بوبا شيك ---
  {
    id: 15,
    categoryId: 'boba',
    price: 70,
    image: '/images/2b6bec7e-80bb-4796-b95a-550e8ef9059f.webp',
    ar: { name: 'بوبا توت', description: 'بوبا، توت' },
    en: { name: 'Boba Toot', description: 'Boba, Toot' },
  },
  {
    id: 16,
    categoryId: 'boba',
    price: 70,
    image: '/images/dfc8d10b-3ea4-4ea9-9a8c-449e69f40ec7.webp',
    ar: { name: 'بوبا مانجو', description: 'بوبا، مانجو' },
    en: { name: 'Boba Mango', description: 'Boba, Mango' },
  },
  {
    id: 17,
    categoryId: 'boba',
    price: 70,
    image: '/images/bd9760be-a24a-4cf6-b9ff-074545b80f9b.webp',
    ar: { name: 'بوبا شوكولاتة', description: 'بوبا، شوكولاتة' },
    en: { name: 'Boba Chocolate', description: 'Boba, Chocolate' },
  },
  {
    id: 18,
    categoryId: 'boba',
    price: 70,
    image: '/images/8079c0fd-1dac-402b-b61a-4e877e86d281.webp',
    ar: { name: 'بوبا بطيخ', description: 'بوبا، بطيخ' },
    en: { name: 'Boba Watermelon', description: 'Boba, Bateekh' },
  },

  // --- 3asayer Fresh / عصائر فريش ---
  {
    id: 19,
    categoryId: 'fresh',
    price: 45,
    image: '/images/e6dfa2c3-8405-41ef-8131-adc04679012d.webp',
    ar: { name: 'مانجو', description: 'عصير مانجو فريش' },
    en: { name: 'Mango Fresh', description: 'Mango Fresh' },
  },
  {
    id: 20,
    categoryId: 'fresh',
    price: 40,
    image: '/images/b09668cf-5aa9-4e37-9c16-e476231f7390.webp',
    ar: { name: 'فراولة', description: 'عصير فراولة فريش' },
    en: { name: 'Farwla Fresh', description: 'Farwla Fresh' },
  },
  {
    id: 21,
    categoryId: 'fresh',
    price: 25,
    image: '/images/d6858ace-39b0-42e6-a4fd-e434085a2aab.webp',
    ar: { name: 'قصب', description: 'عصير قصب فريش' },
    en: { name: 'Asab Fresh', description: '3aser Asab Fresh' },
  },

  // --- Milkshake / ميلك شيك ---
  {
    id: 22,
    categoryId: 'milkshake',
    price: 50,
    image: '/images/664a47fb-bb3b-446f-980e-da822028c764.webp',
    ar: { name: 'أوريو', description: 'ميلك شيك أوريو، كريمة' },
    en: { name: 'Shake Oreo', description: 'Milkshake Oreo, Crema' },
  },
  {
    id: 23,
    categoryId: 'milkshake',
    price: 50,
    image: '/images/662222c0-8fed-4b7e-86a3-3b1bed7e50f4.webp',
    ar: { name: 'نوتيلا', description: 'ميلك شيك نوتيلا، كريمة' },
    en: { name: 'Shake Nutella', description: 'Milkshake Nutella, Crema' },
  },
  {
    id: 24,
    categoryId: 'milkshake',
    price: 50,
    image: '/images/92289feb-be0e-481c-921c-282d1b65bc9b.webp',
    ar: { name: 'كيت كات', description: 'ميلك شيك كيت كات، كريمة' },
    en: { name: 'Shake Kitkat', description: 'Milkshake Kitkat, Crema' },
  },

  // --- Diet w Se7y / دايت وصحي ---
  {
    id: 25,
    categoryId: 'diet',
    price: 50,
    image: '/images/6c067e78-86e1-4890-835f-b6d17cb559a1.webp',
    ar: { name: 'عصير ريجيم', description: 'تفاح وكيوي' },
    en: { name: '3aser Regim', description: 'Tofah w Kiwi' },
  },

  // --- Halawyat / حلويات ---
  {
    id: 26,
    categoryId: 'halawyat',
    price: 90,
    image: '/images/36e196eb-53dc-4488-bd76-0a3fb906dcac.webp',
    ar: { name: 'قنبلة', description: 'أرز بلبن، فواكه، قشطة، بسبوسة، كنافة' },
    en: { name: 'Qonbela', description: 'Roz b laban, Fawakeh, Eshta, Basbousa, Konafa' },
  },
  {
    id: 27,
    categoryId: 'halawyat',
    price: 110,
    image: '/images/watermarked_img_3824842287094844660.webp',
    ar: { name: 'الكبير اوى', description: 'أفوكادو، بلح، كيوي، تفاح، آيس كريم، مكسرات' },
    en: { name: 'El Kebeer Awy', description: 'Avocado, Balah, Kiwi, Tofah, Ice cream, Mokasarat' },
  },
  {
    id: 28,
    categoryId: 'halawyat',
    price: 70,
    image: '/images/36e196eb-53dc-4488-bd76-0a3fb906dcac.webp',
    ar: { name: 'رز ملوكي', description: 'أرز بلبن، فواكه' },
    en: { name: 'Roz Malouky', description: 'Roz b laban, Fawakeh' },
  },

  // --- عصائر فريش جديدة ---
  {
    id: 29,
    categoryId: 'fresh',
    price: 40,
    image: '/images/bateekh-fresh.webp',
    ar: { name: 'بطيخ', description: 'عصير بطيخ فريش' },
    en: { name: 'Watermelon Fresh', description: '3aser Bateekh Fresh' },
  },
  {
    id: 30,
    categoryId: 'fresh',
    price: 40,
    image: '/images/goafa-fresh.webp',
    ar: { name: 'جوافة', description: 'عصير جوافة فريش' },
    en: { name: 'Guava Fresh', description: '3aser Goafa Fresh' },
  },
  {
    id: 31,
    categoryId: 'fresh',
    price: 40,
    image: '/images/balah-laban.webp',
    ar: { name: 'بلح باللبن', description: 'بلح باللبن' },
    en: { name: 'Dates with Milk', description: 'Balah b laban' },
  },
  {
    id: 32,
    categoryId: 'fresh',
    price: 40,
    image: '/images/moz-laban.webp',
    ar: { name: 'موز باللبن', description: 'موز باللبن' },
    en: { name: 'Banana with Milk', description: 'Moz b laban' },
  },
  {
    id: 33,
    categoryId: 'fresh',
    price: 40,
    image: '/images/lemon-na3na3.webp',
    ar: { name: 'ليمون نعناع', description: 'ليمون، نعناع' },
    en: { name: 'Lemon Mint', description: 'Lemon, Na3na3' },
  },
  {
    id: 34,
    categoryId: 'fresh',
    price: 40,
    image: '/images/borto2an-fresh.webp',
    ar: { name: 'برتقال', description: 'عصير برتقال فريش' },
    en: { name: 'Orange Fresh', description: '3aser Borto2an Fresh' },
  },

  // --- حلويات جديدة ---
  {
    id: 35,
    categoryId: 'halawyat',
    price: 100,
    image: '/images/salad-fawakeh-vip.webp',
    ar: { name: 'فروت سلاد VIP', description: 'فروت سلاد، آيس كريم، مكسرات' },
    en: { name: 'Fruit Salad VIP', description: 'Fruit Salad, Ice cream, Mokasarat' },
  },
  {
    id: 36,
    categoryId: 'halawyat',
    price: 55,
    image: '/images/roz-laban-konafa-basbosa.webp',
    ar: { name: 'أرز باللبن كنافة وبسبوسة', description: 'أرز باللبن، كنافة، بسبوسة' },
    en: { name: 'Roz b Laban Konafa & Basbousa', description: 'Roz b laban, Konafa, Basbousa' },
  },
  {
    id: 37,
    categoryId: 'halawyat',
    price: 65,
    image: '/images/roz-laban-fawakeh.webp',
    ar: { name: 'أرز باللبن فواكه', description: 'أرز باللبن، فواكه' },
    en: { name: 'Roz b Laban Fruits', description: 'Roz b laban, Fawakeh' },
  },
  {
    id: 38,
    categoryId: 'halawyat',
    price: 80,
    image: '/images/roz-laban-fawakeh-eshta.webp',
    ar: { name: 'أرز باللبن فواكه قشطة', description: 'أرز باللبن، فواكه، قشطة' },
    en: { name: 'Roz b Laban Fruits Eshta', description: 'Roz b laban, Fawakeh, Eshta' },
  },

  // --- موهيتو جديد ---
  {
    id: 39,
    categoryId: 'mojito',
    price: 50,
    image: '/images/sunshine-mojito.webp',
    ar: { name: 'صن شاين', description: 'صودا، برتقال، ليمون' },
    en: { name: 'Sunshine Mojito', description: 'Soda, Borto2an, Lemon' },
  },
  {
    id: 40,
    categoryId: 'mojito',
    price: 50,
    image: '/images/passion-fruit-mojito.webp',
    ar: { name: 'باشون فروت', description: 'صودا، باشون، ليمون' },
    en: { name: 'Passion Fruit Mojito', description: 'Soda, Passion Fruit, Lemon' },
  },

  // --- بوبا شيك جديدة ---
  {
    id: 41,
    categoryId: 'boba',
    price: 70,
    image: '/images/boba-passion-fruit.webp',
    ar: { name: 'بوبا باشون فروت', description: 'بوبا، باشون فروت' },
    en: { name: 'Boba Passion Fruit', description: 'Boba, Passion Fruit' },
  },
  {
    id: 42,
    categoryId: 'boba',
    price: 70,
    image: '/images/Boba Strawberry.webp',
    ar: { name: 'بوبا فراولة', description: 'بوبا، فراولة' },
    en: { name: 'Boba Strawberry', description: 'Boba, Farawla' },
  },
  {
    id: 43,
    categoryId: 'boba',
    price: 70,
    image: '/images/Boba Coffee.webp',
    ar: { name: 'بوبا قهوة', description: 'بوبا، قهوة' },
    en: { name: 'Boba Coffee', description: 'Boba, Ahwa' },
  },

  // --- تسالي / Tasaly ---
  {
    id: 44,
    categoryId: 'tasaly',
    price: 90,
    image: '/images/cashew-vanilla.webp',
    ar: { name: 'كاجو', description: 'كاجو' },
    en: { name: 'Cajo vanilla', description: 'Cajo vanila' },
  },
  {
    id: 45,
    categoryId: 'tasaly',
    price: 65,
    image: '/images/sodany-khalat.webp',
    ar: { name: 'سوداني', description: 'سوداني' },
    en: { name: 'Sodany vanila', description: 'Sodany vanilla' },
  },
  {
    id: 46,
    categoryId: 'tasaly',
    price: 65,
    image: '/images/leb-khalat.webp',
    ar: { name: 'لب', description: 'لب' },
    en: { name: 'Leb', description: 'Leb' },
  },
  {
    id: 47,
    categoryId: 'milkshake',
    price: 60,
    image: '/images/nunieshake.webp',
    ar: { name: 'نونيز شيك', description: 'ميلك شيك مانجو،جوزهند،فانيليا' },
    en: { name: "nunie's shake", description: 'Milkshake mango,Coconut,vanilla' },
  },
];

/**
 * Returns the localized label for a category id.
 */
export function getCategoryLabel(categoryId, lang = 'ar') {
  const entry = categoryMap.get(categoryId);
  return entry ? entry[lang] ?? entry.ar : categoryId;
}

/**
 * Returns localized menu items for the active language while keeping searchable bilingual text.
 */
export function getLocalizedMenu(lang = 'ar') {
  return rawMenuData.map((item) => {
    const localized = item[lang] ?? item.ar;
    return {
      id: item.id,
      categoryId: item.categoryId,
      category: getCategoryLabel(item.categoryId, lang),
      price: item.price,
      image: item.image,
      name: localized.name,
      description: localized.description,
      ar: item.ar,
      en: item.en,
    };
  });
}

export const menuData = getLocalizedMenu('ar');
export const menuById = new Map(rawMenuData.map((item) => [item.id, item]));