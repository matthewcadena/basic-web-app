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
    .match(/what is\s*(-?\d+(?:\.\d+)?)\s*plus\s*(-?\d+(?:\.\d+)?)\?/);
  if (plusMatch) {
    const left = Number(plusMatch[1]);
    const right = Number(plusMatch[2]);
    return (left + right).toString();
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

  return "";
}
