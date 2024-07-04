const quote = document.querySelector('.quote'),
      btn = document.querySelector('.btn button'),
      twitterBtn = document.querySelector('.twitter'),
      copyBtn = document.querySelector('.copyBtn'),
      soundBtn = document.querySelector('.sound'),
      tooltip = document.querySelector('.tooltip'),
      allBtns = document.querySelectorAll('.icon div')



window.addEventListener('load', ()=> {
    generateQuotes()
})

function generateQuotes(){

    let div = document.createElement('div')
    quote.innerHTML = `Loading New Quotes... <i class="fa-solid fa-rotate fa-spin"></i>`
    btn.innerHTML = "Generating..."

    allBtns.forEach(btn => {
        btn.style.pointerEvents = "none"
        btn.style.backgroundColor = "#999"
    })


    fetch('https://api.api-ninjas.com/v1/quotes', {
        headers:{"X-Api-key": "CQ42Ra27MOPZdOOlz/GeEg==cqenBjoGwtIi3Mhj"}
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        btn.innerHTML = "New quote"
        quote.innerHTML = ""
        div.innerHTML += '<i class="fa-solid fa-quote-left left"></i> &nbsp'
        div.innerHTML += data[0].quote
        div.innerHTML += '&nbsp <i class="fa-solid fa-quote-right right"></i>'
        quote.append(div)

        div.innerHTML += `<div class="author"><span>--</span><span class="author_name">${data[0].author}</span></div>`

        allBtns.forEach(btn => {
            btn.style.pointerEvents = "auto"
            btn.style.backgroundColor = "transparent"
        })
    })
}


copyBtn.addEventListener('click', ()=>{
    let quoteText = quote.querySelector('.left').nextSibling.textContent.trim()
    navigator.clipboard.writeText(quoteText)


    tooltip.textContent = "Copied"

    setTimeout(()=>{
        tooltip.textContent = "Copy"
    },1000)
})


twitterBtn.addEventListener('click', ()=> {
    let quoteText = quote.querySelector('.left').nextSibling.textContent.trim()
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText}`
    window.open(tweetUrl, "_blank")
})

soundBtn.addEventListener('click', ()=> {
    let quoteText = quote.querySelector('.left').nextSibling.textContent.trim()
    let authorText = document.querySelector('.author_name').textContent.trim()

    // SpeechSynthesisUtterance is part of the Web Speech API, which allows web applications to convert text to speech. It represents a speech request.
    let utterance = new SpeechSynthesisUtterance(`${quoteText} by ${authorText}`)

    speechSynthesis.speak(utterance)
})