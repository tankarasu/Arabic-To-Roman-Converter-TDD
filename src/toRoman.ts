const unitySymbols = ["I", "V", "X"];
const tensSymbols = ["X", "L", "C"];
const hundredsSymbols = ["C", "D", "M"];
const thousandsSymbols = ["M", "V*", "X*"];

export function toRoman(num: number = 0) {
    let thousands = Math.floor(num / 1000);
    let hundreds = Math.floor((num - (thousands * 1000)) / 100);
    let tens = Math.floor((num - (thousands * 1000 + hundreds * 100)) / 10);
    let units = num - (thousands * 1000 + hundreds * 100 + tens * 10);

    let result = handleNumbers(thousands, thousandsSymbols);
    result += handleNumbers(hundreds, hundredsSymbols);
    result += handleNumbers(tens, tensSymbols);
    result += handleNumbers(units, unitySymbols);

    return result;
}

function handleNumbers(num: number, arr: Array<string>): string {
    if (num >= 1 && num <= 3) return arr[0].repeat(num);
    else if (num === 4) return arr[0].concat(arr[1]);
    else if (num >= 5 && num <= 8) return arr[1].concat(arr[0].repeat(num - 5));
    else if (num === 9) return arr[0].concat(arr[2]);
    else return "";
}