import { useSelector, useDispatch } from "react-redux"
import { refreshFilter } from "../reducers/filterReducer"

const Filter = () => {
  const filterValue = useSelector(state => state.Filter)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault()
    dispatch(refreshFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterValue} />
    </div>
  )
}


export default Filter