import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, describe, test, beforeEach } from "vitest";
import Footer from "./Footer";

describe("renders footer correctly", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test("renders nav links", () => {
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Terms and Conditions")).toBeInTheDocument();
  });

  test("renders image links", () => {
    expect(screen.getByLabelText("instagram")).toHaveProperty("href", "https://instagram.com/");
    expect(screen.getByLabelText("youtube")).toHaveProperty("href", "https://youtube.com/");
  })
});
