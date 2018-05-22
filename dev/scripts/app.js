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
      displayDollar: '',
      displayPeople: '',
      newTotal: '',
      totalTipFifteen: '',
      totalTipTwenty: '',
      totalTipTwentyFive: '',
      location: '',
      displayLocation: '',
      todaysDate: fullDate,
      stringTotal: '',
      stringSplitBy: '',
      stringTotalPerPerson: '',
      stringNoTip: '',
      stringTipFifteen: '',
      stringTipTwenty: '',
      stringTipTwentyFive: '',
      stringReset: '',
      dollarSign: '',
      stringPeople: '',
      notes: 'yes yes yes',
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
  handleSubmit(e, storedNotes) {
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
      totalTipFifteen:  fifteenTaxRounded,
      totalTipTwenty: twentyTaxRounded,
      totalTipTwentyFive: twentyFiveTaxRounded,
      stringTotal: 'Your Total Is:',
      stringSplitBy: 'Split By:',
      stringTotalPerPerson: 'Total Per Person With:',
      stringNoTip: 'No Tip',
      stringTipFifteen: '15% Tip',
      stringTipTwenty: '20% Tip',
      stringTipTwentyFive: '25% Tip',
      stringReset: 'RESET',
      dollarSign: '$',
      stringPeople: 'people'
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
      totalTipTwentyFive: twentyFiveTaxRounded,
      stringTotal: 'Your Total Is:',
      stringSplitBy: 'Split By:',
      stringTotalPerPerson: 'Total Per Person With:',
      stringNoTip: 'No Tip',
      stringTipFifteen: '15% Tip',
      stringTipTwenty: '20% Tip',
      stringTipTwentyFive: '25% Tip',
      stringReset: 'RESET',
      dollarSign: '$',
      stringPeople: 'people'
    })
  }

  // A function that resets the entire form when the RESET button is clicked on
  reset() {
    this.setState({
      dollarAmount: 0,
      peopleAmount: 0,
      displayDollar: '',
      displayPeople: '',
      newTotal: '',
      totalTipFifteen: '',
      totalTipTwenty: '',
      totalTipTwentyFive: '',
      location: '',
      displayLocation: '',
      stringTotal: '',
      stringSplitBy: '',
      stringTotalPerPerson: '',
      stringNoTip: '',
      stringTipFifteen: '',
      stringTipTwenty: '',
      stringTipTwentyFive: '',
      stringReset: '',
      dollarSign: '',
      stringPeople: ''
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
            <ReceiptTop />
              
            <ReceiptInputs 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              dollarAmount={this.state.dollarAmount}
              peopleAmount={this.state.peopleAmount}
              stringReset={this.state.stringReset}
              reset={this.reset}
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
              stringTotal={this.state.stringTotal}
              stringSplitBy= {this.state.stringSplitBy}
              stringTotalPerPerson={this.state.stringTotalPerPerson}
              stringNoTip={this.state.stringNoTip}
              stringTipFifteen={this.state.stringTipFifteen}
              stringTipTwenty={this.state.stringTipTwenty}
              stringTipTwentyFive={this.state.stringTipTwentyFive}
              dollarSign={this.state.dollarSign}
              stringPeople={this.state.stringPeople}
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
        
        {/* Style Triangles At Bottom Of Receipt */}
        <div className="triangle-bottom">
              <div className="triangle triangle1"></div>
              <div className="triangle triangle2"></div>
              <div className="triangle triangle3"></div>
              <div className="triangle triangle4"></div>
              <div className="triangle triangle5"></div>
              <div className="triangle triangle6"></div>
              <div className="triangle triangle7"></div>
              <div className="triangle triangle8"></div>
              <div className="triangle triangle9"></div>
              <div className="triangle triangle10"></div>
              <div className="triangle triangle11"></div>
              <div className="triangle triangle12"></div>
              <div className="triangle triangle13"></div>
              <div className="triangle triangle14"></div>
              <div className="triangle triangle15"></div>
              <div className="triangle triangle16"></div>
              <div className="triangle triangle17"></div>
              <div className="triangle triangle18"></div>
              <div className="triangle triangle19"></div>
              <div className="triangle triangle20"></div>
              <div className="triangle triangle21"></div>
              <div className="triangle triangle22"></div>
              <div className="triangle triangle23"></div>
              <div className="triangle triangle24"></div>
              <div className="triangle triangle25"></div>
              <div className="triangle triangle26"></div>
              <div className="triangle triangle27"></div>
              <div className="triangle triangle28"></div>
              <div className="triangle triangle29"></div>
              <div className="triangle triangle30"></div>
              <div className="triangle triangle31"></div>
              <div className="triangle triangle32"></div>
              <div className="triangle triangle33"></div>
              <div className="triangle triangle34"></div>
              <div className="triangle triangle35"></div>
              <div className="triangle triangle36"></div>
              



        </div>  
        </div> {/* Closing Wrapper */}
        


        

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
