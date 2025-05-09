// App.test.jsx
import { render, screen } from "@testing-library/react";
import { renderWithRouter } from "./TestUtils.jsx/TestRouter";

test("renders header and footer on page load", async () => {
  const { ui } = renderWithRouter("/");
  render(ui);

  expect(await screen.findByLabelText("store-title")).toBeInTheDocument();
});
