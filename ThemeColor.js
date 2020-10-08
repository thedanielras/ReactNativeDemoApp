export const ThemeColors = {
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  secondary: '#57DAFB',
  secondaryVariant: '#00a8c8',
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  surface: {
    light: "#FFFFFF",
    dark: "#1E1E1E"
  },
  topSurface: {
    light: "#FFFFFF",
    dark: "#353535"
  },
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: {
    light: '#000000',
    dark: '#FFFFFF',
  },
  onSurface: {
    light: '#000000',
    dark: '#FFFFFF',
  },
};

export default getTheme = (mode) => {
  let Theme = {};

  for (let key in ThemeColors) {
    if (ThemeColors[key][mode]) Theme[key] = ThemeColors[key][mode];
    else Theme[key] = ThemeColors[key];
  }
  Theme.isLight = mode === "light";
  return Theme;
};
