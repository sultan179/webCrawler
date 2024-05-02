
const {JSDOM}=require('jsdom')


async function crawlPage(currentURL){
    console.log(`active crawling: ${currentURL}`)

    try{

    const resp=await fetch(currentURL) //be default GET requests

    if (resp.status>399){
        console.log(`error in fetching with status ${resp.status} on page ${currentURL}`)
        return
    }

    const contentType=resp.headers.get('content-type')

    if (!contentType.includes('text/html')){
        console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
        return
    }

    console.log(await resp.text()) //parsing html as text


    }
    catch(err){
        console.log(err.message)
    }

}


function getURLsFromHTML(htmlBody,baseURL){
    const urls=[];
    const dom=new JSDOM(htmlBody)
    const linkElements=dom.window.document.querySelectorAll('a')
  

    for (const linkElement of linkElements){
        if (linkElement.href.slice(0,1)=='/'){
            try{
                const urlObj=new URL(`${baseURL}${linkElement.href}`)
                urls.push(`${baseURL}${linkElement.href}`)

            }
            catch(error){
                console.log(`error with relative url: ${err.message}`)
            }
           

        }
        else{
            try{
                const urlObj=new URL(linkElement.href)
                urls.push(urlObj.href)

            }
            catch(err){
                console.log(`error with absolute url: ${err.message}`)

            }

            urls.push(linkElement.href)
            
        }
       
        
    }
    return urls
}




function normalizeURL(urlString){
    const urlObj=new URL(urlString)
    
    const hostPath= `${urlObj.hostname}${urlObj.pathname}`

    if ((hostPath.length>0 && hostPath.slice(-1))==='/'){
        return hostPath.slice(0,-1);
    }
    return hostPath
}

module.exports={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}