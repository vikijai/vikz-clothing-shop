const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log(state)
      return [...state, action.payload];

    default:
      return state;
  }
};

export default cartReducer;
