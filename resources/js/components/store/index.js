import { createStore } from "redux";
import cart from "../reducers/index";

const store = createStore(cart);
export default store;  