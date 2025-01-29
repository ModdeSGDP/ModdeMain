import type { Product } from "../types/product"

export const filterProducts = (
  products: Product[],
  selectedCategories: string[],
  selectedSizes: string[],
  selectedMaterials: string[],
  priceRange: { low: number; high: number },
) => {
  return products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category) ||
      selectedCategories.includes(product.gender)
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
    const priceMatch = product.price >= priceRange.low && product.price <= priceRange.high

    return categoryMatch && sizeMatch && materialMatch && priceMatch
  })
}

