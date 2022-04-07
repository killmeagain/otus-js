// с корня директории node ./1/sum.js, чтобы запустить файл

function sum(number) {
    let acc = 0;
    function closesFunction(number) {
        if (typeof number === 'number') {
            acc += number;
            return closesFunction;
        } else if(typeof number === 'undefined') {
            return acc;
        } else {
            console.error('Функцию можно вызвать только с аргументом типа "число" или "undefined"');
        }
    }

    return closesFunction(number);
}

console.log(sum(1)(2)(3)());
console.log(sum(1)(2)(3)('')); // Функцию можно вызвать только с аргументом типа "число" или "undefined"