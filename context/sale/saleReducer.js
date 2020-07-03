import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.product !== action.payload.product)
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}