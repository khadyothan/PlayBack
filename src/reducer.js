export const initialState = {
  favouirites: [],
  user: null
};

// Selector
export const getfavouiritesTotal = (favouirites) =>
  favouirites?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_favouirites":
      return {
        ...state,
        favouirites: [...state.favouirites, action.item],
      };

    case 'EMPTY_favouirites':
      return {
        ...state,
        favouirites: []
      }

    case "REMOVE_FROM_favouirites":
      const index = state.favouirites.findIndex(
        (favouiritesItem) => favouiritesItem.id === action.id
      );
      let newfavouirites = [...state.favouirites];

      if (index >= 0) {
        newfavouirites.splice(index, 1);

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in favouirites!`
        )
      }

      return {
        ...state,
        favouirites: newfavouirites
      }

    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;