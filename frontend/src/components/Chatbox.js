import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig'; // Use updated Axios config
import './Chatbox.css';

const Chatbox = () => {
    const [questions, setQuestions] = useState([]);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const result = await axiosInstance.get('/chats');
                setQuestions(result.data);
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleQuestionClick = (question) => {
        setResponse(question.response);
    };

    return (
        <div className="chatbox">
            <h3>Chat with Us</h3>
            <div className="chatbox-questions">
                {questions.map((question) => (
                    <button key={question._id} onClick={() => handleQuestionClick(question)}>
                        {question.question}
                    </button>
                ))}
            </div>
            {response && <div className="chatbox-response">{response}</div>}
        </div>
    );
};

export default Chatbox;
