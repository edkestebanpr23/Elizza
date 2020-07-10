/**
 * @format
 */
import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from "./App";

// Apollo
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

// Context
import GlobalState from "./context/global/globalState";
import SaleState from "./context/sale/saleState";
import ClientState from "./context/client/clientState";
// import FirebaseState from "./context/firebase/firebaseState";

const ElizzaApp = () => {

    return (
        <ApolloProvider client={client}>
            {/* <FirebaseState> */}
            <GlobalState>
                <ClientState>
                    <SaleState>
                        <App />
                    </SaleState>
                </ClientState>
            </GlobalState>
            {/* </FirebaseState> */}
        </ApolloProvider>
    )
};


AppRegistry.registerComponent(appName, () => ElizzaApp);
