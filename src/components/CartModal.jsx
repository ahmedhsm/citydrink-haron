import { useEffect, useMemo, useState } from 'react';
import {
  FREE_ITEM_MAX_PRICE,
  FREE_ITEM_THRESHOLD,
  useCart,
} from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMenu, menuById, rawMenuData } from '../data/menu';

/**
 * City Drink's official WhatsApp number (with country code, no '+').
 */
const WHATSAPP_NUMBER = '201108522743';
const CUSTOMER_STORAGE_KEY = 'city-drink-customer';

function loadInitialCustomer() {
  try {
    const raw = window.localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (!raw) return { name: '', phone: '', address: '' };
    const parsed = JSON.parse(raw);
    return {
      name: typeof parsed?.name === 'string' ? parsed.name : '',
      phone: typeof parsed?.phone === 'string' ? parsed.phone : '',
      address: typeof parsed?.address === 'string' ? parsed.address : '',
    };
  } catch {
    return { name: '', phone: '', address: '' };
  }
}

/**
 * Resolves the display name of a cart item for on-screen cart drawer display in the active language.
 */
function getCartItemName(item, lang = 'ar') {
  const numId = Number(item?.id);
  const menuEntry =
    (!Number.isNaN(numId) ? menuById.get(numId) : null) ||
    menuById.get(item?.id);

  return menuEntry?.[lang]?.name ?? item?.[lang]?.name ?? item?.name ?? '';
}

/**
 * Resolves the Arabic name of a cart item for WhatsApp ordering with full fallback support
 * (numeric ID, string ID, English/Arabic name lookup in menu data).
 */
function getCartItemArabicName(item) {
  if (!item) return '';

  const numId = Number(item.id);
  const byNum = !Number.isNaN(numId) ? menuById.get(numId) : null;
  if (byNum?.ar?.name) return byNum.ar.name;

  const byId = menuById.get(item.id);
  if (byId?.ar?.name) return byId.ar.name;

  const raw = rawMenuData.find(
    (entry) =>
      entry.id === item.id ||
      entry.id === numId ||
      (item.name && entry.en?.name?.toLowerCase() === String(item.name).toLowerCase()) ||
      (item.name && entry.ar?.name === item.name)
  );
  if (raw?.ar?.name) return raw.ar.name;

  return item.ar?.name ?? item.name ?? '';
}

/**
 * Formats cart items (including any promo gift) and delivery details into a WhatsApp order message.
 * All item names, totals, and labels are sent in Arabic so restaurant staff can clearly fulfill orders.
 */
function buildWhatsAppOrderMessage(cartItems, totalPrice, customer, note) {
  const lines = cartItems.map((item) => {
    const itemName = getCartItemArabicName(item);
    if (item.isFree) {
      return `- ${item.quantity}x ${itemName} (هدية مجانية - 0 ج.م)`;
    }
    return `- ${item.quantity}x ${itemName} (${item.price * item.quantity} ج.م)`;
  });

  const parts = [
    'مرحباً سيتي درينك، أريد طلب:',
    ...lines,
    `الإجمالي: ${totalPrice} ج.م`,
    `الاسم: ${customer.name.trim()}`,
    `رقم الموبايل: ${customer.phone.trim()}`,
    `العنوان: ${customer.address.trim()}`,
  ];

  const trimmedNote = note.trim();
  if (trimmedNote) {
    parts.push(`ملاحظات: ${trimmedNote}`);
  }

  return parts.join('\n');
}

/**
 * Sleek slide-in shopping cart drawer / mobile bottom sheet
 * with quantity controls, 200 EGP free-item promo, delivery checkout fields, and WhatsApp checkout.
 */
