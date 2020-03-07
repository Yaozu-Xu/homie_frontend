const install = (Vue) => {
    Vue.directive('validate', {
        bind: (el, binding, vnode) => {
           el.addEventListener('blur', (event)=>{
               console.log(el.value)
           })
        }
    });
}


export default install