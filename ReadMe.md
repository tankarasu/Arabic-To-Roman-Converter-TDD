# Arabic to Roman number converter

## Purpose of the repository

We will try to implement a method who convert Arabic Numbers to Roman Numbers. I think about a method who take a number in argument and return a string. Implementation method will be by something seems like TDD. 

Project will be made with NodeJS and Typescript, we will test with Jest. You can do it, if you want with your favourite language and testing library. Fundamentals are the same.

---
## Prerequistes

Basic knowledge with:
- NodeJs
- Npm
- VS Code or your favourite IDE

## Ressources used inside project

- [NodeJS v16 documentation](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Typescript official documentation](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Jest official documentation](https://jestjs.io/docs/getting-started)
- [TS config reference](https://www.staging-typescript.org/tsconfig)
  
---
## STEP 1. Initializing the project

First of all, we need a place for our project and we need to be inside the project. 

```bash
$ mkdir roman-number-converter 
$ cd roman-number-converter
```

Now, inside the empty project folder, we must initialize project, create the "package.json" file and also initialize the git repository. 

```bash
$ npm init -y
$ git init
```

Inside the .gitignore file, you must add node_modules folder in order to skip it when commit.

```git
// .gitignore file

node_modules/
```

Now it's time to install needed dependecies.

```bash
$ npm i -D typescript
$ npm i -D jest ts-jest @types/jest
```

After that, time to configure typescript. You can follow my setup or adapt your setup to your wills. 

```bash
$ npx tsc --init
```

Almost finished, we're gonna make to folders, one for sources and second for testing. Also we will create two files, one in each newly created folders.

```bash
$ mkdir src test
$ touch src/toRoman.ts test/toRoman.spec.ts
```

In the test file, we can now draw our first test.

```node
// toRoman.spec.ts
describe("true suite of test", ()=>{
    it("should return true",()=>{
        expect(true).toBeTruthy()
    })
})
```

**Congratulation**, our project is ready to be coded with his test environnement.  

---

## STEP 2. Numbers between 1 and 9.

Remember, we want to provide a number in argument and receive a string as return.

```js
console.log( toRoman(1) );
// expected: => I;
```

We probably have a function like this:
```ts
function toRoman(num: number): string{
    let result: string;
    // do some stuff...

    return result;
}
```

Zero didn't exist in Roman civilisation, Undefined neither. In those case we want an empty string as a result value.

```ts
import {toRoman} from "../src/toRoman"

describe("special treatment", ()=>{
    it("should return an empty string", ()=>{
        expect(toRoman(0)).toBe("");
        expect(toRoman(undefined)).toBe("");
        expect(toRoman()).toBe("");
    })
})
```

We can handle the case with "undefined" with an optionnal argument with TS, and simply return an empty string for now.

```ts
export function toRoman(num: number = 0){
    return "";
}
```

Let us now focus on the cases that interest us. We will handle now the number "1". 

```ts
describe("number between 1 & 9", ()=>{
    it("should return I for 1", 
        ()=> expect(toRoman(1)).toBe("I"))
})
```

Obviously, i can say "if i receive 1, return I".

```ts
export function toRoman(num: number = 0){
    if(num === 1) return "I";

    return "";
}
```

We can go further with our tests. "If i receive 2 or 3 return II or III".

```ts
describe("number between 1 & 9", ()=>{
    it("should return I for 1, ... II & III", ()=>{
        expect(toRoman(1)).toBe("I");
        expect(toRoman(2)).toBe("II");
        expect(toRoman(3)).toBe("III");
    })
})
```

We're going to do it incrementally and we're going to stupidly do three "if" conditions. We'll have the opportunity to refactor later when a pattern jumps out at us.

```ts
export function toRoman(num: number = 0){
    if(num === 1) return "I";
    if(num === 2) return "II";
    if(num === 3) return "III";

    return "";
}
```
If we are aware of the String.prototype.repeat() method, a first pattern becomes obvious.

```ts
export function toRoman(num: number = 0) {
    if (num >= 1 && num <= 3) return "I".repeat(num);

    return "";
}
```

at this level of the project, the case of number 4 and 5 is quite simple.

```ts
// toRoman.spec.ts
it("should return IV for 4",
    () => expect(toRoman(4)).toBe("IV"));

it("should return V for 5",
    () => expect(toRoman(5)).toBe("V"));

// toRoman.ts
export function toRoman(num: number = 0) {
    if (num >= 1 && num <= 3) return "I".repeat(num);
    if (num === 4) return "IV";
    if (num === 5) return "V";

    return "";
}
```

If we think a little, and I know we think a little, 6 = 5 +1. We keep the same reasoning for 7 and 8. We know how to handle 5 and we also know how to handle 1 to 3.

```ts
// toRoman.spec.ts
it("numbers between 5 and 8", () => {
        expect(toRoman(5)).toBe("V")
        expect(toRoman(6)).toBe("VI")
        expect(toRoman(7)).toBe("VII")
        expect(toRoman(8)).toBe("VIII")
    });

// toRoman.ts
export function toRoman(num: number = 0) {
    if (num >= 1 && num <= 3) return "I".repeat(num);
    if (num === 4) return "IV";
    if (num >= 5 && num <= 8) return "V" + "I".repeat(num - 5);

    return "";
}
```

Obviously, for 9 we make something really simple too.

```ts
// toRoman.spec.ts
it("should return IX for 9", 
    () => expect(toRoman(9)).toBe("IX"));

// toRoman.ts
export function toRoman(num: number = 0) {
    if (num >= 1 && num <= 3) return "I".repeat(num);
    else if (num === 4) return "IV";
    else if (num >= 5 && num <= 8) return "V" + "I".repeat(num - 5);
    else if (num === 9) return "IX";
    else return "";
}
```

Congratulions, the first step is done and now we have a solid skeleton to move further. 

---

## STEP 3. Thinking about

We know that a number is composed of unit, tens, hundreds and thousands. For example, 1235 is made up of 1 thousand, 2 hundreds, 3 tens and 5 ones.

```ts
    // We can have this process
    toRoman(1235){
        handleUnits(5);
        handleTens(3);
        handleHundreds(2);
        handleThousands(1);

        return result;
    }

    // Otherwise if we refactor well, we can have this
    toRoman(1235){
        handleNumber(num, symbolArray); // num = 1;
        handleNumber(num, symbolArray); // num = 2;
        handleNumber(num, symbolArray); // num = 3;
        handleNumber(num, symbolArray); // num = 5;

        return result;
    }
```

In the latter case we just need one method that is almost done, remember numbers between 1 and 9. First we will refactor this by extracting the method and verify that the tests are OK.

```ts
const unitySymbols = ["I", "V", "X"];

export function toRoman(num: number = 0) {
    let result = handleNumbers(num, unitySymbols);

    return result;
}

function handleNumbers(num: number, arr: Array<string>): string {
    if (num >= 1 && num <= 3) return arr[0].repeat(num);
    else if (num === 4) return arr[0].concat(arr[1]);
    else if (num >= 5 && num <= 8) return arr[1].concat(arr[0].repeat(num - 5));
    else if (num === 9) return arr[0].concat(arr[2]);
    else return "";
}
```

Now we have to find a way to extract the different separators like the thousands or the hundreds, then call the method in order to extract the result.

We will not forget to prepare the tables that go well with the different separators.

```ts
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
```

We have obtained something like this, it's time now to see if with somes values that works. 

```ts
import { toRoman } from "../src/toRoman"

describe("number between 1 & 9", () => {
    it("numbers between 1 and 3", () => {
        expect(toRoman(1)).toBe("I");
        expect(toRoman(2)).toBe("II");
        expect(toRoman(3)).toBe("III");
    })

    it("should return IV for 4",
        () => expect(toRoman(4)).toBe("IV"));

    it("numbers between 5 and 8", () => {
        expect(toRoman(5)).toBe("V")
        expect(toRoman(6)).toBe("VI")
        expect(toRoman(7)).toBe("VII")
        expect(toRoman(8)).toBe("VIII")
    });

    it("should return IX for 9", () => {
        expect(toRoman(9)).toBe("IX");
    });

    it("should handle the numbers under 100", () => {
        expect(toRoman(99)).toBe("XCIX");
        expect(toRoman(55)).toBe("LV");
    });

    it("should handle numbers above 100", () => {
        expect(toRoman(1003)).toBe("MIII")
        expect(toRoman(1235)).toBe("MCCXXXV")
    });
})

describe("special treatment", () => {
    it("should return an empty string", () => {
        expect(toRoman(0)).toBe("");
        expect(toRoman(undefined)).toBe("");
        expect(toRoman()).toBe("");
    })
})
```

Congratulations, all's done. 