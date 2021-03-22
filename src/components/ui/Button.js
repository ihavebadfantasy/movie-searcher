import { useContext } from 'react';
import config from '../../config';
import ThemeContext from '../../contexts/ThemeContext';

const { basic, nes }  = config.themes;

const colors = {
  primary: 'is-primary',
  success: 'is-success',
  warning: 'is-warning',
  error: 'is-error',
  disabled: 'is-disabled',
  white: '',
  empty: 'is-empty',
  emptyBordered: 'is-empty-bordered',
  emptyPrimary: 'is-empty-primary',
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
  const { theme } = useContext(ThemeContext);

  return (
    <button
      type={type}
      className={`nes-btn ${colors[color]} ${customClass} uk-button-default uk-button`}
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
