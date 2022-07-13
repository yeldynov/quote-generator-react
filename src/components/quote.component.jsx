import React, { useState, useEffect } from 'react';

import './quote.styles.css';

const QuoteComponent = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setShowLoader(true);
      try {
        const response = await fetch('https://type.fit/api/quotes');
        const result = await response.json();
        await setQuotes(result);
        setCurrentQuote(result[Math.floor(Math.random() * result.length)]);
        setShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuotes();
  }, []);

  const newQuoteHandler = () => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${currentQuote.text} - ${currentQuote.author}`;

    window.open(twitterUrl, '_blank');
  };

  return (
    <>
      {!showLoader && (
        <div className='quote-container'>
          <div className='quote-text'>
            <i className='fas fa-quote-left'></i>
            <span>{currentQuote && currentQuote.text}</span>
          </div>
          <div className='quote-author'>
            <span>{currentQuote && currentQuote.author}</span>
          </div>
          <div className='button-container'>
            <button className='twitter-button' onClick={tweetQuote}>
              <i className='fab fa-twitter'></i>
            </button>
            <button onClick={newQuoteHandler}>New Quote</button>
          </div>
        </div>
      )}
      {showLoader && <div className='loader'></div>}
    </>
  );
};

export default QuoteComponent;
