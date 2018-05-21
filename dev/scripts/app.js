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

    const today = new Date(),
    fullDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
      todaysDate: fullDate,
      receipts: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.populate = this.populate.bind(this);
    this.remove = this.remove.bind(this);
    this.reset = this.reset.bind(this);

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
  
  // A function that:
    // Calculates and displays the bill split with tip amounts of 15%, 20%, and 25%
    // Stores the values in firebase so that the amounts can be restored when the populate() function is called
  handleSubmit(e) {
    e.preventDefault();
    // Variable that divides the dollar amount by people amount and rounds to 2 decimal places
    const updatedTotal = Math.round((this.state.dollarAmount / this.state.peopleAmount) * 100) / 100 
    
    // Variables that calculate 15% tax and round to 2 decimal places
    const fifteenTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.15) + (this.state.dollarAmount / this.state.peopleAmount)
    const fifteenTaxRounded = Math.round(fifteenTax * 100) / 100

    // Variables that calculate 20% tax and round to 2 decimal places
    const twentyTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.20) + (this.state.dollarAmount / this.state.peopleAmount)
    const twentyTaxRounded = Math.round(twentyTax * 100) / 100

    // Variables that calculate 25% tax and round to 2 decimal places
    const twentyFiveTax = ((this.state.dollarAmount / this.state.peopleAmount) * 0.25) + (this.state.dollarAmount / this.state.peopleAmount)
    const twentyFiveTaxRounded = Math.round(twentyFiveTax * 100) / 100
    
    // Creating a variable to store the data being pushed to firebase
    const storedVariable = {
      storedDollarAmount: this.state.dollarAmount,
      storedPeopleAmount: this.state.peopleAmount,
      storedTotalAmount: updatedTotal,
      storedLocation: this.state.location,
      todaysDate: this.state.todaysDate
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
      totalTipFifteen: fifteenTaxRounded,
      totalTipTwenty: twentyTaxRounded,
      totalTipTwentyFive: twentyFiveTaxRounded
    })

  }

  // A function that will repopulate the required areas when the review button is clicked on
  populate(location, dollar, people) {
    
    // Variable that divides the dollar amount by people amount and rounds to 2 decimal places
    const updatedTotal = Math.round((dollar / people) * 100) / 100

    // Variables that calculate 15% tax and round to 2 decimal places
    const fifteenTax = ((dollar / people) * 0.15) + (dollar / people)
    const fifteenTaxRounded = Math.round(fifteenTax * 100) / 100

    // Variables that calculate 15% tax and round to 2 decimal places
    const twentyTax = ((dollar / people) * 0.20) + (dollar / people)
    const twentyTaxRounded = Math.round(twentyTax * 100) / 100

    // Variables that calculate 15% tax and round to 2 decimal places
    const twentyFiveTax = ((dollar / people) * 0.25) + (dollar / people)
    const twentyFiveTaxRounded = Math.round(twentyFiveTax * 100) / 100

    this.setState({
      displayDollar: dollar,
      displayPeople: people,
      newTotal: updatedTotal,
      displayLocation: location,
      totalTipFifteen: fifteenTaxRounded,
      totalTipTwenty: twentyTaxRounded,
      totalTipTwentyFive: twentyFiveTaxRounded
    })
  }

  // A function that resets the entire form when the RESET button is clicked on
  reset() {
    this.setState({
      dollarAmount: 0,
      peopleAmount: 0,
      displayDollar: 0,
      displayPeople: 0,
      newTotal: 0,
      totalTipFifteen: 0,
      totalTipTwenty: 0,
      totalTipTwentyFive: 0,
      location: '',
      displayLocation: ''
    })
  }

  // A function that removes each list item when the Delete button is clicked on
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
              location={this.state.displayLocation}
              reset={this.reset}
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
                    todaysDate={receipts.todaysDate}
                    
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
