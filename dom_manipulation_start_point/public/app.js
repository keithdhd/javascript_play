window.onload = function(){

  var qotd = document.querySelector('#quote-of-the-day');
  console.log(qotd);
  // qotd.style.visibility = 'hidden';
  qotd.style.display = 'none';

  var buttons = document.getElementsByTagName('button');
  console.log(buttons[0]);

  var quotes = document.getElementsByClassName('quote');
  console.log(quotes[quotes.length-1].children[0].innerText);

  var articles = document.getElementsByTagName('article');
  for (var i = 0; i < articles.length; i++) {
    articles[i].style.backgroundColor = 'wheat';
  };

  var quoteArticle = document.createElement('article');

  quoteArticle.classList.add('quote')

  var blockquote = document.createElement('blockquote');

  blockquote.innerText = "New Quote. ";

  var cite = document.createElement('cite');

  cite.innerText = "Some Person";

  //add together
  blockquote.appendChild(cite);

  quoteArticle.appendChild(blockquote);

  //attach to DOM
  var quotes = document.querySelector('#quotes');

  quotes.appendChild(quoteArticle);

  for (var i = 0; i < articles.length; i++) {
    if(i % 2 === 0){
      articles[i].style.backgroundColor = 'wheat';
      articles[i].style.color = 'tomato';
      continue;
    }
    articles[i].style.backgroundColor = 'tomato';
    articles[i].style.color = 'wheat';
  }
  
}

