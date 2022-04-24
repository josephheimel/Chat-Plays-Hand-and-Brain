const log = (...args) => console.log({ args })
const map = fn => xs => xs.map(fn)
const filter = fn => arr => arr.filter(fn)
const getTabId = x => x.id
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)), x => x)
const logTap = (arg) => {
    console.log({ arg })
    return arg
}


const isChessDotCom = d => (d && d.result && d.result.title && d.result.title.includes("Chess.com"))
const getMoves = data => {
    const rawChessHtml = data?.result?.data
    const regexParseMoves = htmlData => htmlData.split('vertical-move-list')[2].match(/>([^<]*)</g)
  
    const isNonempty = x => x.length > 0
    const isActualMove = x => !x.includes('.')
    const withoutCaret = x => x.replace('<',  '').replace('>', '')
    const normalizeMoves = compose(filter(isActualMove),filter(isNonempty),map(withoutCaret))
    const parsed = compose(normalizeMoves, regexParseMoves)(rawChessHtml)
    console.log({ regexParsed: parsed }) 
    if (!rawChessHtml) return null
    return data
}

const getChessGameHtml = chrome => {
    const isChessGame = result => {
        return result.title.includes('Chess')
    }
    return new Promise((resolve2, _) => {

        chrome.tabs.query({}).then(xs => xs.map(x => x.id)
            .map(tabId => {
                return new Promise((resolve, _) => {
                    chrome.scripting.executeScript({
                        target: { tabId },
                        func: function getDoc() {
                        const title =  document.title
                        const data = document.querySelector("html").innerHTML
                        return { title, data}
                        },
                    }, htmlData => resolve(htmlData));

                })
            })
        ).then(results => resolve2(results))
    }).then(data => Promise.all(data))
    .then(data => data.filter(e => e).flatMap(e => e).find(isChessDotCom))
    .then(getMoves)

}

chrome.runtime.onInstalled.addListener((...args) => {
    getChessGameHtml(chrome).then(log)
});


chrome.action.onClicked.addListener(tab => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('index.html'),
        active: false
    }, function(tab) {
        chrome.windows.create({
            tabId:tab.id,
            type: 'popup',
            focused: false
        });
    });
})