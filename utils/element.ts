export default class ElementHelper {
  hasClass(el: any, className: string): boolean {
    if (el.classList) return el.classList.contains(className)
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }

  addClass(el: any, className: string) {
    if (el.classList) el.classList.add(className)
    else if (!this.hasClass(el, className)) el.className += ' ' + className
  }

  removeClass(el: any, className: string) {
    if (el.classList) el.classList.remove(className)
    else if (this.hasClass(el, className)) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    }
  }
}
