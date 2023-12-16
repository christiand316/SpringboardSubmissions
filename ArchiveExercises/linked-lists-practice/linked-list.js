/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val)

    //check if there is a head already
    if (this.head === null) this.head = newNode;
 
    else this.tail.next = newNode;
    
    this.tail = newNode;

    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val)

    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }
    return cur.val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < idx) {
      current = current.next;
      currentIndex++;
    }

    if (current && currentIndex === idx) {
      current.value = val;
    } 
    
    this.length += 1;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) {
      return this.unshift(val);
      
    }

    const newNode = new Node(val);
    let current = this.head;
    let prev = null;
    let currentIndex = 0;

    while (current && currentIndex < idx) {
      prev = current;
      current = current.next;
      currentIndex++;
    }


    prev.next = newNode;
    newNode.next = current;
    
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
  if (idx === 0) {
    const val = this.head.val;
    this.head = this.head.next;
    
    this.length -= 1
    if (this.length <= 1) {
      this.tail = this.head
    }
    return val;
}
  
  let current = this.head;
  let previous = null;
  let currentIndex = 0;
  
  while (current && currentIndex < idx) {
      previous = current;
      current = current.next;
      currentIndex++;
  }
  
  if (current) {
      previous.next = current.next;
      return current.data;
  }
  
  return null;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    for(let i = 0; i < this.length;i++) {
      total += current.val;
      current = current.next;
    }
    return total / this.length;
  }
  
}

module.exports = LinkedList;
