import type { Product } from "../types";
import { rand } from "../utils/rand";
import { sample } from "../utils/sample";
import { CATEGORIES } from "./categories";

// Generate dataset (200 items)
export const DATASET: Product[] = Array.from({ length: 200 }).map((_, i) => {
  const cat = sample(CATEGORIES);
  const baseNames: Record<Product["category"], string[]> = {
    Electronics: [
      "Headphones",
      "Keyboard",
      "Mouse",
      "Monitor",
      "Webcam",
      "SSD",
    ],
    Books: ["Design Patterns", "Clean Code", "Refactoring", "Domain‑Driven"],
    Clothing: ["T‑Shirt", "Jeans", "Sneakers", "Jacket"],
    Home: ["Lamp", "Chair", "Table", "Cushion"],
    Toys: ["Puzzle", "Robot", "Lego", "Doll"],
  };
  const name = `${cat} ${sample(baseNames[cat])} ${i + 1}`;
  return {
    id: `p${i + 1}`,
    name,
    category: cat,
    price: rand(30, 1500),
    rating: rand(1, 5),
    status: sample(["in_stock", "out_of_stock", "preorder"] as const),
    description: `Detailed description for ${name}.`,
  };
});
