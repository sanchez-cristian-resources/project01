export const createContext = (defValue) => {
  // Create new Context Obj to storage the context on a different reference
  const context = new Context(defValue)

  return [context.getValue.bind(context), context.setValue.bind(context)]
}

class Context {
  constructor (defVaue) {
    this.value = defVaue
  }

  getValue () {
    return this.value
  }

  setValue (value) {
    this.value = value
  }
}
