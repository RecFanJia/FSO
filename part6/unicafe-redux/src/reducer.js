const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const createActionsMap = (state) => {
  const map = new Map()
  Object.keys(state).forEach(key => {
    map.set(key.toUpperCase(), (state) => ({ ...state, [key]: state[key] + 1 }))
  })
  map.set('ZERO', () => initialState)
  return map
}

const actionsMap = createActionsMap(initialState)

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const handler = actionsMap.get(action.type)
  return handler ? handler(state) : state
}

export default counterReducer
