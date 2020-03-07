import rules from './rule'

const validateStrategy = {}

validateStrategy.validate = (strategy, msg, el, settings, vnode) => {
    const v = el.value // input value
    const id = el.id // dom id
    // 与rules对比返回初步错误信息
    const mapRes = Object.keys(strategy).map((key) => {
        if (rules.hasOwnProperty(key)) {
            const m = msg[key]
            const arg = strategy[key]
            const r = rules[key](v, arg, m)
            return r
        }
    })
    const tempMsg = mapRes.filter((m) => {
        return m !== undefined
    })
    // 验证结束
    if (tempMsg.length > 0) {
        vnode.context.errMsg[id] = tempMsg
        if(settings.domOp){
            settings.invalidDomOp(el, tempMsg)
        }
    } else {
        delete vnode.context.errMsg[id] // 验证正确，从错误信息中删除
        if(settings.domOp){
            settings.validDomOp(el)
        }
    }
    // console.log(vnode.context.errMsg)
}

export default validateStrategy