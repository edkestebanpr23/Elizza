import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "apollo-link-context";

// ¿Modo local?
const local = false;

var url = Platform.OS === 'ios' ? 'http://192.168.1.51:3002/graphql' : 'http://192.168.1.54:4001/graphql';
if (!local) {
    console.log('Accediendo al servidor https://elizaserver.herokuapp.com/graphql');
    url = 'https://elizaserver.herokuapp.com/graphql';
};

const httpLink = createHttpLink({
    uri: url,
});

// Con esto vamos a pasar el token por el header
const authLink = setContext(async (_, { headers }) => {
    // Leer token
    const token = await AsyncStorage.getItem('token');
    // console.log('Token CLI', token);

    return {
        // Retorno un heder con todo lo que tenia, mas el Token si existe
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '', // Se supone que es un estandar retornarlo así...
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;