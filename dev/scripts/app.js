import React from 'react';
import ReactDOM from 'react-dom';
import ReceiptTop from './ReceiptTop';
import ReceiptInfo from './ReceiptInfo';
import ReceiptInputs from './ReceiptInputs'
import OldReceipts from './OldReceipts';

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
      totalTipFifteen: 0,
      totalTipTwenty: 0,
      totalTipTwentyFive: 0,
      location: '',
      displayLocation: '',
      receipts: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.populate = this.populate.bind(this)
    this.remove = this.remove.bind(this)

  }

  componentDidMount() {
    const dbRef = firebase.database().ref('amountReference');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      
      const receiptsArray = [];
      
      
      for (let item in data) {
        data[item].key = item;
        receiptsArray.push( data[item] )
      }

      this.setState({
        receipts: receiptsArray
      })
      
    });
    
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const updatedTotal = this.state.dollarAmount / this.state.peopleAmount
    
    const fifteenTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.15) + (this.state.dollarAmount / this.state.peopleAmount)

    const twentyTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.20) + (this.state.dollarAmount / this.state.peopleAmount)

    const twentyFiveTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.25) + (this.state.dollarAmount / this.state.peopleAmount)
    
    // Creating a variable to store the data being pushed to firebase
    const storedVariable = {
      storedDollarAmount: this.state.dollarAmount,
      storedPeopleAmount: this.state.peopleAmount,
      storedTotalAmount: updatedTotal,
      storedLocation: this.state.location,
      selected: false
    }

    // Create a reference to the firebase locaiton we would like our todos to live in
    const dbRef = firebase.database().ref('amountReference');

    // Push storedVariable into amountReference
    dbRef.push(storedVariable);

    this.setState({ 
      displayDollar: this.state.dollarAmount,
      displayPeople: this.state.peopleAmount,
      newTotal: updatedTotal,
      displayLocation: this.state.location,
      totalTipFifteen: fifteenTax,
      totalTipTwenty: twentyTax,
      totalTipTwentyFive: twentyFiveTax
    })

  }

  populate(location, dollar, people) {
    const updatedTotal = dollar / people;

    const fifteenTax = ((dollar / people) * 0.15) + (dollar / people)

    const twentyTax = ((dollar / people) * 0.20) + (dollar / people)

    const twentyFiveTax = ((dollar / people) * 0.25) + (dollar / people)

    this.setState({
      displayDollar: dollar,
      displayPeople: people,
      newTotal: updatedTotal,
      displayLocation: location,
      totalTipFifteen: fifteenTax,
      totalTipTwenty: twentyTax,
      totalTipTwentyFive: twentyFiveTax
    })
  }

  remove(keyToRemove) {
    firebase.database().ref(`amountReference/${keyToRemove}`).remove();
  }
  
  render() {
      
    return (
      <div>
        <div className="wrapper">
            <ReceiptTop
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              />

            <ReceiptInputs 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              dollarAmount={this.state.dollarAmount}
              peopleAmount={this.state.peopleAmount}
              location={this.location}
            />

            <ReceiptInfo 
              receipts={this.state.receipts}
              dollar={this.state.displayDollar}
              people={this.state.displayPeople}
              newTotal={this.state.newTotal}
              tipFifteen={this.state.totalTipFifteen}
              tipTwenty={this.state.totalTipTwenty}
              tipTwentyFive={this.state.totalTipTwentyFive}
            />

            <ul>
              {this.state.receipts.map((receipts) => {
                return (
                  <OldReceipts 
                    key={receipts.key}
                    firebasekey={receipts.key}
                    populate={this.populate}
                    storedLocation={receipts.storedLocation}
                    dollarAmount={receipts.storedDollarAmount}
                    peopleAmount={receipts.storedPeopleAmount}
                    remove={this.remove}
                  />
                )
              })}
            </ul>
            

          
          
        </div> {/* Closing Wrapper */}


        

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
