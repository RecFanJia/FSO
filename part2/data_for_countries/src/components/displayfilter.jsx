const DisplayFilter = (props) =>{
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
      }
    const itemStyle = {
      display: 'flex', 
      alignItems: 'center'  
      };


    return(
      
      <div> {props.filteredCountries.length ==1 ? 
        props.showcountryinfo(props.filteredCountries[0].cca3) 
        : 
        <ul style={listStyle}> 
          {props.filteredCountries
          .map(country => (
            <li key={country.cca3} style={itemStyle}>
              {country.name.common}
              <form style={{ marginLeft: '10px' }}>
                <button 
                type="button" 
                onClick={() => props.handleFilterChange({
                     target: {
                       value: country.name.common } })
                }//when click, input country name in filter
                > 
                show
                </button>
              </form>
            </li>
          ))}
      </ul>
     }
      
    
    </div>
    )
  }

  export default DisplayFilter 