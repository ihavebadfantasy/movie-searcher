const Radio = ({items, toggleSelected, name, text, width = '40%'}) => {
  const renderedRadios = items.map((item) => {
    return (
      <label style={{width}} key={`${item.label}-${name}`}>
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
    <div className="mv-20 mb-30 scrollable-y h-190 scrollbar">
      <p className="gray small-text">
        {text}
      </p>
      {renderedRadios}
    </div>
  );
}

export default Radio;
