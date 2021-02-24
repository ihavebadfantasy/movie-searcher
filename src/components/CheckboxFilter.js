const CheckboxFilter = ({checkboxes, toggleCheckbox}) => {
  const renderedCheckboxes = checkboxes.map((checkbox) => {
    return (
      <label style={{width: '100%'}}>
        <input
          type="checkbox"
          className="nes-checkbox"
          checked={checkbox.checked}
          value={checkbox.value}
          onChange={(e) => {
            toggleCheckbox(e.target.value);
          }}
        />
        <span>
          {checkbox.label}
        </span>
      </label>
    );
  })

  return (
    <div>
      {renderedCheckboxes}
    </div>
  );
}

export default CheckboxFilter;
