import { check } from '../utils/auth'

function install(Vue: any, options: any = {}) {
  Vue.directive(options.name || 'auth', {
    inserted: function (el: any, binding: any) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

export default { install };