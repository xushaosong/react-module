

const initialState = {
  data: null
}

export default function Information(state = initialState, action) {
  switch (action.type) {
    case 'success':
      return Object.assign({}, state, { data: action.data });
    case 'fail':
      return Object.assign({}, state, { data: action.data })
  }
  return state;
}