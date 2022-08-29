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
