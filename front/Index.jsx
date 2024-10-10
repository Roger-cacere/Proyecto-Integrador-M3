
const initialState = 0;

const counter = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
    
        default:
            return state;
    }
}

console.log(counter(0, { type: 'INCREMENT'}))