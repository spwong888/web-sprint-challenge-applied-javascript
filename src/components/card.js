 // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

// TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

const Card = (article) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const headlineElement = document.createElement('div');
  headlineElement.classList.add('headline');
  headlineElement.textContent = article.headline;
  
  const authorElement = document.createElement('div');
  authorElement.classList.add('author');

  const imgContainerElement = document.createElement('div');
  imgContainerElement.classList.add('img-container');
  
  const authorImgElement = document.createElement('img');
  authorImgElement.src = article.authorPhoto;
  
  const authorNameElement = document.createElement('span');
  authorNameElement.textContent = `By ${article.authorName}`;

  cardElement.addEventListener('click', () => {
    console.log(article.headline);
  });

  imgContainerElement.appendChild(authorImgElement);
  authorElement.appendChild(imgContainerElement);
  authorElement.appendChild(authorNameElement);
  
  cardElement.appendChild(headlineElement);
  cardElement.appendChild(authorElement);
  
  return cardElement;
}
 
const cardAppender = async (selector) => {
  try {
    const response = await fetch('http://localhost:5001/api/articles');
    const data = await response.json();

    const articles = Object.values(data).flat();

    const targetElement = document.querySelector(selector);

    articles.forEach(article => {
      const card = Card(article);
      targetElement.appendChild(card);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const selector = '.cards-container';
  cardAppender(selector);
});

export { Card, cardAppender }
