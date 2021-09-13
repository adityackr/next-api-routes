import { useRef, useState } from 'react';

const HomePage = () => {
    const [feedbackItems, setFeedbackItems] = useState([]);

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;

        const reqBody = { email: enteredEmail, text: enteredFeedback };

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    const loadedFeedbackHandler = () => {
        fetch('/api/feedback')
            .then((response) => response.json())
            .then((data) => setFeedbackItems(data.feedback));
    };

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Your Email Address</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor="feedback">Your Feedback</label>
                    <textarea
                        id="feedback"
                        rows="5"
                        ref={feedbackInputRef}
                    ></textarea>
                </div>
                <button>Send Feedback</button>
            </form>
            <hr />
            <button onClick={loadedFeedbackHandler}>Load Feedback</button>
            <ul>
                {feedbackItems.map((feedbackItem) => (
                    <li key={feedbackItem.id}>{feedbackItem.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
