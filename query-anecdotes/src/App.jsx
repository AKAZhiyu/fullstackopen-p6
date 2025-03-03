import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
// import { getAll, createNew, updateVote } from './services/anecdotes'
import anecdoteService from './services/anecdotes'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  const voteMutation = useMutation({ 
    mutationFn: anecdoteService.updateVote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === votedAnecdote.id ? votedAnecdote : a))
      notificationDispatch({
        type: 'SET',
        payload: `anecdote "${votedAnecdote.content} voted`
      })
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  })

  // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdotes service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
