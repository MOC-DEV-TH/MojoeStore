/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ErrorBoundary} from '@components';
import {CashierProvider} from '@providers';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {i18next} from 'src/locales';
import {RootNavigation} from 'src/navigations/RootNavigations';
import {ThemeProvider} from 'src/providers/theme/ThemeProvider';
import {store} from 'src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <I18nextProvider i18n={i18next}>
            <CashierProvider>
              <RootNavigation />
            </CashierProvider>
          </I18nextProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
