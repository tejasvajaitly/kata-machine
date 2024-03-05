export default class MinHeap {
    public length: number;
    public data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue < value) {
            return;
        }

        this.data[parentIdx] = value;
        this.data[idx] = parentValue;

        this.heapifyUp(parentIdx);
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lv = this.data[lIdx];
        const rv = this.data[rIdx];
        const v = this.data[idx];

        if (lv > rv && v > rv) {
            this.data[rIdx] = v;
            this.data[idx] = rv;
            this.heapifyDown(rIdx);
        } else if (rv > lv && v > lv) {
            this.data[lIdx] = v;
            this.data[idx] = lv;
            this.heapifyDown(lIdx);
        }
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        if (this.length === 1) {
            this.data = [];
            this.length--;
            return out;
        }

        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.heapifyDown(0);

        return out;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}

//step1 => get left child
//step2 => get right child
//step3 => get parent
//step4 => heapify up
//step5 => heapify down
