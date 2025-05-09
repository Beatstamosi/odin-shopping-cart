import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import { CartContext } from "../CartContext";
import Products from "./Products";
import { ProductsContext } from "../productsContext";

describe("renders product Card correctly", () => {
  const shoppingCart = [];
  const setShoppingCart = vi.fn();

  const products = [
    {
      id: 0,
      title: "Test Product",
      price: 100,
      description: "Description Test Product",
      category: "Tests",
      image: "http://example.com/",
    },
    {
      id: 1,
      title: "Test Product 2",
      price: 150,
      description: "Description Test Product 2",
      category: "Tests",
      image: "http://example2.com/",
    },
  ];

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ProductsContext.Provider value={products}>
          <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
            <Products />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </MemoryRouter>
    );
  });

  test("displays product cards", () => {
    const container = screen.getByTestId("products");
    expect(container.children.length).toBe(2)
  });
});
