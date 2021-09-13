import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    return (
        <ul>
            {props.feedbackItems.map((feedbackItem) => (
                <li key={feedbackItem.id}>{feedbackItem.text}</li>
            ))}
        </ul>
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
