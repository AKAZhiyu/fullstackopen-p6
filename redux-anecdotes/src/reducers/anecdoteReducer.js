import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteAnecdoteHelper(state, action) {
    //   const id = action.payload
    //   const anecdoteToVote = state.find(a => a.id === id)
    //   const votedAnecdote = {
    //     ...anecdoteToVote,
    //     votes: anecdoteToVote.votes + 1
    //   }
    //   return state.map(a => a.id === id ? votedAnecdote : a)
    // },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    } 
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const newAnecdote = await anecdoteService.updateVote(id)
    const votedAnecdotes = anecdotes.map(a => a.id === id ? newAnecdote : a)
    dispatch(setAnecdotes(votedAnecdotes))
  }
}

export default anecdoteSlice.reducer
export const { setAnecdotes, appendAnecdotes } = anecdoteSlice.actions