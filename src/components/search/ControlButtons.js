import Button from '../ui/Button';

const ControlButtons = ({onSearch, onReset}) => {
  return (
    <>
      <Button
        customClass="w-100"
        text="Search"
        onClick={onSearch}
      />

      <Button
        customClass="w-100 mt-30"
        text="Reset All"
        onClick={onReset}
        color="error"
      /></>
  );
}

export default ControlButtons;
