import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import Header from "./Header";
import { beforeEach, expect, test, vi } from "vitest";
import { CartContext } from "../CartContext";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

describe("renders Header component correctly", () => {
  let history;

  beforeEach(() => {
    // Initialize memory history
    history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <CartContext.Provider
          value={{ shoppingCart: [], setShoppingCart: vi.fn() }}
        >
          <Header />
        </CartContext.Provider>
      </Router>
    );
  });

  test("renders searchbar", () => {
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  test("renders shoppingCart Button", () => {
    const link = screen.getByTestId("cartLink");
    expect(link).toBeInTheDocument();
    expect(link.href).toContain("/cart");
  });

  test("forwards to cart on click", async () => {
    const link = screen.getByTestId("cartLink");

    const user = userEvent.setup();
    await user.click(link);
    expect(history.location.pathname).toBe("/cart");
  });

  test("searchbar updates value on input updates path to search", async () => {
    let bar = screen.getByRole("searchbox");
    const user = userEvent.setup();

    await user.type(bar, "men");
    expect(bar.value).toMatch("men");
    expect(history.location.pathname).include("/search");
  });

  test("displays amount of cart correctly", () => {
    const cartAmount = screen.queryByTestId("cartAmount");
    expect(cartAmount).not.toBeInTheDocument();

    render(
      <Router location={history.location} navigator={history}>
        <CartContext.Provider
          value={{ shoppingCart: [{ quantity: 2 }, { quantity: 3 }], setShoppingCart: vi.fn() }}
        >
          <Header />
        </CartContext.Provider>
      </Router>
    );

    const updatedCartAmount = screen.queryByTestId("cartAmount");
    expect(updatedCartAmount).toBeInTheDocument();
    expect(updatedCartAmount.textContent).toBe("5");
  });
});