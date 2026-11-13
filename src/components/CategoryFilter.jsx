import { useLanguage } from '../context/LanguageContext';

/**
 * Horizontal scrollable category pill filter bar.
 * Highlights the active category in vibrant primary orange.
 */
export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  const { lang, t } = useLanguage();

  return (
    <nav
      aria-label={t.categoriesNavAria}
      className="sticky top-16 z-20 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200/70 py-3"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            const label = category[lang] ?? category.ar;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                aria-pressed={isActive}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-l from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
