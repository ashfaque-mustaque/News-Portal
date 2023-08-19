const API_KEY="c25c00f03199491cbbe3b06b2310c33d";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetchNews("India"));
async function fetchNews(query){
    const response=await fetch(`${url} ${query}&apiKey=${API_KEY}`);
    const data= await response.json();
    console.log(data);
    bindData(data.articles);

}
function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardscontainer.innerHTML='';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });

}
function fillDataInCard(cardclone,article){
    const newsImg=cardclone.querySelector("#newsImg");
    const newstitle=cardclone.querySelector("#card-title");
    const newssource=cardclone.querySelector("#news-source");
    const newsDes=cardclone.querySelector("#news-description");

    newsImg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsDes.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone:"Asia/Jakarta"
    });
    newssource.innerHTML=`${article.source.name} . ${date}  `; 
    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })



}

let curSelectedNav=null;
function OnNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchButton=document.getElementById("search");
const searchText=document.getElementById("searchText");
searchButton.addEventListener("click", () =>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
});
curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
function reload(){
    window.location.reload();
}


