type Node<T> = {
    value?: T;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (!this.head) {
            return undefined;
        }
        const tmp = this.head;
        this.head = this.head?.next;

        //free
        tmp.next = undefined;

        return tmp.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
