export type Item = {
    name: string,
    price: number
}

export class ItemManager {
    items: Item[]
    private static instance: ItemManager | null = null

    private constructor() {
        this.items = [{
            name: "Default",
            price: 12.15
        }]
    }

    public static getInstance() {
        if (!ItemManager.instance) {
            ItemManager.instance = new ItemManager()
        }
        return ItemManager.instance

    }

    private parseItem(data: any): Item | undefined {
        if (data.name && data.price) {
            return data as Item
        }

        else {
            console.log("Failed to parse an item")
            return undefined
        }
    }

    getItem(name: string): Item | undefined {
        console.log(name)
        const item = this.items.find((item) => item.name === name)
        return item
    }

    addOrUpdateItem(data: Item): Item | undefined {
        const parsedData = this.parseItem(data)
        if (!parsedData) return undefined

        const item = this.getItem(parsedData.name)

        if(!item) {
            this.items = [...this.items, parsedData]
        }
        else {
            this.items = this.items.map((candidate) => {
                if(candidate.name === parsedData.name) {
                    candidate = {...parsedData}
                }
                return candidate
            })
        }
        return this.getItem(parsedData.name)
    }
    deleteItem(name: string) {
        const item = this.getItem(name)
        if (!item) {
            return undefined
        }
        const itemCopy = {...item}
        this.items = this.items.filter((candiate) => !(candiate.name === name))
        return itemCopy
    }
    updateItem(itemArg: Item) {
        const parsedItem = this.parseItem(itemArg)
        if (!parsedItem) return undefined

        const item = this.getItem(parsedItem.name)
        if (!item) return undefined

        this.items.map((candidate) => {
            if (candidate.name === item.name) {
                candidate.price === item.price
            }
        })
        return item
    }
    getAllItems() {
        return this.items
    }
}
