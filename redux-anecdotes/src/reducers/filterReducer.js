const reducer = (state = '', action) => {
    switch (action.type) {
        case 'REFRESH': {
          const newContent = action.payload.newContent
          return newContent
        }
        default:
          return state
      }
}

export const refreshFilter = (newContent) => {
  return {
    type: 'REFRESH',
    payload: {
      newContent
    }
  }
}

export default reducer