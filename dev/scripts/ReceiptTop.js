import React from 'react';

const ReceiptTop = (props) => {
    return (
        <div className="wrapper">

            <header>

                <h1>THE BILL</h1>
                <div className="restaurant">
                    <form action="#">
                        <label htmlFor="">Where are you?</label>
                        <input 
                        // name="location"
                        // type="text"
                        // onChange={this.handleChange}
                        // value={this.state.location}

                        />
                    </form>
                </div>
                <p>1000 Queen St W.</p>
                <p>(416)666-6666</p>
            </header>

            {/* Bill-Info Section */}
            <section className="bill-info">

                {/* Title */}
                <div className="bill-info-title">
                    <div className="info-style-left"></div>
                    <p className="info">info</p>
                    <div className="info-style-right"></div>
                </div>

                <div className="bill-info-top clearfix">
                    <p className="split">This is the total amount</p>

                    <p className="numbers">{props.dollar}</p>
                </div>
                
                <div className="bill-info-middle clearfix">
                    {/* <p className="date">Date: </p> */}
                    <p className="split">Split this many ways:</p>
                    
                    <p className="numbers">{props.people}</p>
                </div>

                <div className="bill-info-bottom clearfix">
                    <p className="split">You're new amount is:</p>

                    <p className="numbers">{props.newTotal}</p>

                </div>
                
                    
                    
            </section> {/* Closing Bill Info Top */}

            
        {/* Closing Wrapper */}
        </div>
    )
};

export default ReceiptTop;
