import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaaperProvider } from 'react-native-paper';

import ThemeManager from './components/ThemeManager';
import Entry from './Entry';

function App() {
  return (
    <PaaperProvider>
      <ThemeManager>
        <Entry />
      </ThemeManager>
    </PaaperProvider>
  );
}

export default App;
