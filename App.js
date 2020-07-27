import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

// Components
import Start from "./views/Start";
import Tabs from "./views/Tabs";
// Context
import GlobalContext from "./context/global/globalContext";


const App = () => {
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

  const { session, user } = useContext(GlobalContext);

  console.log('La sesion es:', session);
  console.log('El usuario es:', user);

  const View = (session && user) ? <Tabs /> : <Start />;

  return (
    <>
      {View}
    </>

  );
};

const styles = StyleSheet.create({

});

export default App;