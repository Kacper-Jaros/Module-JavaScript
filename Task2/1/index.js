const runningAverage = () => {
  let sumOfAverage = 0;
  let counter = 0;

  return (calculation = number => {
    sumOfAverage += number;
    counter++;
    return console.log(sumOfAverage / counter);
  });
};

const rAvg = runningAverage();

rAvg(10);
rAvg(11);
rAvg(12);
