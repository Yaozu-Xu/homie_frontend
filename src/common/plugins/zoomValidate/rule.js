const rules = {
    type(value, t, msg) {
        const detail = {
            alpha(value) {
                if(!(/^[a-zA-Z]+$/.test(value))){
                    return msg
                }
            },
            alphaNum(value) {
                if(!(/^[0-9a-zA-Z]+$/.test(value))){
                    return msg
                }
            },
            alphaNumDash(value) {
                if(!(/^[0-9a-zA-Z_-]+$/.test(value))){
                    return msg
                }
            },
            email(value) {
                if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value))){
                    return msg
                }
            },
        }
        return detail[t](value)
    },
    max(value, len, msg) {
        if (!(value.length <= len)){
            return msg
        }
    },
    min(value, len, msg) {
        if (!(value.length >= len)){
            return msg
        }
    },
    required(value, bool, msg) {
        if (bool && value.length <= 0) {
            return msg
        }
    }
}

export default rules