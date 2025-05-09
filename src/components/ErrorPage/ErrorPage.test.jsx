import { render, screen } from "@testing-library/react";
import { test, describe, beforeEach } from "vitest";
import ErrorPage from "./ErrorPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("renders Error Element correctly", () => {
  // Mock only useRouteError from react-router-dom
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useRouteError: () => ({ message: "Test Error occurred" }),
    };
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
  });

  test("renders Error Element", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Oops!"
    );
    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
  });

  test("allows user to go back to products", async () => {
    const user = userEvent.setup();
    const btn = screen.getByText("Back to Home");
    await user.click(btn);

    expect(window.location.pathname).toBe("/");
  });
});
