const color = {
  primary: {
    500: '#011377',
    shadow: {
      20: '#01137720',
      40: '#01137740',
      60: '#01137760',
      80: '#01137780',
    },
  },
  gray: {
    100: '#F0F0F0',
    300: '#E3E3E3',
    500: '#808080',
  },
  white: '#ffffff',
  black: '#333333',
  dim: '#00000040',
  error: '#DC3232',
  required: '#DC3232',
  disabled: '#f2f3f4',
};

const layout = {
  margin: {
    xSmall: '0.4rem',
    small: '0.8rem',
    mediumSmall: '1.4rem',
    medium: '2rem',
  },
  padding: {
    xSmall: '0.4rem',
    small: '0.8rem',
    mediumSmall: '1.4rem',
    medium: '2rem',
    mediumLarge: '2.4rem',
  },
  borderRadius: {
    small: '0.4rem',
    medium: '0.8rem',
    large: '50rem',
  },
  fontSize: {
    small: '0.8rem',
    mediumSmall: '1.2rem',
    medium: '1.4rem',
    mediumLarge: '1.8rem',
  },
  labelSize: '1.6rem',
  checkbox: {
    empty: '0.4rem',
    checked: '0.8rem',
    blank: '1.6rem',
  },
};

const Theme = { color, layout };

export default Theme;
