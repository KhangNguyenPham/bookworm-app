
const totalCart = (state = 0, action) => {
    switch(action.type){
        case 'UPDATE_TOTAL_CART':
            return action.total;
        default:
            return state;
    }
}
export default totalCart;
