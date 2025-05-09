import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import { createMemoryHistory } from "history";
import { CartContext } from "../CartContext";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";
import { useCart } from "../CartContext";

describe("renders product Card correctly", () => {
  let history;
  const shoppingCart = [];
  const setShoppingCart = vi.fn();

  const product = {
    id: 0,
    title: "Test Product",
    price: 100,
    description: "Description Test Product",
    category: "Tests",
    image: "http://example.com/",
  };

  beforeEach(() => {
    // Initialize memory history
    history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
          <ProductCard product={product} />
        </CartContext.Provider>
      </Router>
    );
  });

  test("displays product image", () => {
    const image = screen.getByRole("presentation");
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("http://example.com/");
  });

  test("displays product title", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("displays formatted product price", () => {
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("forwards to product overview", async () => {
    const link = screen.getByText("View More");
    const user = userEvent.setup();

    await user.click(link);

    expect(history.location.pathname).toBe("/products/0");
  });

  test("expect quantity to be 1 by default", () => {
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");
  });

  test("increases quantity", async () => {
    const input = screen.getByRole("textbox");
    const increaseBtn = screen.getByText("+");
    const user = userEvent.setup();

    await user.click(increaseBtn);
    await user.click(increaseBtn);
    await user.click(increaseBtn);

    expect(input.value).toBe("4");
  });

  test("decreases quantity", async () => {
    const input = screen.getByRole("textbox");
    const increaseBtn = screen.getByText("+");
    const decreaseBtn = screen.getByText("-");
    const user = userEvent.setup();

    // increase first
    await user.click(increaseBtn);
    await user.click(increaseBtn);
    expect(input.value).toBe("3");

    await user.click(decreaseBtn);
    expect(input.value).toBe("2");

    await user.click(decreaseBtn);
    await user.click(decreaseBtn);

    expect(input.value).toBe("1");
  });

  test("calls addToCart when pressing the Add to cart button", async () => {
    const button = screen.getByRole("button", { name: "Add to Cart" });
    const user = userEvent.setup();

    await user.click(button);

    expect(setShoppingCart).toHaveBeenCalledWith([
      ...shoppingCart,
      { ...product, quantity: 1 },
    ]);
  });
});
