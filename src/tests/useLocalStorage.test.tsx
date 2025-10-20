import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartItem } from "@/schemas/Cart";
import { mockCart } from "./mocks/cart";

describe("useLocalStorage (cart)", () => {
  const KEY = "cart";

  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initializes with default empty array if localStorage is empty", async () => {
    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));

    await waitFor(() => {
      expect(result.current[0]).toEqual([]);
    });
  });

  it("initializes with cart items from localStorage if available", async () => {
    window.localStorage.setItem(KEY, JSON.stringify(mockCart));

    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));

    await waitFor(() => {
      expect(result.current[0]).toEqual(mockCart);
    });
  });

  it("updates localStorage when new items are added", () => {
    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));
    const [, setCart] = result.current;

    act(() => {
      setCart(mockCart);
    });

    expect(result.current[0]).toEqual(mockCart);
    expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify(mockCart));
  });

  it("adds a new item using functional update", () => {
    const initialCart = [mockCart[0]];
    const newItem = mockCart[1];

    window.localStorage.setItem(KEY, JSON.stringify(initialCart));

    const { result } = renderHook(() =>
      useLocalStorage<CartItem[]>(KEY, initialCart)
    );

    const [, setCart] = result.current;

    act(() => {
      setCart((prev) => [...prev, newItem]);
    });

    expect(result.current[0]).toEqual([mockCart[0], mockCart[1]]);
    expect(window.localStorage.getItem(KEY)).toBe(
      JSON.stringify([mockCart[0], mockCart[1]])
    );
  });

  it("falls back to initial value if localStorage returns null", async () => {
    window.localStorage.getItem = jest.fn(() => null);

    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));

    await waitFor(() => {
      expect(result.current[0]).toEqual([]);
    });
  });

  it("recovers gracefully if localStorage throws on getItem", async () => {
    const originalGetItem = window.localStorage.getItem;
    window.localStorage.getItem = jest.fn(() => {
      throw new Error("storage error");
    });

    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));

    await waitFor(() => {
      expect(result.current[0]).toEqual([]);
    });

    window.localStorage.getItem = originalGetItem;
  });

  it("does not crash if localStorage throws on setItem", () => {
    const { result } = renderHook(() => useLocalStorage<CartItem[]>(KEY, []));
    const originalSetItem = window.localStorage.setItem;

    window.localStorage.setItem = jest.fn(() => {
      throw new Error("write error");
    });

    const [, setCart] = result.current;

    act(() => {
      setCart(mockCart);
    });

    expect(result.current[0]).toEqual(mockCart);

    window.localStorage.setItem = originalSetItem;
  });
});
