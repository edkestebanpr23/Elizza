import { SESSION, SET_USER, GET_USER, ILANG, ADD_PRODUCT } from "../types";

export default (state, action) => {
    switch (action.type) {
        case SESSION:
            return {
                ...state,
                session: action.payload
            };
        case ILANG:
            return {
                ...state,
                iLang: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}