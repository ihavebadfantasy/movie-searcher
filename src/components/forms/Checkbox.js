import { useTranslation } from 'react-i18next';

const Checkbox = ({checkboxes, toggleCheckbox, localize = false}) => {
  const [ t ] = useTranslation('checkboxesLabels');

  const renderedCheckboxes = checkboxes.map((checkbox) => {
    return (
      <label style={{width: '100%'}} key={checkbox.value}>
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
          {localize ? t(checkbox.label) : checkbox.label}
        </span>
      </label>
    );
  })

  return (
    <div className="scrollable-y h-190 scrollbar">
      {renderedCheckboxes}
    </div>
  );
}

export default Checkbox;
