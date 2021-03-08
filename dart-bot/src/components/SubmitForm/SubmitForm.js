import { React } from 'react';

import './SubmitForm.css';

function SubmitForm(props) {
    return (
        <form onSubmit={props.onSubmit} className="inputForm">
            <input
                className="input"
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder="Send Message..."
            />
            <button className="input-button" type="submit">Send</button>
        </form>
    );
}

export default SubmitForm;