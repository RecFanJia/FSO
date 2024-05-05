const Filter = (props) =>{
    return(
        <form>
        <div>
          find countries <input 
          value = {props.filterText}
          onChange = {props.handleFilterChange}
          />
        </div>
      </form>
    )
  }

  export default Filter