import React from 'react';

const ReceiptInputs = (props) => {
    return (
        <section className="receiptInputs">
            {/* Form containing inputs and submit button */}
            <form action="#" onSubmit={(e) => props.handleSubmit(e)}>
                {/* Restaurant Input */}
                <div className="restaurant">
                    <label htmlFor="">What Is The Name Of The Restaurant?</label>
                    <input
                        name="location"
                        type="text"
                        value={props.location}
                        onChange={(e) => props.handleChange(e)}
                        placeholder="example: McDonalds"
                    />
                </div>
                
                {/* Bill Total Input */}
                <div className="totalAmount">
                    <label htmlFor="">What Is The Total Of Your Bill?</label>
                    <input
                        // adding the name in makes it dynamic in the handleChange function
                        name="dollarAmount"
                        type="text"
                        onChange={(e) => props.handleChange(e)}
                        value={props.dollarAmount}
                    />
                </div>

                {/* People Total Input */}
                <div className="totalPeople">
                    <label htmlFor="">How Many People Are Splitting The Bill?</label>
                    <input
                        // adding the name in makes it dynamic in the handleChange function
                        name="peopleAmount"
                        type="text"
                        onChange={(e) => props.handleChange(e)}
                        value={props.peopleAmount}
                    />
                </div>

                {/* Submit Button */}
                <div className="submit-button">
                    <input type="submit" value="Calculate!" />
                </div>
            </form>
            
            {/* Reset Button */}
            <button className="reset-button" onClick={props.reset}>{props.stringReset}</button>
            
        </section>
    )
}

export default ReceiptInputs;