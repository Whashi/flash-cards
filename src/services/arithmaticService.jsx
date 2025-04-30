export const getRandomInt = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result;
    do {
      result = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (result === exclude);
    return result;
  };

  export const generateAdditionNumbers = (limit, exclude) => {
    const newFirstNumber = getRandomInt(1, limit, exclude);
    const newSecondNumber = getRandomInt(1, limit - newFirstNumber);
    return ([newFirstNumber, newSecondNumber]);
  };

  export const generateSubtactionNumbers = (limit, exclude) => {
    const newFirstNumber = getRandomInt(1, limit, exclude);
    const newSecondNumber = getRandomInt(1, newFirstNumber -1);
    return ([newFirstNumber, newSecondNumber]);
  };