const classes = {
  withTitle: 'with-title',
  dark: 'is-dark',
  titleCentered: 'title-centered',
  rounded: 'is-rounded',
}

const generateClassesList = (theme, customClass) => {
  let res = 'nes-container';

  if (theme) {
    theme.forEach((item) => {
      res += ` ${classes[item]}`;
    })
  }

  if (customClass) {
    res += ` ${customClass}`;
  }

  return res;
}

const Container = ({withTitle, dark, titleCentered, rounded, title, customClass, children, theme}) => {
  const classes = generateClassesList(theme, customClass);

  return (
    <div className={classes}>
      {title && <p className="title">{title}</p>}
      {children}
    </div>
  );
}

export default Container;
