const colors = {
  primary: 'is-primary',
  success: 'is-success',
  warning: 'is-warning',
  error: 'is-error',
  disabled: 'is-disabled',
  white: '',
};

const Button = ({
  text,
  color = 'primary',
  customClass = '',
  type = 'button',
  onClick,
  disabled = false,
  style={},
  children
}) => {
  console.log('chil', children, text)
  return (
    <button
      type={type}
      className={`nes-btn ${colors[color]} ${customClass}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children ? children : (
        <div>
          {text}
        </div>
      )}
    </button>
  );
}

export default Button;
