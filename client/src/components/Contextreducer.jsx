import { createContext, useReducer, useContext } from "react";

// Create Contexts for State and Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,   
        {
          id: action.id,
          img:action.img,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

      case "DROP":
        let empArray=[]
        return empArray
    default:
        console.log("Unknown action:", action.type);
      return state;
  }
};

// Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom Hooks
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
