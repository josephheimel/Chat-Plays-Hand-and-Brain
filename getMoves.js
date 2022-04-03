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
        const pieceType = parts[0].replace(/>/g, '').replace(/</g,'')
        .split(' ').map(e => e.split('=').map(e => e.replace(/"/g,''))).filter(e => e.length > 1)
        .filter(e => e[0] == 'data-figurine')[0][1]
        const moveMetadata = { moveInfo, pieceType }
        return pieceType + moveInfo
    }
    const parseNodeEl = map(compose(normalizeMoveHtml, getMoveHtml))
    const moveListEl = document.querySelector('vertical-move-list')
    return getChildren(moveListEl).map(compose(parseNodeEl, getChildren))
}