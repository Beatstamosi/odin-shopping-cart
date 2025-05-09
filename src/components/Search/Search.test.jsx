import { render, screen } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import { createMemoryHistory } from "history";
import { CartContext } from "../CartContext";
import Search from "./Search";
import { ProductsContext } from "../productsContext";
import userEvent from "@testing-library/user-event";

describe("renders product Card correctly", () => {
  let history;
  const shoppingCart = [];
  const setShoppingCart = vi.fn();

  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLocation: vi.fn(() => ({ search: "?q=men" })),
    };
  });

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
    {
      id: 2,
      title: "men hair",
      price: 2000,
      description: "Description Test Product 3",
      category: "Tests",
      image: "http://example3.com/",
    },
    {
        id: 3,
        title: "woman hair",
        price: 2000,
        description: "Description Test Product 4",
        category: "Tests",
        image: "http://example4.com/",
      },
  ];

  beforeEach(() => {
    // Initialize memory history
    history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ProductsContext.Provider value={products}>
          <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
            <Search />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </Router>
    );
  });

  test("displays one product that matches search", () => {
    const container = screen.getByTestId("containerSearchProducts");
    expect(container.children.length).toBe(1);
  });

//   test("back to all products link", () => {
//     const link = screen.getByText("← Back to all Products");
//     const user = userEvent.setup();

//     await user.click(link);
//   })
});
