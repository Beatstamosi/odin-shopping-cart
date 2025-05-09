import { render, screen } from "@testing-library/react";
import { renderWithRouter } from "./TestUtils/TestRouter.jsx";
import { expect, describe } from "vitest";

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
});
