import './App.css';
import { useEffect, useState } from 'react';
import Weather from './Component/Weather';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  // const [name, setName] =useState()

  useEffect(() =>{
    const fetchData = async () =>{
      navigator.geolocation.getCurrentPosition(function(position){
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("latitude - "+lat);  //Latitude - 21.9318252
      console.log("longitude - "+long);  //Longitude - 86.7315687
      

      
      // const url = 'https://api.openweathermap.org/data/2.5'
      // const key = '4e373f47e8cde896c1d7d6a65d208cf1'

      // await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=4e373f47e8cde896c1d7d6a65d208cf1`)
      // await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=21.9318252&lon=86.7315687&units=metric&APPID=4e373f47e8cde896c1d7d6a65d208cf1`)
      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=4e373f47e8cde896c1d7d6a65d208cf1`)
      // await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        console.log("result - "+result);
      });
    }
    fetchData();
  },[lat, long]);


//   const LocalName = async(e)=>{
// setName(e.target.value);
// await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=4e373f47e8cde896c1d7d6a65d208cf1`)
//   }

//   const submit  =async()=>{
//     await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=4e373f47e8cde896c1d7d6a65d208cf1`)
//     console.log("data");
//   }




  return (
    <div className="App">
      <p>{`Latitude - ${lat}`}</p>
      <p>{`Longitude - ${long}`}</p>
{/* <div><input type="text" name='local' value={name} onChange={LocalName} />
<button  onSubmit={submit} >Submit</button></div> */}
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}
    </div>
  );
}

export default App;
