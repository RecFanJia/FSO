const initialFilterState = ''

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer
