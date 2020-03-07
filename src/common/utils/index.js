var parseMsg = (s) => {
    while((/body\/\w+s*/).test(s)){
        s = s.replace(/body\/\w+s*/, '')
    }
    return s
}

export {
    parseMsg
}