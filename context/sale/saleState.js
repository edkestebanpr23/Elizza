import React, { useReducer } from "react";
import SaleReducer from "./saleReducer";
import SaleContext from "./saleContext";
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_SALE, UPDATE_SALE, UPDATE_PAYMENT } from "../types";

const SaleState = props => {

    // Creando un state inicial
    const initialState = {
        products: [],
        sale: {},
        payCounter: 0
    };

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(SaleReducer, initialState);

    const payCount = () => {
        console.log('Anadiendo 1 al payment', state.payCounter + 1);
        dispatch({
            type: UPDATE_PAYMENT,
            payload: state.payCounter + 1
        })
    }

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
    };

    const setSale = (sale) => {
        dispatch({
            type: SET_SALE,
            payload: sale
        })
    };

    const updateSale = (sale) => {
        dispatch({
            type: UPDATE_SALE,
            payload: sale
        })
    };

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
                sale: state.sale,
                payCounter: state.payCounter,
                addProduct,
                parseMoney,
                deleteProduct,
                editProduct,
                emptyCart,
                setSale,
                updateSale,
                payCount
            }}
        >
            {props.children}
        </SaleContext.Provider>
    );
};

export default SaleState;