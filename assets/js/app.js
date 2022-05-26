// api key for news api
newsAPI = 'e7afc78ed42e4ad9b63d51a91648b520';

// initialing ajax xmlhttprequest
const xhr = new XMLHttpRequest();

// opening the request with the api and method
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${newsAPI}`, true);

// element where all cards are present
const allNews = document.getElementById('allNews');
const alertCont = document.getElementById('outer-cont');

// function to populate DOM
xhr.onload = function () {
    if (this.status === 200) {
        let newsHtml = ''
        let newsData = JSON.parse(this.responseText);
        let articles = newsData.articles;
        articles.forEach(function (element) {
            let newsCard = `<div class="card mb-3" style="max-width: 1200px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${element.urlToImage}" class="img-fluid rounded-start newsImage" alt="image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text"><a href='${element.url}'>Read full article here...</a></p>
                        <p class="card-text"><small class="text-muted">Source: ${element.source['name']}</small></p>
                    </div>
                </div>
            </div>
        </div>`
            newsHtml += newsCard;
        });
        allNews.innerHTML = newsHtml;
    } else {
        alertCont.innerHTML = `<div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">Oops! An error occured</h4>
                                <p>It looks like the news are unable to load, check your internet connection before reloading the page. If the error still occures, 
                                wait for some time and retry</p>
                                <hr>
                                <p class="mb-0">We hope there are no inconviniences in future and you have a seamless experience!</p>
                            </div>`
    };
};

// sending xhr request
xhr.send();