import React from 'react';
import getTheme from '../ThemeColor';

//initial context
export const ManageThemeContext = React.createContext({
  mode: 'light',
  theme: getTheme('light'),
  toggleTheme: () => {},
});

//define hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

//initial context provider
export default class ThemeManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'light',
    };
  }

  componentDidUpdate() {
    console.log('Theme updated => ' + this.state.mode);
  }

  toggleTheme = async (mode) => {
    this.setState({ mode: mode });
  };

  render() {
    return (
      <ManageThemeContext.Provider
        value={{
          mode: this.state.mode,
          theme: getTheme(this.state.mode),
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </ManageThemeContext.Provider>
    );
  }
}
