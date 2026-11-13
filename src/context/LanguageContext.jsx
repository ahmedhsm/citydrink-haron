import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);
const LANG_STORAGE_KEY = 'city-drink-lang';

const translations = {
  ar: {
    brandName: 'سيتي درينك',
    brandTagline: 'City Drink • عصائر وحلويات',
    brandHomeAria: 'سيتي درينك الصفحة الرئيسية',
    logoAlt: 'شعار سيتي درينك',
    freshBadge: 'فريش 100%',
    cartLabel: 'السلة',
    cartAria: (count) => `عرض سلة الطلبات (${count} منتجات)`,
    currency: 'ج.م',
    toggleLangLabel: 'EN',
    toggleLangAria: 'Switch language to English / Franco',
    heroBadge: 'فواكه طبيعية 100% • تحضير فوري',
    heroTitleStart: 'انتعاش الصيف والطاقة في كل كوب من',
    heroBrandHighlight: 'سيتي درينك',
    heroSubtitle:
      'تصفح المنيو، اختر مشروباتك وحلوياتك المفضلة، وأرسل طلبك مباشرة عبر واتساب بدون أي تعقيد.',
    heroImageAlt: 'تشكيلة مشروبات وحلويات سيتي درينك',
    searchPlaceholder: 'ابحث بالاسم أو المكونات (بطوط، أفوكادو، قنبلة...)',
    searchAria: 'ابحث في المنيو',
    categoriesNavAria: 'تصنيفات القائمة',
    itemCount: (count) => `${count} صنف`,
    showAll: 'عرض الكل',
    emptySearchTitle: 'لا توجد أصناف مطابقة لبحثك',
    emptySearchSubtitle: 'جرّب البحث بكلمة أخرى أو تصفح جميع الأقسام.',
    resetFilters: 'إعادة ضبط الفلاتر',
    addToCart: 'أضف للسلة',
    qtyControlAria: (name) => `التحكم في كمية ${name}`,
    qtyIncreaseAria: (name) => `زيادة كمية ${name}`,
    qtyDecreaseAria: (name) => `إنقاص كمية ${name}`,
    viewCart: 'عرض سلة الطلبات',
    cartTitle: 'سلة الطلبات',
    cartItemsBadge: (count) => `${count} منتج`,
    clearCart: 'إفراغ السلة',
    closeCartAria: 'إغلاق السلة',
    emptyCartTitle: 'سلتك فارغة حالياً',
    emptyCartSubtitle: 'اختر مشروباتك وحلوياتك المفضلة من منيو سيتي درينك وأضفها للسلة.',
    browseMenu: 'تصفح المنيو',
    removeItemAria: (name) => `حذف ${name} من السلة`,
    unitPrice: (price) => `سعر القطعة: ${price} ج.م`,
    orderNotesLabel: 'ملاحظات إضافية (اختياري)',
    orderNotesPlaceholder: 'مثال: سكر خفيف، بدون ثلج...',
    checkoutDetailsTitle: 'بيانات التوصيل',
    customerNameLabel: 'الاسم',
    customerNamePlaceholder: 'الاسم بالكامل',
    customerPhoneLabel: 'رقم الموبايل',
    customerPhonePlaceholder: '01xxxxxxxxx',
    customerAddressLabel: 'العنوان بالتفصيل',
    customerAddressPlaceholder: 'المنطقة، الشارع، رقم العمارة والشقة...',
    checkoutValidationError: 'يرجى إدخال الاسم ورقم الموبايل والعنوان لإتمام الطلب.',
    grandTotal: 'الإجمالي الكلي',
    whatsappCheckout: 'تأكيد الطلب عبر واتساب',
    whatsappGreeting: 'مرحباً سيتي درينك، أريد طلب:',
    whatsappTotalLabel: 'الإجمالي:',
    whatsappNameLabel: 'الاسم:',
    whatsappPhoneLabel: 'رقم الموبايل:',
    whatsappAddressLabel: 'العنوان:',
    whatsappNoteLabel: 'ملاحظات:',
    freeGiftBadge: 'هدية مجانية',
    whatsappFreeGiftLabel: 'هدية مجانية - 0 ج.م',
    promoProgressText: (remaining) =>
      `أضف بـ ${remaining} ج.م واحصل على مشروب مجاني (حتى 50 ج.م)`,
    promoUnlockedTitle: 'اختر هديتك المجانية (طلبك ≥ 200 ج.م)',
    promoUnlockedSubtitle: 'اختر صنفاً واحداً مجاناً من الأصناف حتى 50 ج.م',
    promoChangeGift: 'تغيير الهدية',
    promoHideGifts: 'إخفاء القائمة',
    promoSelectedLabel: 'تم الاختيار',
    promoPickLabel: 'اختر مجاناً',
    promoNoEligibleItems: 'لا توجد أصناف متاحة للهدية حالياً.',
    footerTitle: 'City Drink • سيتي درينك للعصائر الطبيعية والحلويات',
    footerSubtitle: 'الطلب المباشر عبر واتساب • تحضير طازج يومياً',
    pageTitle: 'سيتي درينك | City Drink - منيو المشروبات والعصائر',
  },
  en: {
    brandName: 'City Drink',
    brandTagline: 'Fresh Juices & Desserts',
    brandHomeAria: 'City Drink Home',
    logoAlt: 'City Drink Logo',
    freshBadge: '100% Fresh',
    cartLabel: 'Cart',
    cartAria: (count) => `View cart (${count} items)`,
    currency: 'EGP',
    toggleLangLabel: 'عربي',
    toggleLangAria: 'التبديل إلى اللغة العربية',
    heroBadge: '100% Natural Fruits • Made Fresh',
    heroTitleStart: 'Summer Refreshment & Energy in Every Cup from',
    heroBrandHighlight: 'City Drink',
    heroSubtitle:
      'Browse the menu, pick your favorite drinks and desserts, and send your order directly via WhatsApp.',
    heroImageAlt: 'City Drink juices and desserts selection',
    searchPlaceholder: 'Search by name or ingredients (Batout, Avocado, Qonbela...)',
    searchAria: 'Search the menu',
    categoriesNavAria: 'Menu categories',
    itemCount: (count) => `${count} ${count === 1 ? 'item' : 'items'}`,
    showAll: 'Show All',
    emptySearchTitle: 'No matching items found',
    emptySearchSubtitle: 'Try searching with another keyword or browse all categories.',
    resetFilters: 'Reset Filters',
    addToCart: 'Add to Cart',
    qtyControlAria: (name) => `Quantity controls for ${name}`,
    qtyIncreaseAria: (name) => `Increase quantity of ${name}`,
    qtyDecreaseAria: (name) => `Decrease quantity of ${name}`,
    viewCart: 'View Cart',
    cartTitle: 'Your Cart',
    cartItemsBadge: (count) => `${count} ${count === 1 ? 'item' : 'items'}`,
    clearCart: 'Clear Cart',
    closeCartAria: 'Close cart',
    emptyCartTitle: 'Your cart is empty',
    emptyCartSubtitle: 'Choose your favorite drinks and desserts from City Drink menu to get started.',
    browseMenu: 'Browse Menu',
    removeItemAria: (name) => `Remove ${name} from cart`,
    unitPrice: (price) => `Unit price: ${price} EGP`,
    orderNotesLabel: 'Order Notes (Optional)',
    orderNotesPlaceholder: 'e.g., Less sugar, no ice...',
    checkoutDetailsTitle: 'Delivery Details',
    customerNameLabel: 'Name',
    customerNamePlaceholder: 'Your full name',
    customerPhoneLabel: 'Phone Number',
    customerPhonePlaceholder: '01xxxxxxxxx',
    customerAddressLabel: 'Delivery Address',
    customerAddressPlaceholder: 'Area, street, building & apartment...',
    checkoutValidationError: 'Please enter your name, phone number, and address to place the order.',
    grandTotal: 'Total',
    whatsappCheckout: 'Confirm Order via WhatsApp',
    whatsappGreeting: 'مرحباً سيتي درينك، أريد طلب:',
    whatsappTotalLabel: 'الإجمالي:',
    whatsappNameLabel: 'الاسم:',
    whatsappPhoneLabel: 'رقم الموبايل:',
    whatsappAddressLabel: 'العنوان:',
    whatsappNoteLabel: 'ملاحظات:',
    freeGiftBadge: 'Free Gift',
    whatsappFreeGiftLabel: 'هدية مجانية - 0 ج.م',
    promoProgressText: (remaining) =>
      `Add ${remaining} EGP more to unlock a free item (up to 50 EGP)`,
    promoUnlockedTitle: 'Choose Your Free Item (Order ≥ 200 EGP)',
    promoUnlockedSubtitle: 'Pick 1 free item priced up to 50 EGP',
    promoChangeGift: 'Change Gift',
    promoHideGifts: 'Hide List',
    promoSelectedLabel: 'Selected',
    promoPickLabel: 'Pick Free',
    promoNoEligibleItems: 'No eligible gift items available right now.',
    footerTitle: 'City Drink • Natural Juices & Desserts',
    footerSubtitle: 'Direct WhatsApp Ordering • Freshly Prepared Daily',
    pageTitle: 'City Drink | Digital Menu & Ordering',
  },
};

function loadInitialLang() {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

/**
 * Provides bilingual (Arabic / English-Franco) UI state, document direction, and translations.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(loadInitialLang);
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.title = translations[lang].pageTitle;

    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [lang, isRtl]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      isRtl,
      toggleLanguage,
      t: translations[lang],
    }),
    [lang, isRtl, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * Custom hook to access current language, direction, toggle action, and translated strings.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

