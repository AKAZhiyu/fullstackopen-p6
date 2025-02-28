import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const setTimeoutNotification = (content, timeout) => {
    return async (dispatch) => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions