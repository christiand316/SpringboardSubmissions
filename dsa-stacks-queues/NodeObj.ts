export default class NodeObj<TData> {
    data: TData
    next: NodeObj<TData> | null
    constructor(data: TData, next = null) {
        this.data = data
        this.next = next
    }
}