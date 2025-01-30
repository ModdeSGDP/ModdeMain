export interface Product {
    id: string
    name: string
    brand: string
    price: number
    image: any // Using 'any' for now, but ideally this should be a more specific type
    tag?: "popular" | "recommended"
    category: string
    gender: "Men" | "Women"
    sizes: string[]
    material: string
  }
  
  