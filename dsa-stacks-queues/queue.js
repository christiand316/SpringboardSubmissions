
/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class NodeObj {
    constructor(data, next = null) {
        this.val = data
        this.next = next
    }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(data) {
    const node = new NodeObj(data)

    if (!this.first) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }
    this.size++
    return undefined
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (!this.first) throw new Error("Queue is empty")

    const dequeuedValue = this.first.val
    if (this.first == this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--

    return dequeuedValue
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first?.val
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size == 0
  }
}

module.exports = Queue