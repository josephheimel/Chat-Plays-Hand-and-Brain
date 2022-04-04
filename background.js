const log = (...args) => console.log({ args })
console.log("Installed!")
const map = fn => xs => xs.map(fn)
const getTabId = x => x.id
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)), x => x)
const logTap = (arg) => {
    console.log({ arg })
    return arg
}
// temp1.match(/.*vertical-move-list.*/g).flatMap(e => [...e.matchAll(/div class=\"move\".*/g)].map(e => e.input))

const isChessDotCom = d => (console.log(d), d.result.title.includes("Chess.com"))
const getMoves = data => {
    console.log(data)
    return data
}

const getChessGameHtml = chrome => {
    const isChessGame = result => {
        console.log({ result })
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
    .then(data => data.filter(e => e).find(isChessDotCom))
    .then(getMoves)

}

chrome.runtime.onInstalled.addListener((...args) => {
    getChessGameHtml(chrome).then(log)
});