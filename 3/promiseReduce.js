async function promiseReduce(asyncFunctions, reduce, initialValue) {
    if (Array.isArray(asyncFunctions)) {
        let result;

        if (typeof reduce !== "function") {
            return Promise.reject("Вторым аргументом должен быть callback");
        }

        for (const func of asyncFunctions) {
            if (typeof func !== "function") {
                return Promise.reject("Передайте первым аргументом массив ассинхронных функций");
            } else {
                const memoValue = result === undefined ? initialValue : result;
                result = reduce(memoValue, await func());
            }
        }
        return Promise.resolve(result);
    } else {
        return Promise.reject("Передайте первым аргументом массив ассинхронных функций");
    }
}

const fn1 = () => {
    return Promise.resolve(2);
}
const fn2 = () => new Promise(resolve => {
    setTimeout(() => resolve(2), 1000);
});

promiseReduce([fn1, fn2], (memo, value) => memo * value, 1).then(console.log);
