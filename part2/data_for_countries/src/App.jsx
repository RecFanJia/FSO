import { useState, useEffect  } from 'react'
import Filter from './components/filter'
import countryService from './services/countries'
import DisplayFilter from './components/displayfilter'
import WeatherInfo from './services/weather'


function App() {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => {
      console.log('render', countries.length, 'countries',)
      console.log('response data',response.data)
        setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    console.log('FilterText:',event.target.value)
    setFilteredCountries(countries.filter(country => 
      country.name.common
      .toLowerCase()
      .includes(event.target.value.toLowerCase())))
    }

      useEffect(() => {
        console.log('FilteredCountries:', filteredCountries);
      }, [filteredCountries]) //useEffect to log avoiding asynchronous
  
  const showcountryinfo = (cca3) => {
    console.log("cca3",cca3)
    const country= filteredCountries.find(country=> country.cca3 === cca3)
    const languages = Object.values(country.languages)
     
    return(    
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br/>
      area {country.area} km<sup>2</sup> <br/>
       <img src={country.flags.png} />
       <h3>languages</h3>
       {languages.map(language => (
            <div key={language} style={{marginLeft: '10px'}}>• {language}</div>
        ))}
      <h2>weather in {country.name.common}</h2>
      <WeatherInfo
      country = {country}
      />
    </div>)
}

  return (
    
      <div>
       <Filter 
      filterText={filterText} 
      handleFilterChange={handleFilterChange}/>

      {filterText==""?"":
      (filteredCountries.length <= 10 ?    
      <DisplayFilter
      countries = {countries}
      showcountryinfo={showcountryinfo}
      filteredCountries={filteredCountries}
      setFilterText={setFilterText}
      handleFilterChange={handleFilterChange}
      />
      :
      "Too many matches, specify another filter")
      }
      </div>
     
  )
}

export default App
