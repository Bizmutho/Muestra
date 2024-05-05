const initialState = {
    hashMap: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER_COLOR':
            const color = '#' + Math.floor(Math.random()*16777215).toString(16);
            return {
                ...state,
                hashMap: {
                  ...state.hashMap,
                  [action.key]: { color },
                },
              };
        default:
        
        return state;
    }
};

export default reducer;