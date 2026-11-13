import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

/**
 * Sticky top navigation bar displaying the City Drink brand identity,
 * a language toggle button (Arabic <-> English/Franco), and a shopping cart button.
 */
export default function Header() {
  const { totalItems, totalPrice, openCart } = useCart();
  const { t, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <a
          href="#top"
          className="flex items-center gap-3 group focus:outline-none min-w-0"
          aria-label={t.brandHomeAria}
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-orange-50 border border-orange-200 shrink-0 shadow-xs">
            <img
              src="/images/city%20drink%20logo.jpeg"
              alt={t.logoAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="leading-tight min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight truncate">
                {t.brandName}
              </span>
              <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700 shrink-0">
                {t.freshBadge}
              </span>
            </div>
            <p className="text-xs font-semibold text-orange-600 truncate">
              {t.brandTagline}
            </p>
          </div>
        </a>

        {/* Action Buttons: Language Switcher & Cart */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.toggleLangAria}
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 active:scale-95 text-orange-700 border border-orange-200 font-extrabold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span>{t.toggleLangLabel}</span>
          </button>

          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            aria-label={t.cartAria(totalItems)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>

            <span className="text-sm hidden sm:inline">
              {totalItems > 0 ? `${totalPrice} ${t.currency}` : t.cartLabel}
            </span>

            {/* Dynamic Item Count Badge */}
            <span
              className={`min-w-6 h-6 px-1.5 rounded-full text-xs font-extrabold flex items-center justify-center transition-colors ${
                totalItems > 0
                  ? 'bg-green-500 text-white ring-2 ring-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
