import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote, initialAnecdotes } from "../reducers/anecdoteReducer"
import { setTimeoutNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialAnecdotes())
    }, [dispatch])


    const vote = async (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setTimeoutNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`, 2000))
    }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AnecdoteList