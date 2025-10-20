"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  value: string;
  onChange: (term: string) => void;
  debounceTime?: number;
  placeholder?: string;
};

export const Search = ({
  value,
  onChange,
  debounceTime = 300,
  placeholder = "Search for a smartphone...",
}: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue.trimStart(), debounceTime);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="c-search"
      role="search"
    >
      <input
        type="text"
        autoComplete="off"
        name="search"
        placeholder={placeholder}
        aria-label="Search products"
        className="c-search__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="c-search__clear"
          aria-label="Clear search term"
        >
          <Image src="/cross.svg" alt="Clear" width={20} height={19} />
        </button>
      )}
    </form>
  );
};
