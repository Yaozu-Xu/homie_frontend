var settings = {}

settings.domOp = true

// 验证不合法操作DOM
settings.invalidDomOp = (el, msgArr) => {
    $(el).addClass('is-invalid')
    $(el).removeClass('is-valid')
    $(el).siblings().eq(0).text(msgArr[0])
}

// 合法后操作DOM
settings.validDomOp = (el) => {
    $(el).addClass('is-valid')
    $(el).removeClass('is-invalid')
    $(el).siblings().eq(0).text('')
}

export default settings