import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import Middelware from "redux-thunk"
import Reducers from "../Reducers"

const initialState = {}

const store = createStore(
    Reducers,
    initialState,
    composeWithDevTools(applyMiddleware(Middelware))
)

export default store ; 