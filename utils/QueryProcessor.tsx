export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    return (
      "My Andrew ID is 'mcadena'."
    )
  }

  if (query.toLowerCase().includes("name")) {
    return "mcadena";
  }

  const plusMatch = query
    .toLowerCase()
    .match(/what is\s*(-?\d+(?:\.\d+)?(?:\s*plus\s*-?\d+(?:\.\d+)?)+)\?/);
  if (plusMatch) {
    const sum = plusMatch[1]
      .split(/\s*plus\s*/)
      .map((value) => Number(value))
      .reduce((total, value) => total + value, 0);
    return sum.toString();
  }

  const multiplyMatch = query
    .toLowerCase()
    .match(/what is\s*(-?\d+(?:\.\d+)?)\s*multiplied by\s*(-?\d+(?:\.\d+)?)\?/);
  if (multiplyMatch) {
    const left = Number(multiplyMatch[1]);
    const right = Number(multiplyMatch[2]);
    return (left * right).toString();
  }

  const multiplyPlusMatch = query
    .toLowerCase()
    .match(/what is\s*(-?\d+(?:\.\d+)?)\s*multiplied by\s*(-?\d+(?:\.\d+)?)\s*plus\s*(-?\d+(?:\.\d+)?)\?/);
  if (multiplyPlusMatch) {
    const left = Number(multiplyPlusMatch[1]);
    const middle = Number(multiplyPlusMatch[2]);
    const right = Number(multiplyPlusMatch[3]);
    return (left * middle + right).toString();
  }

  const minusMatch = query
    .toLowerCase()
    .match(/what is\s*(-?\d+(?:\.\d+)?)\s*minus\s*(-?\d+(?:\.\d+)?)\?/);
  if (minusMatch) {
    const left = Number(minusMatch[1]);
    const right = Number(minusMatch[2]);
    return (left - right).toString();
  }

  const powerMatch = query
    .toLowerCase()
    .match(/what is\s*(-?\d+)\s*to the power of\s*(\d+)\?/);
  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    const exponent = Number(powerMatch[2]);
    let result = BigInt(1);
    for (let i = 0; i < exponent; i += 1) {
      result *= base;
    }
    return result.toString();
  }

  const largestNumbersMatch = query
    .toLowerCase()
    .match(/which of the following numbers is the largest:\s*(.+)\?/);
  if (largestNumbersMatch) {
    const numbers = largestNumbersMatch[1]
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));

    if (numbers.length > 0) {
      return Math.max(...numbers).toString();
    }
  }

  const squareAndCubeMatch = query
    .toLowerCase()
    .match(/which of the following numbers is both a square and a cube:\s*(.+)\?/);
  if (squareAndCubeMatch) {
    const numbers = squareAndCubeMatch[1]
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value));

    const matchingNumbers = numbers.filter((value) => {
      if (value < 0) {
        return false;
      }

      const squareRoot = Math.round(Math.sqrt(value));
      const cubeRoot = Math.round(Math.cbrt(value));
      return squareRoot * squareRoot === value && cubeRoot * cubeRoot * cubeRoot === value;
    });

    if (matchingNumbers.length > 0) {
      return matchingNumbers[0].toString();
    }
  }

  const primesMatch = query
    .toLowerCase()
    .match(/which of the following numbers are primes:\s*(.+)\?/);
  if (primesMatch) {
    const numbers = primesMatch[1]
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value));

    const isPrime = (value: number): boolean => {
      if (value <= 1) {
        return false;
      }
      if (value === 2) {
        return true;
      }
      if (value % 2 === 0) {
        return false;
      }

      for (let divisor = 3; divisor * divisor <= value; divisor += 2) {
        if (value % divisor === 0) {
          return false;
        }
      }
      return true;
    };

    const primeNumbers = numbers.filter((value) => isPrime(value));
    if (primeNumbers.length > 0) {
      return primeNumbers.join(", ");
    }
  }

  return "";
}
