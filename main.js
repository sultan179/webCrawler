
const {crawlPage}=require('./crawl.js')
function main(){

    if (process.argv.length<3){
        console.log("no website provided")
        process.exit(1)

    }

    if (process.argv.length>3){
        console.log("too many arguments")
        process.exit(1)
    }

    // for (const arg of process.argv){
    //     console.log("args "+arg)
    // }

    const baseURL=process.argv[2]

    console.log(`starting crawling of ${baseURL}`)
    crawlPage(baseURL)

}

main()