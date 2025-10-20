import {
  ProductColor,
  ProductListItem,
  ProductStorage,
} from "@/schemas/Product/ProductSchema";

export const product: ProductListItem = {
  id: "1",
  brand: "Apple",
  name: "iPhone 12",
  imageUrl: "https://example.com/iphone.png",
  basePrice: 909,
};

export const color: ProductColor = {
  name: "white",
  hexCode: "#FFFFFF",
  imageUrl:
    "https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg",
};

export const storage: ProductStorage = { capacity: "128", price: 909 };
