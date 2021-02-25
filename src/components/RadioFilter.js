const RadioFilter = ({items, toggleSelected, name, text}) => {
  const renderedRadios = items.map((item) => {
    return (
      <label style={{width: '40%'}} key={`${item.label}-${name}`}>
        <input
          type="radio"
          className="nes-radio"
          checked={item.checked}
          name={name}
          value={item.value}
          onChange={(e) => {
            toggleSelected(e.target.value);
          }}
        />
        <span>
          {item.label}
        </span>
      </label>
    );
  })

  return (
    <div className="mv-20 mb-30">
      <p className="gray small-text">
        {text}
      </p>
      {renderedRadios}
    </div>
  );
}

export default RadioFilter;
