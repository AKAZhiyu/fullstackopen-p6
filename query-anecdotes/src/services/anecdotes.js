import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVote = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`)
        const currentAnecdote = response.data

        const updatedAnecdote = { ...currentAnecdote, votes: currentAnecdote.votes + 1 }

        const updateResponse = await axios.patch(`${baseUrl}/${id}`, { votes: updatedAnecdote.votes })
        return updateResponse.data
    } catch (error) {
        console.error('Error updating vote:', error)
        throw error
    }
}

export default { getAll, createNew, updateVote }