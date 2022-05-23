import aPi from './aPi.js';

const start = ({ functionToRun, argsToFunction }) => {
  aPi[functionToRun]
    ? aPi[functionToRun](argsToFunction)
    : console.log(`"${functionToRun}" is not one of the crypto functiions. Please provide one of the following function names as your 2nd argument:\nhexToBase64\nfixedXOR`); // eslint-disable-line no-console
};

export default start;

