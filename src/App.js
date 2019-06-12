
// @ts-check

import React from 'react';
import './App.css';
// @ts-ignore
import snare from './snare-sample.wav';
// @ts-ignore
import bass from './kick-sample.wav';
// @ts-ignore
import cymbal from './crash-sample.wav';
// @ts-ignore
import tom1 from './hi-tom-sample.wav';
// @ts-ignore
import tom2 from './mid-tom-sample.wav';
// @ts-ignore
import tom3 from './low-tom-sample.wav';
// @ts-ignore
import closed from './hh-sample.wav';
// @ts-ignore
import clap from './china-sample.wav';
// @ts-ignore
import ride from './ride-sample.wav';


// Object that defines each button's information

const data = [
  { id: 'Snare', button: 'Shift',code: 16, src: snare },
  { id: 'Bass Drum', button: 'Space',code: 32,   src: bass },
  { id: 'High hat', button: 'Enter',code: 13, src: closed },
  { id: 'Tom Hi', button: 'A',code: 65, src: tom1 },
  { id: 'Tom Mid', button: 'S',code: 83, src: tom2 },
  { id: 'Tom Low', button: 'D',code: 68, src: tom3 },
  { id: 'Crash', button: 'Q',code: 81, src: cymbal },
  { id: 'China', button: 'W',code: 87, src: clap },
  { id: 'Ride', button: '\\',code: 220, src: ride },
]

// Create the drum machine component

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: 'Hit Me !'
    }
  }
  
  // Display Handler
  
  handleDisplay = display => this.setState( {display} )
  
  render() {
    return <div>
      <div id = 'drum-machine'>
      <h1 id = 'title'>React Drum Machine</h1>
      <div id = 'display'>{this.state.display}</div>
      <div id ='drum-pads'>
      {data.map(d => (
        <DrumPad 
          id = {d.id}
          code = {d.code}
          src = {d.src}
          button = {d.button}
          handleDisplay = {this.handleDisplay}
        />
      ))}
      </div> 
        <p id = 'attribution'>By Adam Wright</p>
      </div>
      <button id = 'back-button' onClick={() => window.history.back()}>Back</button>
    </div>
  }
}

// Create the button component

class DrumPad extends React.Component {
  // Functions to connect keyboard to buttons

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    window.focus();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  // Create overlapping samples

  Channel = audio_uri => {
    this.sample = new Audio(audio_uri);
    this.sample.play();
  };

  Switcher = (audio_uri, num) => {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (let i = 0; i < num; i++) {
      this.channels.push(new this.Channel(audio_uri));
    }

    this.Switcher.prototype.play = function() {
      this.channels[this.index++].play();
      this.index = this.index < this.num ? this.index : 0;
    };
  };

  // Play sound on keyboard button press

  handleKeyDown = e => {
    if (e.keyCode === this.props.code) {
      this.Switcher(this.props.src, 1);
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id);
    }
  };

  // Play sound on mouse click

  handleClick = () => {
    this.Switcher(this.props.src, 1);
    this.audio.currentTime = 0;
    this.props.handleDisplay(this.props.id);
  };

  render() {
    return (
      <div className="drum-pad" id={this.props.id} onClick={this.handleClick}>
        <h3 id="button-letter">{this.props.button}</h3>
        <audio
          ref={ref => (this.audio = ref)}
          className="clip"
          src={this.props.src}
          id={this.props.button}
        />
      </div>
    );
  }
}

export default App;