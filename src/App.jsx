import { useMemo, useState } from 'react';
import CartModal from './components/CartModal';
import CategoryFilter from './components/CategoryFilter';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ALL_CATEGORY, categories, getCategoryLabel, getLocalizedMenu } from './data/menu';

/**
 * Floating mobile bottom bar shown when items exist in the cart,
 * providing one-tap access to the cart drawer like a native delivery app.
 */
function MobileFloatingCartBar() {
  const { totalItems, totalPrice, isCartOpen, openCart } = useCart();
  const { isRtl, t } = useLanguage();

  if (totalItems === 0 || isCartOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden">
      <button
        type="button"
        onClick={openCart}
        className="w-full bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.99] text-white rounded-2xl px-4 py-3.5 shadow-xl shadow-orange-500/30 flex items-center justify-between transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-white/20 text-white text-sm font-black flex items-center justify-center">
            {totalItems}
          </span>
          <span className="font-extrabold text-sm">{t.viewCart}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-black text-base">
            {totalPrice} {t.currency}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`}
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>
      </button>
    </div>
  );
}

/**
 * Normalizes Arabic and Latin text for resilient search across names and ingredients.
 */
function normalizeSearchText(text) {
  return String(text ?? '')
    .toLowerCase()
    .trim()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه');
}

/**
 * Main City Drink digital menu content wrapped inside LanguageProvider and CartProvider.
 */
function MenuContent() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, t } = useLanguage();

  const localizedMenu = useMemo(() => getLocalizedMenu(lang), [lang]);
  const activeCategoryLabel = getCategoryLabel(activeCategory, lang);

  const filteredItems = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    return localizedMenu.filter((item) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || item.categoryId === activeCategory;
      const matchesSearch =
        !query ||
        normalizeSearchText(item.ar.name).includes(query) ||
        normalizeSearchText(item.ar.description).includes(query) ||
        normalizeSearchText(item.en.name).includes(query) ||
        normalizeSearchText(item.en.description).includes(query) ||
        normalizeSearchText(getCategoryLabel(item.categoryId, 'ar')).includes(query) ||
        normalizeSearchText(getCategoryLabel(item.categoryId, 'en')).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, localizedMenu, searchQuery]);

  return (
    <div id="top" className="min-h-screen bg-gray-50 flex flex-col pb-24 sm:pb-10">
      <Header />

      {/* Appetizing Hero Banner */}
      <section className="bg-gradient-to-l from-orange-500 via-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 items-center gap-5">
          <div className="md:col-span-7 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {t.heroBadge}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
              {t.heroTitleStart}{' '}
              <span className="text-orange-100 underline decoration-green-400 decoration-4 underline-offset-4">
                {t.heroBrandHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-orange-50/95 max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Quick Search Input */}
            <div className="relative max-w-md pt-1">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchAria}
                className="w-full rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-sm font-semibold ps-10 pe-4 py-3 shadow-lg shadow-orange-900/15 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-orange-500 absolute start-3.5 top-1/2 -translate-y-1/2 mt-0.5 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-5 hidden sm:block">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/25 h-52 lg:h-60 bg-orange-600">
              <img
                src="/images/watermarked_img_11312379045368580645.webp"
                alt={t.heroImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Category Pills */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Product Grid */}
      <main className="max-w-6xl w-full mx-auto px-4 pt-6 flex-1">
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900">{activeCategoryLabel}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
              {t.itemCount(filteredItems.length)}
            </span>
          </div>

          {(activeCategory !== ALL_CATEGORY || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory(ALL_CATEGORY);
                setSearchQuery('');
              }}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              {t.showAll}
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center space-y-3">
            <p className="text-lg font-extrabold text-gray-800">{t.emptySearchTitle}</p>
            <p className="text-sm text-gray-500">{t.emptySearchSubtitle}</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory(ALL_CATEGORY);
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="max-w-6xl w-full mx-auto px-4 pt-12 pb-4 text-center text-xs text-gray-400">
        <p className="font-semibold text-gray-500">{t.footerTitle}</p>
        <p className="mt-1">{t.footerSubtitle}</p>
      </footer>

      <MobileFloatingCartBar />
      <CartModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MenuContent />
      </CartProvider>
    </LanguageProvider>
  );
}
