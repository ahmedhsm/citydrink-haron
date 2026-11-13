import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

/**
 * Displays a single menu item card with lazy-loaded image, details, price,
 * and either an "Add to Cart" button or a +/- quantity controller.
 */
export default function ProductCard({ product }) {
  const { addToCart, incrementQuantity, decrementQuantity, getItemQuantity } = useCart();
  const { t } = useLanguage();
  const quantity = getItemQuantity(product.id);

  return (
    <article className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Product Image with consistent height, clean light backdrop, and no cropping */}
      <div className="relative h-56 w-full bg-white border-b border-gray-100 overflow-hidden flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
        <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100/90 backdrop-blur-xs text-gray-800 shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
              {product.name}
            </h3>
            <span className="shrink-0 text-lg font-black text-orange-600 whitespace-nowrap">
              {product.price} {t.currency}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Add to Cart OR Quantity Controller */}
        <div className="pt-1">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-orange-500/20 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span>{t.addToCart}</span>
            </button>
          ) : (
            <div
              className="w-full flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-1"
              aria-label={t.qtyControlAria(product.name)}
            >
              <button
                type="button"
                onClick={() => incrementQuantity(product.id)}
                className="w-10 h-9 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold flex items-center justify-center transition-all cursor-pointer"
                aria-label={t.qtyIncreaseAria(product.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>

              <span className="text-base font-black text-gray-900 select-none px-3">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => decrementQuantity(product.id)}
                className="w-10 h-9 rounded-lg bg-white hover:bg-orange-100 active:scale-95 text-orange-600 border border-orange-200 font-bold flex items-center justify-center transition-all cursor-pointer"
                aria-label={t.qtyDecreaseAria(product.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
