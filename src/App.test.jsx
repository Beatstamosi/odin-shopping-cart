import { render, screen, act, waitFor } from "@testing-library/react";
import { renderWithRouter } from "./TestUtils/TestRouter.jsx";
import { expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ProductsContext } from "./components/productsContext.js";
import { CartContext } from "./components/CartContext.js";
import React from "react";

describe("Test Routing Paths", () => {
  test("renders header, home and footer on page load", async () => {
    const { ui } = renderWithRouter("/");
    render(ui);

    expect(await screen.findByTestId("header")).toBeInTheDocument();
    expect(await screen.findByTestId("footer")).toBeInTheDocument();
    expect(await screen.findByTestId("home")).toBeInTheDocument();
  });

  test("renders Error Page", async () => {
    const { ui } = renderWithRouter("/wrgwgww");
    render(ui);

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });

  test("renders Products Page", async () => {
    const { ui } = renderWithRouter("/products");
    render(ui);

    expect(await screen.findByTestId("products")).toBeInTheDocument();
  });

  test("renders Product Overview", async () => {
    const { ui } = renderWithRouter("/products/1");
    render(ui);

    expect(await screen.findByTestId("productOverview")).toBeInTheDocument();
  });

  test("renders Error, when product not exists", async () => {
    const { ui } = renderWithRouter("/products/15");
    render(ui);

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });

  test("renders Shopping Cart", async () => {
    const { ui } = renderWithRouter("/cart");
    render(ui);

    expect(await screen.findByTestId("shoppingCart")).toBeInTheDocument();
  });

  test("renders Search", async () => {
    const { ui } = renderWithRouter("/search");
    render(ui);

    expect(await screen.findByTestId("search")).toBeInTheDocument();
  });

  test("does not render Item Added notification", () => {
    const { ui } = renderWithRouter("/");
    render(ui);

    const notification = screen.queryByTestId("notificationItemAdded");
    expect(notification).not.toBeInTheDocument();
  });
});

test("Shows notification when item is added to cart", async () => {
  // 1. Set up mock product
  const mockProduct = {
    id: "1",
    title: "Test Product 1",
    price: 100,
    description: "Test Description",
    image: "http://example.com/image.jpg",
  };

  // 2. Create test wrapper with proper context
  function TestWrapper({ children }) {
    const [shoppingCart, setShoppingCart] = useState([]);

    return (
      <ProductsContext.Provider value={[mockProduct]}>
        <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
          {children}
        </CartContext.Provider>
      </ProductsContext.Provider>
    );
  }

  // 3. Render component
  const { ui } = renderWithRouter("/products/1");
  render(<TestWrapper>{ui}</TestWrapper>);

  // 4. Wait for product to load and find button
  await screen.findByTestId("productOverview");
  const button = screen.getByRole("button", { name: /add to cart/i });
  const user = userEvent.setup();

  // 5. Trigger the notification
  await user.click(button);

  // 6. Verify notification appears
  const notification = await screen.findByTestId("notificationItemAdded");
  expect(notification).toBeInTheDocument();

  // 7. Wait for notification to disappear
  await waitFor(
    () => {
      expect(
        screen.queryByTestId("notificationItemAdded")
      ).not.toBeInTheDocument();
    },
    { timeout: 2000 }
  ); // Slightly longer than 1700ms timeout
});
