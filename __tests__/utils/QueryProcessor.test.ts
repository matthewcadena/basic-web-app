import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return Andrew ID', () => {
        const query = "andrew id";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "My Andrew ID is 'mcadena'."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "mcadena"
          ));
    });

    test("should return sum for plus query", () => {
        const query = "What is 21 plus 96?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("117");
    });

    test("should return number that is both a square and a cube", () => {
        const query = "Which of the following numbers is both a square and a cube: 3059, 2190, 3044, 195, 81, 4096?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("4096");
    });

    test("should return subtraction result for minus query", () => {
        const query = "What is 120 minus 77?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("43");
    });

    test("should return primes from list", () => {
        const query = "Which of the following numbers are primes: 41, 85, 7, 59, 48?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("41, 7, 59");
    });
});