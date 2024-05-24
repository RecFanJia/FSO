import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => ''
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 5000)
  }
}

export default notificationSlice.reducer