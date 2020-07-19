/**
 * @format
 * @flow
 */

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/configureStore";
import FastingApp from "./src/navigations/Index";

const App = () => {
  return (
    // <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FastingApp />
      </PersistGate>
    </Provider>
    // </>
  );
};

export default App;
