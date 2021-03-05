const colors = {
  primary: 'is-primary',
  success: 'is-success',
  warning: 'is-warning',
  error: 'is-error',
  disabled: 'is-disabled'
};

const Button = ({text, color = 'primary', customClass = '', type = 'button', onClick}) => {
  return (
    <button
      type={type}
      className={`nes-btn ${colors[color]} ${customClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
