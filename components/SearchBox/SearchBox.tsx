"use client";

import React from "react";

export interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search notes..."
      className="border px-3 py-2 rounded w-full"
    />
  );
};

export default SearchBox;
