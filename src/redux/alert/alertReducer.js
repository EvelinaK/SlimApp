import { createReducer } from "@reduxjs/toolkit";

const alertReducer = createReducer(null, {
  'alert.off': (state)=>({
    ...state,
    error: null
  }),
  'alert.on': (state, {payload})=>({
    ...state,
    error: payload.error
  })
})

export default alertReducer;