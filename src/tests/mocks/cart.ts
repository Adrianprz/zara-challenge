import { CartItem } from "@/schemas/Cart";

export const mockCart: CartItem[] = [
  {
    product: {
      id: "3",
      brand: "Xiaomi",
      name: "Mi 11",
      basePrice: 749,
      imageUrl:
        "https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg",
    },
    color: {
      name: "blue",
      hexCode: "#0000FF",
      imageUrl:
        "https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg",
    },
    storage: { capacity: "64GB", price: 749 },
    quantity: 1,
  },
  {
    product: {
      id: "1",
      brand: "Apple",
      name: "iPhone 12",
      basePrice: 909,
      imageUrl:
        "https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg",
    },
    color: {
      name: "black",
      hexCode: "#000000",
      imageUrl:
        "https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg",
    },
    storage: { capacity: "64GB", price: 909 },
    quantity: 1,
  },
];
