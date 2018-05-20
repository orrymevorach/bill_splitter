import React from 'react';

const OldReceipts = (props) => {
    return (
        <section className="oldReceipts">
            
            <li className="clearfix"> {props.storedLocation} 
                <button onClick={() => props.remove(props.firebasekey)} >Delete</button> 
                <button onClick={() => props.populate(props.storedLocation, props.dollarAmount, props.peopleAmount)}>rePop</button>
            </li>
            
        </section>
    )
}

export default OldReceipts;