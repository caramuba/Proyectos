export default function FiltersBar({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onlyStock,
  setOnlyStock,
  sortOption,
  setSortOption,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-blue-500 transition"
      />

      <input
        type="number"
        placeholder="Precio min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        type="number"
        placeholder="Precio max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="none">Sin orden</option>
        <option value="priceAsc">Precio: Menor a Mayor</option>
        <option value="priceDesc">Precio: Mayor a Menor</option>
        <option value="az">Nombre: A-Z</option>
        <option value="za">Nombre: Z-A</option>
      </select>

      <label className="flex items-center gap-2 mb-6 text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          checked={onlyStock}
          onChange={(e) => setOnlyStock(e.target.checked)}
          className="w-5 h-4"
        />
        Solo mostrar productos en stock
      </label>
    </div>
  );
}
