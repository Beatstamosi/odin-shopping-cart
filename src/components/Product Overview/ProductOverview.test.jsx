import { render, screen } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import { createMemoryHistory } from "history";
import { CartContext } from "../CartContext";
import userEvent from "@testing-library/user-event";
import ProductOverview from "./ProductOverview";
import { ProductsContext } from "../productsContext";

describe("renders product Card correctly", () => {
  let history;
  const shoppingCart = [];
  const setShoppingCart = vi.fn();

  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useParams: vi.fn(() => ({ id: "0" })),
    };
  });

  const product = {
    id: 0,
    title: "Test Product",
    price: 100,
    description: "Description Test Product",
    category: "Tests",
    image: "http://example.com/",
  };

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
    // Initialize memory history
    history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ProductsContext.Provider value={products}>
          <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
            <ProductOverview />
          </CartContext.Provider>
        </ProductsContext.Provider>
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

  test("displays product description", () => {
    expect(screen.getByText("Description Test Product")).toBeInTheDocument();
  })

  test("navigates back to products", async () => {
    const link = screen.getByText("← Back to all Products");
    const user = userEvent.setup();

    await user.click(link);

    expect(history.location.pathname).toBe("/products");
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
