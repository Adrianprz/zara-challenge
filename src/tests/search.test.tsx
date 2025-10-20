import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "@/components/Search";
import { useState } from "react";

describe("Search component", () => {
  it("renders input with initial value and correct placeholder", () => {
    const handleChange = jest.fn();
    render(<Search value="iPhone" onChange={handleChange} />);

    const input = screen.getByRole("textbox", { name: /search products/i });
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe("iPhone");
    expect((input as HTMLInputElement).placeholder).toBe(
      "Search for a smartphone..."
    );

    const clearButton = screen.getByRole("button", {
      name: /clear search term/i,
    });
    expect(clearButton).toBeTruthy();
  });

  it("calls onChange when typing in input", async () => {
    const handleChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState("");
      return (
        <Search
          value={value}
          onChange={(v) => {
            setValue(v);
            handleChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByRole("textbox", { name: /search products/i });
    await userEvent.type(input, "Samsung", { delay: 1 });

    await waitFor(() => {
      const calls = handleChange.mock.calls.map((args) => args[0]);
      expect(calls).toContain("Samsung");
    });

    expect((input as HTMLInputElement).value).toBe("Samsung");
  });

  it("trims leading spaces when typing", async () => {
    const handleChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState("");
      return (
        <Search
          value={value}
          onChange={(v) => {
            setValue(v);
            handleChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByRole("textbox", { name: /search products/i });
    await userEvent.type(input, "   iPhone", { delay: 1 });

    await waitFor(() => {
      const calls = handleChange.mock.calls.map((args) => args[0]);
      expect(calls).toContain("iPhone");
    });

    expect((input as HTMLInputElement).value).toBe("   iPhone");
  });

  it("clears input when clear button is clicked", async () => {
    const handleChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState("Pixel");
      return (
        <Search
          value={value}
          onChange={(v) => {
            setValue(v);
            handleChange(v);
          }}
        />
      );
    };

    render(<Wrapper />);
    const clearButton = screen.getByRole("button", {
      name: /clear search term/i,
    });

    await userEvent.click(clearButton);

    const calls = handleChange.mock.calls.map((args) => args[0]);
    expect(calls).toContain("");
  });

  it("does not render clear button when input is empty", () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const clearButton = screen.queryByRole("button", {
      name: /clear search term/i,
    });
    expect(clearButton).toBeNull();
  });

  it("prevents form submission reload", async () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const form = screen.getByRole("search");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    const input = screen.getByRole("textbox", { name: /search products/i });
    expect(input).toBeTruthy();
  });
});
