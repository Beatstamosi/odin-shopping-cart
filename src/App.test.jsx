// App.test.jsx
import { render, screen } from "@testing-library/react";
import { renderWithRouter } from "./TestUtils.jsx/TestRouter";
import { expect } from "vitest";

test("renders header and footer on page load", async () => {
  const { ui } = renderWithRouter("/");
  render(ui);

  expect(await screen.findByTestId("header")).toBeInTheDocument();
  expect(await screen.findByTestId("footer")).toBeInTheDocument();
  expect(await screen.findByTestId("home")).toBeInTheDocument();
});
