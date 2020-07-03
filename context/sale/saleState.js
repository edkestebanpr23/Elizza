import React, { useReducer } from "react";
import SaleReducer from "./saleReducer";
import SaleContext from "./saleContext";
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../types";

const SaleState = props => {

    // Creando un state inicial
    const initialState = {
        products: []
    };

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(SaleReducer, initialState);

    

    const addProduct = product => {
        dispatch({
            type: ADD_PRODUCT,
            payload: product
        })
    }

    const deleteProduct = (product) => {
        dispatch({
            type: DELETE_PRODUCT,
            payload: product
        })
    }

    const editProduct = (last, product, index) => {
        let _products = state.products;
        _products[index] = product;
        dispatch({
            type: UPDATE_PRODUCT,
            payload: _products
        })
    };

    const emptyCart = () => {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: []
        })
    }

    const parseMoney = money => {
        if (money) {
            money = money.toString();
            let aux = "";
            let count = 0;
            for (let i = money.length - 1; i >= 0; i--) {
                count++;
                if (count == 3) {
                    aux = '.' + money[i] + aux;
                } else if (count == 6) {
                    if (money.length > 6) {
                        aux = "'" + money[i] + aux;
                    } else {
                        aux = money[i] + aux;
                    }
                } else {
                    aux = money[i] + aux;
                }
            }
            return aux;
        } else {
            return money;
        }
    }

    return (
        <SaleContext.Provider
            value={{
                products: state.products,
                addProduct,
                parseMoney,
                deleteProduct,
                editProduct,
                emptyCart
            }}
        >
            {props.children}
        </SaleContext.Provider>
    );
};

export default SaleState;