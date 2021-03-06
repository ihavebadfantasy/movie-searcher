import { useState, useEffect } from 'react'

const SearchInput = ({setSearchTerm, setIsFocused, placeholder = 'Start Search'}) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [value]);

  useEffect(() => {
    setSearchTerm(debouncedValue);
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