export default function CartModal() {
  const {
    cartItems,
    isCartOpen,
    totalItems,
    totalPrice,
    regularSubtotal,
    isFreeItemEligible,
    selectedFreeItem,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    selectFreeItem,
    removeFreeItem,
    clearCart,
    closeCart,
  } = useCart();

  const { lang, isRtl, t } = useLanguage();
  const [customer, setCustomer] = useState(loadInitialCustomer);
  const [orderNote, setOrderNote] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [isGiftPickerOpen, setIsGiftPickerOpen] = useState(true);

  const eligibleFreeItems = useMemo(
    () => getLocalizedMenu(lang).filter((item) => item.price <= FREE_ITEM_MAX_PRICE),
    [lang]
  );

  // Persist customer delivery info for faster repeat orders
  useEffect(() => {
    try {
      window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [customer]);

  // Close drawer on Escape key and lock background scrolling while open
  useEffect(() => {
    if (!isCartOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) {
    return null;
  }

  const updateCustomerField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectGift = (item) => {
    selectFreeItem(item);
    setIsGiftPickerOpen(false);
  };

  const isNameMissing = !customer.name.trim();
  const isPhoneMissing = !customer.phone.trim();
  const isAddressMissing = !customer.address.trim();
  const hasMissingRequired = isNameMissing || isPhoneMissing || isAddressMissing;

  const remainingForFreeItem = Math.max(0, FREE_ITEM_THRESHOLD - regularSubtotal);
  const promoProgressPercent = Math.min(
    100,
    Math.round((regularSubtotal / FREE_ITEM_THRESHOLD) * 100)
  );
  const shouldShowGiftList =
    isFreeItemEligible && (!selectedFreeItem || isGiftPickerOpen);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    if (hasMissingRequired) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    const rawMessage = buildWhatsAppOrderMessage(
      cartItems,
      totalPrice,
      customer,
      orderNote
    );
    const formattedMessage = encodeURIComponent(rawMessage);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${formattedMessage}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const getFieldClass = (hasError) =>
    `w-full min-w-0 rounded-xl border bg-white px-3 py-2 text-base sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-400 focus:ring-red-500/25 focus:border-red-500'
        : 'border-gray-200 focus:ring-orange-500/30 focus:border-orange-500'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer / Bottom Sheet Container */}
      <section className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-full sm:h-full animate-drawer-in">
        {/* Drag Handle (Mobile visual cue) */}
        <div className="sm:hidden flex justify-center pt-2 pb-0.5">
          <span className="w-10 h-1 rounded-full bg-gray-300" aria-hidden="true" />
        </div>

        {/* Drawer Header */}
        <header className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 id="cart-drawer-title" className="text-lg font-black text-gray-900">
              {t.cartTitle}
            </h2>
            {totalItems > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                {t.cartItemsBadge(totalItems)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-bold text-gray-400 hover:text-red-500 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {t.clearCart}
              </button>
            )}
            <button
              type="button"
              onClick={closeCart}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label={t.closeCartAria}
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Cart Items, Promo Gift Selector & Checkout Details */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 space-y-2.5 bg-gray-50/70">
          {cartItems.length === 0 ? (
            <div className="py-14 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <p className="text-base font-extrabold text-gray-800">{t.emptyCartTitle}</p>
              <p className="text-sm text-gray-500 max-w-xs">{t.emptyCartSubtitle}</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {t.browseMenu}
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                const isFree = Boolean(item.isFree);
                const subtotal = isFree ? 0 : item.price * item.quantity;
                const displayName = getCartItemName(item, lang);

                return (
                  <div
                    key={`${item.id}-${isFree ? 'free' : 'paid'}`}
                    className={`rounded-xl p-2.5 border shadow-xs flex items-center gap-3 ${
                      isFree
                        ? 'bg-green-50/70 border-green-200'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={displayName}
                      loading="lazy"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain shrink-0 bg-white border border-gray-100 p-0.5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h3 className="text-sm font-extrabold text-gray-900 truncate">
                            {displayName}
                          </h3>
                          {isFree && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-green-600 text-white">
                              {t.freeGiftBadge}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            isFree ? removeFreeItem() : removeFromCart(item.id, false)
                          }
                          className="text-gray-400 hover:text-red-500 p-0.5 rounded-md transition-colors cursor-pointer shrink-0"
                          aria-label={t.removeItemAria(displayName)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                            aria-hidden="true"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        {isFree ? (
                          <span className="text-xs font-bold text-green-700">
                            1x • {t.freeGiftBadge}
                          </span>
                        ) : (
                          /* Global +/- Controls */
                          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => incrementQuantity(item.id)}
                              className="w-7 h-7 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                              aria-label={t.qtyIncreaseAria(displayName)}
                            >
                              +
                            </button>
                            <span className="w-6 text-center text-sm font-extrabold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => decrementQuantity(item.id)}
                              className="w-7 h-7 rounded-md bg-white hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                              aria-label={t.qtyDecreaseAria(displayName)}
                            >
                              -
                            </button>
                          </div>
                        )}

                        <span
                          className={`text-sm font-black ${
                            isFree ? 'text-green-700' : 'text-orange-600'
                          }`}
                        >
                          {subtotal} {t.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Free Item Promo Section (>= 200 EGP) */}
              {!isFreeItemEligible ? (
                <div className="bg-orange-50/90 border border-orange-200/80 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-bold text-orange-800">
                    {t.promoProgressText(remainingForFreeItem)}
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-orange-200/70 overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${promoProgressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-extrabold text-green-800">
                        {t.promoUnlockedTitle}
                      </h3>
                      <p className="text-[11px] font-semibold text-green-700/90 mt-0.5">
                        {t.promoUnlockedSubtitle}
                      </p>
                    </div>
                    {selectedFreeItem && (
                      <button
                        type="button"
                        onClick={() => setIsGiftPickerOpen((prev) => !prev)}
                        className="shrink-0 text-xs font-extrabold text-green-700 hover:text-green-900 underline underline-offset-2 cursor-pointer"
                      >
                        {isGiftPickerOpen ? t.promoHideGifts : t.promoChangeGift}
                      </button>
                    )}
                  </div>

                  {shouldShowGiftList && (
                    <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pe-0.5">
                      {eligibleFreeItems.length === 0 ? (
                        <p className="col-span-2 text-xs text-green-700 font-semibold">
                          {t.promoNoEligibleItems}
                        </p>
                      ) : (
                        eligibleFreeItems.map((gift) => {
                          const isSelected = selectedFreeItem?.id === gift.id;
                          return (
                            <button
                              key={gift.id}
                              type="button"
                              onClick={() => handleSelectGift(gift)}
                              aria-pressed={isSelected}
                              className={`flex items-center gap-2 p-2 rounded-lg border text-start transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-green-600 text-white border-green-700 shadow-xs'
                                  : 'bg-white text-gray-800 border-green-200 hover:border-green-400'
                              }`}
                            >
                              <img
                                src={gift.image}
                                alt={gift.name}
                                loading="lazy"
                                className="w-9 h-9 rounded-md object-contain bg-white shrink-0 p-0.5"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-extrabold truncate">
                                  {gift.name}
                                </p>
                                <p
                                  className={`text-[10px] font-bold ${
                                    isSelected ? 'text-green-100' : 'text-green-600'
                                  }`}
                                >
                                  {isSelected ? t.promoSelectedLabel : t.promoPickLabel}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Checkout Fields (Full-width & mobile-sized to preview cleanly without swiping) */}
              <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs space-y-2.5">
                <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                  {t.checkoutDetailsTitle}
                </h3>

                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs font-bold text-gray-600 mb-1"
                  >
                    {t.customerNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    autoComplete="name"
                    value={customer.name}
                    onChange={(e) => updateCustomerField('name', e.target.value)}
                    placeholder={t.customerNamePlaceholder}
                    className={getFieldClass(showErrors && isNameMissing)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-xs font-bold text-gray-600 mb-1"
                  >
                    {t.customerPhoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={customer.phone}
                    onChange={(e) => updateCustomerField('phone', e.target.value)}
                    placeholder={t.customerPhonePlaceholder}
                    className={`${getFieldClass(showErrors && isPhoneMissing)} ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-address"
                    className="block text-xs font-bold text-gray-600 mb-1"
                  >
                    {t.customerAddressLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="customer-address"
                    rows={2}
                    autoComplete="street-address"
                    value={customer.address}
                    onChange={(e) => updateCustomerField('address', e.target.value)}
                    placeholder={t.customerAddressPlaceholder}
                    className={`${getFieldClass(showErrors && isAddressMissing)} resize-none leading-snug`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-note"
                    className="block text-xs font-bold text-gray-600 mb-1"
                  >
                    {t.orderNotesLabel}
                  </label>
                  <input
                    id="order-note"
                    type="text"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder={t.orderNotesPlaceholder}
                    className={getFieldClass(false)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fixed Drawer Footer with Total & WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <footer className="px-4 py-3 sm:px-5 sm:py-4 bg-white border-t border-gray-200 space-y-2.5">
            {showErrors && hasMissingRequired && (
              <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {t.checkoutValidationError}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-700">{t.grandTotal}</span>
              <span className="text-xl sm:text-2xl font-black text-orange-600">
                {totalPrice} {t.currency}
              </span>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 sm:py-3.5 px-5 rounded-xl bg-green-500 hover:bg-green-600 active:scale-[0.99] text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-green-500/25 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375a9.923 9.923 0 0 0 4.75 1.219h.004c5.516 0 9.965-4.453 9.965-9.969S17.547 2 12.031 2Zm5.805 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.641-3.109-1.344-5.141-4.484-5.297-4.688-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.312.609-.391.812-.391.203 0 .406.004.578.012.188.008.438-.07.688.531.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.328.391-.469.516-.156.156-.312.328-.141.641.172.312.781 1.297 1.672 2.094 1.156 1.031 2.125 1.344 2.438 1.5.312.156.484.125.672-.078.188-.203.766-.891.969-1.203.203-.312.406-.266.688-.156.281.109 1.797.844 2.109 1 .312.156.516.234.594.359.078.125.078.734-.172 1.438Z" />
              </svg>
              <span>{t.whatsappCheckout}</span>
            </button>
          </footer>
        )}
      </section>
    </div>
  );
}
