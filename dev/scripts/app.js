import React from 'react';
import ReactDOM from 'react-dom';
import ReceiptTop from './ReceiptTop';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCFbDJI-CDdCb9Lid5qoWkYFMaE6azIW5A",
  authDomain: "bill-splitter-96860.firebaseapp.com",
  databaseURL: "https://bill-splitter-96860.firebaseio.com",
  projectId: "bill-splitter-96860",
  storageBucket: "",
  messagingSenderId: "1026786624538"
};

firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dollarAmount: 0,
      peopleAmount: 0,
      displayDollar: 0,
      displayPeople: 0,
      newTotal: 0,
      location: '',
      displayLocation: '',
      receipts: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)

  }

  componentDidMount() {
    const dbRef = firebase.database().ref('amountReference');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();

      const emptyObject = []

      for (let item in data) {

        data[item].key = item;
        emptyObject.push( data[item].key )
      }

      this.setState({
        receipts: emptyObject
      })
      
      // onsubmit, the values entered get stored into a tab (listitem)
      // the tab name will be the value entered as the restaurant name
      // when clicked on, the tab will fill in the inputs with the existing values that have been stored in firebase.
      // this will happen by using axios to call on the firebase api

    });
    
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // Creating a variable to store the data being pushed to firebase
    const storedVariable = {
      storedDollarAmount: this.state.dollarAmount,
      storedPeopleAmount: this.state.peopleAmount,
      storedLocation: this.state.location
    }

    
    // Create a reference to the firebase locaiton we would like our todos to live in
    const dbRef = firebase.database().ref('amountReference');

    // Push storedVariable into amountReference
    dbRef.push(storedVariable);

    const updatedTotal = this.state.dollarAmount / this.state.peopleAmount

    this.setState({ 
      displayDollar: this.state.dollarAmount,
      displayPeople: this.state.peopleAmount,
      newTotal: updatedTotal
      // displayLocation: location
    })

  }

  handleClick(e) {
    this.setState({
      displayDollar: 0,
      displayPeople: 0,
      newTotal: 0
    })
  }

  
  
  render() {

    return (
      <div>
        
        <ReceiptTop 
          dollar={this.state.displayDollar} 
          people={this.state.displayPeople}
          newTotal={this.state.newTotal}
          // key={this.state.storedVariable.key}
          // firebase
        />
    
        <div className="wrapper">
          
          <div className="wrapper-small">
            
            <form action="#" onSubmit={this.handleSubmit}>
              <label htmlFor="">What is the total of your bill?</label>
              <input 
              // adding the name in makes it dynamic in the handleChange function
              name="dollarAmount" 
              type="text" 
              placeholder="0"  
              onChange={this.handleChange}
              value={this.state.dollarAmount}
              />

              <label htmlFor="">How many people are splitting the bill?</label>
              <input 
              // adding the name in makes it dynamic in the handleChange function
              name="peopleAmount" 
              type="text" 
              onChange={this.handleChange} 
              value={this.state.peopleAmount}
              /> 
            
              <div className="submit-button">
                <input type="submit"/>
              </div>
            </form>
          </div> {/* Closing Wrapper Small */}

          <ul>
            
            <button onClick={this.handleClick}><li> { this.state.displayLocation } </li></button>
            
          </ul>
          
        </div> {/* Closing Wrapper */}


        

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
