import './App.css';
import { React, useState } from 'react';
// import axios from 'axios';
import ChatList from './components/ChatWindow/ChatWindow';
import SubmitForm from './components/SubmitForm/SubmitForm';

function App() {
  const openingMessage = [
    { message: "Hi there, how can I help", poster: "bot" },
  ];

  const allStationsCall = () => {
    // const url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML'
    // const headers = {
    //   "Access-Control-Allow-Origin": "*"
    // };

    // axios.get(url, {headers})
    //   .then(response => console.log(response))

    // Blocked by CORS so I've set up a dummy array. Levaing it in fucntion to demonstate how I wanted it to work.

    const stations = [
      { "station": "malahide" },
      { "station": "portmarnock" },
      { "station": "clongriffin" },
      { "station": "sutton" },
      { "station": "bayside" },
    ]

    return stations;
  }

  const stationTimeCall = () => {
    // again a dummy array, would pass in stationCode to call API for that station
    const nextTrains = [
      {"objStationData": {
        "Traincode": "E826",
        "destination": "Malahide",
        "Exparrival": "20:06" 
        }
      },
      {
        "objStationData": {
          "Traincode": "D823",
          "destination": "Malahide",
          "Exparrival": "20:15"
        }
      },
      {
        "objStationData": {
          "Traincode": "E828",
          "destination": "Malahide",
          "Exparrival": "21:06"
        }
      }
    ]

    // This is assuming the API returns in order as it does on Irish rail.
    const next2Trains = nextTrains.slice(0, 2)
    // Returs time of next 2 trains, could be modified to return destination etc also
    return next2Trains.map(train => train.objStationData.Exparrival).toString()
  }

  // Make "call" to API to have list of stations available for use 
  const stationList = allStationsCall();

  //Set state for messages (display) and input (form submission)
  const [messages, setMessages] = useState(openingMessage);
  const [inputValue, setInputValue] = useState("");

  const _handleSubmit = e => {
    e.preventDefault();
    if (inputValue === "") return alert("Message is required");
    // Add user message to message state
    const newArr = messages.slice();
    newArr.splice(0, 0, { message: inputValue, poster: "user" });
    setMessages(newArr);

    // Get ready for check of user input
    const inputArray = inputValue.split(" ").map(i => i.toLowerCase())
    const stationArray = stationList.map(station => station.station).toString()
    const searchString = inputValue.toLowerCase()

    // Check for keyword stations, if present return list of stations from "API"
    if (searchString.includes("stations")) {
      newArr.splice(0, 0, { message: `I think you're looking for a list of stations! Here you go: ${stationArray.toString()}`, poster: "bot" });
      setMessages(newArr);
      //Check array of stations against array of user input. If a station we have in our array is detected, I would make an API call using function with this stations code/name to return times. (This is why stations function is always called first, to have this prepped)
    } else if (inputArray.some(res => stationArray.indexOf(res) >= 0)) {
      newArr.splice(0, 0, { message: `The next two trains at ${searchString} are at ${stationTimeCall()}`, poster: "bot" });
      setMessages(newArr);
    } else {
      newArr.splice(0, 0, { message: `"Sorry, I don't know how to answer that"`, poster: "bot" });
      setMessages(newArr);
    }
    setInputValue("");
  };


  return (
    <div className="App">
      <h1>DART Bot</h1>
      <p>I can help with checking what stations are on the Dart line, and also the next trains at a station you mention. <br/> 
        Try asking me for a list of all stations.
      </p>
      <div className="chatArea">
        <ul className="reverseList">
          {messages.reverse().map((message, index) => (
            <ChatList
              key={index}
              message={message}
            />
          ))}
        </ul>
      </div>
      <SubmitForm
        onSubmit={_handleSubmit}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  );
}

export default App;
