const log = (...args) => console.log({ args })
console.log("Installed!")
const map = fn => xs => xs.map(fn)
const getTabId = x => x.id
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)), x => x)
const logTap = (arg) => {
    console.log({ arg })
    return arg
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
                            const getMoves = () => {
                                const id = x => x
                                const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)), id)
                                const map = fn => xs => xs.map(fn)
                                const getChildren = el => Array.from(el.children)
                                const getMoveHtml = el => el.innerHTML
                                const normalizeMoveHtml = text => {
                                    if (!text.includes('span')) return text
                                    const parts = text.split('/span>')
                                    const moveInfo = parts[parts.length - 1]
                                    const pieceType = parts[0].replace(/>/g, '').replace(/</g, '')
                                        .split(' ').map(e => e.split('=').map(e => e.replace(/"/g, ''))).filter(e => e.length > 1)
                                        .filter(e => e[0] == 'data-figurine')[0][1]
                                    const moveMetadata = { moveInfo, pieceType }
                                    return pieceType + moveInfo
                                }
                                const parseNodeEl = map(compose(normalizeMoveHtml, getMoveHtml))
                                const moveListEl = document.querySelector('vertical-move-list')
                                return getChildren(moveListEl).map(compose(parseNodeEl, getChildren))
                            }

                            if (document.title.includes("Chess.com")) {
                                return {
                                    html: document.querySelector('html').innerHTML,
                                    title: document.title,
                                    payload: getMoves()
                                }

                            }
                        },
                    }, htmlData => resolve(htmlData));

                })
            })
        ).then(results => resolve2(results))
    }).then(data => Promise.all(data))
        .then(data => {
            return data.filter(x => x).map(d => d[0].result)
        })
        .then(data => console.log({ data }))
}

chrome.runtime.onInstalled.addListener((...args) => {
    getChessGameHtml(chrome).then(log)
});