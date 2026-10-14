import { createStore } from "redux";
import loremReducer from "./reducer";

const store = createStore(loremReducer);

export default store;