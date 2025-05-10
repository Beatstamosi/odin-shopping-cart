import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CartContext } from "../CartContext";
import ShoppingCart from "./ShoppingCart";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function TestWrapper({ children, initialCart = [] }) {
  const [shoppingCart, setShoppingCart] = useState(initialCart);

  return (
    <MemoryRouter>
      <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
        {children}
      </CartContext.Provider>
    </MemoryRouter>
  );
}

describe("renders shopping Cart correctly", () => {
  // run test with empty shopping Cart
  test("displays cart is empty", () => {
    const setShoppingCart = vi.fn();
    const shoppingCart = [];

    render(
      <MemoryRouter>
        <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
          <ShoppingCart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Your Cart is empty.")).toBeInTheDocument();
  });

  // prepare shopping Cart with products
  const setShoppingCart = vi.fn();

  const product1 = {
    id: 0,
    title: "Test Product",
    price: 100,
    description: "Description Test Product",
    category: "Tests",
    image: "http://example.com/",
  };

  const product2 = {
    id: 1,
    title: "Test Product 2",
    price: 150,
    description: "Description Test Product 2",
    category: "Tests",
    image: "http://example2.com/",
  };

  const product3 = {
    id: 2,
    title: "men hair",
    price: 2000,
    description: "Description Test Product 3",
    category: "Tests",
    image: "http://example3.com/",
  };

  const product4 = {
    id: 3,
    title: "woman hair",
    price: 2000,
    description: "Description Test Product 4",
    category: "Tests",
    image: "http://example4.com/",
  };

  const shoppingCart = [
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 },
    { product: product4, quantity: 1 },
  ];

  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
          <ShoppingCart />
        </CartContext.Provider>
      </MemoryRouter>
    );
  });

  test("displays all products in shopping cart (4)", () => {
    const buttons = screen.getAllByRole("button", { name: "x" });
    expect(buttons.length).toBe(4);
  });

  test("displays total amount (4250.00€)", () => {
    const total = screen.getByTestId("totalAmount").textContent;
    expect(total).toEqual("4250.00€");
  });

  test("renders alert on checkout", async () => {
    global.alert = vi.fn();

    const user = userEvent.setup();
    const checkout = screen.getByText("Checkout");

    await user.click(checkout);

    expect(global.alert).toHaveBeenCalled();
  });
});

describe("test behaviour of quantity changes", () => {
  const product1 = {
    id: 0,
    title: "Test Product",
    price: 100,
    description: "Description Test Product",
    category: "Tests",
    image: "http://example.com/",
  };

  const product2 = {
    id: 1,
    title: "Test Product 2",
    price: 150,
    description: "Description Test Product 2",
    category: "Tests",
    image: "http://example2.com/",
  };

  test("increases quantity of single product (product1) and updates total", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper initialCart={[{ product: product1, quantity: 1 }]}>
        <ShoppingCart />
      </TestWrapper>
    );

    const total = screen.getByTestId("totalAmount");
    const container = screen.getByTestId("quantity-handler-0");
    const input = within(container).getByRole("textbox");
    const increaseBtn = within(container).getByText("+");
    const decreaseBtn = within(container).getByText("-");

    await user.click(increaseBtn);
    await user.click(increaseBtn);

    expect(input.value).toBe("3");
    expect(total.textContent).toBe("300.00€");

    await user.click(decreaseBtn);
    expect(input.value).toBe("2");
    expect(total.textContent).toBe("200.00€");
  });

  test("deletes element and updates total - one product", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper initialCart={[{ product: product1, quantity: 1 }]}>
        <ShoppingCart />
      </TestWrapper>
    );

    const total = screen.getByTestId("totalAmount");
    const container = screen.getByTestId("quantity-handler-0");
    const input = within(container).getByRole("textbox");
    const deleteBtn = screen.getByRole("button", { name: "x" });

    expect(total.textContent).toBe("100.00€");

    await user.click(deleteBtn);

    expect(total).not.toBeInTheDocument();
    expect(container).not.toBeInTheDocument();
  });

  test("deletes element (product1) and updates total - multiple products", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper
        initialCart={[
          { product: product1, quantity: 1 },
          { product: product2, quantity: 1 },
        ]}
      >
        <ShoppingCart />
      </TestWrapper>
    );

    const total = screen.getByTestId("totalAmount");
    const container = screen.getByTestId("container-product-0");
    const deleteBtn = within(container).getByRole("button", { name: "x" });

    expect(total.textContent).toBe("250.00€");

    await user.click(deleteBtn);

    expect(total.textContent).toBe("150.00€");
  });
});
