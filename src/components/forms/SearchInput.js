import { useState, useEffect } from 'react'
const SearchInput = ({searchTerm, setSearchTerm, setIsFocused, placeholder = 'Start Search'}) => {
  const [value, setValue] = useState(searchTerm);
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    if (value !== searchTerm) {
      setValue(searchTerm);
    }
  }, [searchTerm])

  useEffect(() => {
    let timeoutId;

    if (value !== searchTerm) {
      timeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      setSearchTerm(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <form
      className="w-100"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchTerm(value);
      }}
    >
      <div className="nes-field w-100">
        <input
          type="text"
          className="nes-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={() => {
            if (setIsFocused) {
              setIsFocused(true);
            }
          }}
          onBlur={() => {
            if (setIsFocused) {
              setIsFocused(false);
            }
          }}
        />
      </div>
    </form>
  );
}

export default SearchInput;
