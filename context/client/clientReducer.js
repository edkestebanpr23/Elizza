import { SET_CLIENTS } from "../types";

export default (state, action) => {
    switch (action.type) {
        case SET_CLIENTS:
            return {
                ...state,
                clients: action.payload
            };
        // case DELETE_PRODUCT:
        //     return {
        //         ...state,
        //         products: state.products.filter(product => product.product !== action.payload.product)
        //     };
        // case UPDATE_PRODUCT:
        //     return {
        //         ...state,
        //         products: action.payload
        //     };
        // case SET_SALE:
        //     return {
        //         ...state,
        //         sale: action.payload
        //     };
        // case UPDATE_SALE:
        //     return {
        //         ...state,
        //         sale: { ...state.sale, ...action.payload}
        //     };
        default:
            return state;
    }
}