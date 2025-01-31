const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden =false;
    quoteContainer.hidden =true;
}
//hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden =true;
}

// show New quotes
function newQuote (){
    loading();
    // pick a random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    authorText.textContent = quote.a;
    
    // Check Quote Lenght to determine styling
    if (quote.q.length >150) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    console.log("Clicked")
    // Set Quote, Hide Loader
    quoteText.textContent = quote.q;
    complete();
}
// get quote from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://zenquotes.io/api/quotes'
    try {
        const response = await fetch (apiUrl);
        apiQuotes = await response.json()
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

// Tweet Qoute
function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}${"    Come From Mayank"}`;
    window.open(tweetUrl, '_blank');
}
// Event Listenrs
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();