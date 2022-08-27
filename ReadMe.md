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

Congratulation, our project is ready to be coded with his test environnement.