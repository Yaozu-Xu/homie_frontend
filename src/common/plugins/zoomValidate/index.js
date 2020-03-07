import validateStrategy from './validate'
import settings from './settings'


const plugin = {
    install(Vue, options) {
        // 添加全局指令
        Vue.directive('validate', {
            bind: (el, binding, vnode) => {
                const descriptor = binding.value
                const strategy = descriptor.rules // 验证方法
                const msg = descriptor.msg // 错误信息
                // 是否有dom设置，未则读取默认配置
                if (descriptor.hasOwnProperty('settings')){
                    const s = descriptor.settings // 验证结束后的dom操作
                    el.addEventListener('input', (event) => {
                        validateStrategy.validate(strategy, msg, el, s, vnode)
                    })
                }else{
                    el.addEventListener('input', (event) => {
                        validateStrategy.validate(strategy, msg, el, settings, vnode)
                    })
                }
            }
        }),
        Vue.directive('validTrigger', {
            bind: (el, binding, vnode) => {
                const descriptors = vnode.context.descriptor
                const func = binding.value
                el.addEventListener('click', (event) => {
                   for(const k in descriptors){
                       // k: 属性名当前待验证的元素的ID
                       const curentValidateDom = document.getElementById(k) 
                       const descriptor = descriptors[k] 
                       const strategy = descriptor.rules 
                       const msg = descriptor.msg 
                       if (descriptor.hasOwnProperty('settings')) {
                           const s = descriptor.settings // 验证结束后的dom操作
                           validateStrategy.validate(strategy, msg, curentValidateDom, s, vnode)
                       }else{
                           validateStrategy.validate(strategy, msg, curentValidateDom, settings, vnode)
                       }
                   }
                   func()
                })
            }
        }),
        // 添加实例方法
        Vue.prototype.errMsg = {}
        // 添加新的验证方法
        // rules.newWay
    },
}

export default plugin