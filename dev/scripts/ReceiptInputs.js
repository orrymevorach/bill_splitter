import React from 'react';

const ReceiptInputs = (props) => {
    return (
        <section className="receiptInputs">
            <form action="#" onSubmit={(e) => props.handleSubmit(e)}>
                <div className="restaurant">
                    <label htmlFor="">What Is The Name Of The Restaurant?</label>
                    <input
                        name="location"
                        type="text"
                        value={props.location}
                        onChange={(e) => props.handleChange(e)}
                    />
                </div>
            
                <div className="totalAmount">
                    <label htmlFor="">What is the total of your bill?</label>
                    <input
                        // adding the name in makes it dynamic in the handleChange function
                        name="dollarAmount"
                        type="text"
                        placeholder="0"
                        onChange={(e) => props.handleChange(e)}
                        value={props.dollarAmount}
                    />
                </div>

                <div className="totalPeople">
                    <label htmlFor="">How many people are splitting the bill?</label>
                    <input
                        // adding the name in makes it dynamic in the handleChange function
                        name="peopleAmount"
                        type="text"
                        onChange={(e) => props.handleChange(e)}
                        value={props.peopleAmount}
                    />
                </div>

                <div className="submit-button">
                    <input type="submit" />
                </div>
            </form>
        </section>
    )
}

export default ReceiptInputs;