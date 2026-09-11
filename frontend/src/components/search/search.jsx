import { useState } from "react";
import "./search.css";
import { FaSearchLocation } from "react-icons/fa";

export default function Search({ setKeyword }) {
  const [inputKeyword, setInputKeyword] = useState("");

  function handleSearch() {
    setKeyword(inputKeyword.trim());
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="물품명을 검색해주세요."
        className="searchbox"
        value={inputKeyword}
        onChange={(event) => setInputKeyword(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="search-button"
        aria-label="검색"
        onClick={handleSearch}
      >
        <FaSearchLocation size={22} />
      </button>
    </div>
  );
}
