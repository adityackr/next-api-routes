import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/${id}`)
            .then((response) => response.json())
            .then((data) => setFeedbackData(data.feedback));
    };

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((feedbackItem) => (
                    <li key={feedbackItem.id}>
                        {feedbackItem.text}{' '}
                        <button
                            onClick={loadFeedbackHandler.bind(
                                null,
                                feedbackItem.id
                            )}
                        >
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    return {
        props: {
            feedbackItems: data,
        },
    };
};

export default FeedbackPage;
