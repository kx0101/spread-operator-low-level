class CustomIterator<T> implements IterableIterator<T> {
    private values: T[];
    private index: number;

    constructor(values: T[]) {
        this.values = values;
        this.index = 0;
    }

    public next(): IteratorResult<T> {
        if (this.index >= this.values.length) {
            return { value: undefined, done: true };
        } else {
            const value = this.values[this.index];
            this.index++;

            return { value, done: false };
        }
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this
    }
}

function concat<T>(iterables: Iterable<T>[]): T[] {
    const result: T[] = [];

    for (const iterable of iterables) {
        const iterator = new CustomIterator(Array.from(iterable));

        for (const value of iterator) {
            result.push(value);
        }
    }

    return result;
}

const arrayOne = [1, 2, 3];
const arrayTwo = [4, 5, 6];

const concatenatedArray = concat([arrayOne, arrayTwo]);

console.log(concatenatedArray);
