
/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class NodeObj<TData> {
  val: TData
  next: NodeObj<TData> | null
  constructor(data: TData, next = null) {
      this.val = data
      this.next = next
  }
}

class Stack<TData> {

  first: NodeObj<TData> | null
  last: NodeObj<TData> | null
  size: number

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const node = new NodeObj(val)

    if (!this.first) {
      this.first = node
      this.last = node
    }
    else {
      const temp = this.first
      this.first = node
      this.first.next = temp
    }
    this.size += 1
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.size === 0) {
      throw new Error("Empty stack")
    }
    if (!this.first) {
      throw new Error("Crucial error; list has size but no first element.") //should never occur
    }
    const valueToReturn = this.first.val
    this.first = this.first.next
    this.size -= 1

    return valueToReturn
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first?.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size == 0
  }
}

module.exports = Stack;
