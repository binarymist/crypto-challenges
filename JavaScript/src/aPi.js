import shared from './shared.js';

// Challenge 1
// To run:
// npm start hexToBase64 49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d
// Output:
// SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
const hexToBase64 = (args) => {
  const { hexStringToByteArray, byteArrayToBaseN } = shared;
  if (args.length !== 1) {
    console.error('There should be exactly one argument passed to function hexToBase64. Please try again.'); // eslint-disable-line no-console
    return;
  }
  const hex = args[0];
  const byteArray = hexStringToByteArray(hex);
  const base64 = byteArrayToBaseN({ base: 'base64', byteArray });
  console.log(base64); // eslint-disable-line no-console
};

// Challenge 2
// To run:
// npm start fixedXOR 1c0111001f010100061a024b53535009181c
// Output:
// 746865206b696420646f6e277420706c6179
const fixedXOR = (args) => {
  const { hexStringToByteArray, xOrCombinationFrom2EqualLengthBuffers, byteArrayToBaseN } = shared;
  const againstHex = '686974207468652062756c6c277320657965';
  if (args.length !== 1) {
    console.error('There should be exactly one argument passed to function fixedXOR. Please try again.'); // eslint-disable-line no-console
    return;
  }
  const xOrAgainst = hexStringToByteArray(againstHex);
  const userInput = hexStringToByteArray(args[0]);
  if (xOrAgainst.length !== userInput.length) {
    console.log(`The hex string you provided was not the same length as ${againstHex}. Please try again.`); // eslint-disable-line no-console
    return;
  }
  const xOrdByteArray = xOrCombinationFrom2EqualLengthBuffers(xOrAgainst, userInput);
  const answer = byteArrayToBaseN({ base: 'hex', byteArray: xOrdByteArray });
  console.log(answer); // eslint-disable-line no-console
};

// Challenge 3
// To run:
// npm start singleByteXORCipher 99B8BAAFF6B7F6A5A3A4B0B3A4F6BDB8B9A1A5F6A2BEB3F6B0B3B3BABFB8B1
// Output:
// key: 0xd6, outcome: Only a surfer knows the feeling
const singleByteXORCipher = (args) => {
  const { hexStringToByteArray, xOrCombinationFrom2EqualLengthBuffers, byteArrayToBaseN } = shared;
  if (args.length !== 1) {
    console.error('There should be exactly one argument passed to function singleByteXORCipher. Please try again.'); // eslint-disable-line no-console
    return;
  }
  const userInput = hexStringToByteArray(args[0]);
  // Now we have userInput as a byte array.
  // Now we have to create 256 (All possible characters of a single byte character) as an array of characters represented as binary.
  const keys = [];
  for (let i = 0; i < 256; i += 1) {
    keys.push(i);
  }

  const numOfBytesToXOR = userInput.length;

  const xOrAgainstCollection = keys.map((k) => {
    const xOrAgainst = new Array(numOfBytesToXOR);
    xOrAgainst.fill(k);
    const xOAAsByteArray = new Uint8Array(xOrAgainst);
    return { key: k, xOAAsByteArray };
  });

  // Now we need the 256 results of XORing userInput against each element of xOrAgainstCollection.xOAAsByteArray.
  const possibleOutcomes = xOrAgainstCollection.map((xOA) => ({ key: xOA.key, outcome: xOrCombinationFrom2EqualLengthBuffers(userInput, xOA.xOAAsByteArray) }));
  // Convert each possibleOutcomes.outcome element from it's binary to decimal representation.
  const possibleOutcomesAsText = possibleOutcomes.map((o) => ({ key: o.key, outcome: byteArrayToBaseN({ byteArray: o.outcome }) }));

  // This line is useful for visualising the decoded strings.
  possibleOutcomesAsText.forEach((e) => console.log(`key: ${e.key}, ${e.outcome}`)); // eslint-disable-line no-console

  const possibleOutcomesWithLoweredText = possibleOutcomesAsText.map((o) => ({ ...o, outcomeLowered: o.outcome.toLowerCase() }));

  // https://en.wikipedia.org/wiki/Letter_frequency#Relative_frequencies_of_letters_in_the_English_language
  const letterFreqScores = { ' ': 15, e: 12.702, t: 9.056, a: 8.167, o: 7.507, i: 6.966, n: 6.749, s: 6.327, h: 6.094, r: 5.987, d: 4.253, l: 4.025, c: 2.782, u: 2.758, m: 2.406, w: 2.360, f: 2.228, g: 2.015, y: 1.974, p: 1.929, b: 1.492, v: 0.978, k: 0.772, j: 0.153, x: 0.150, q: 0.095, z: 0.074 };

  const possibleOutcomesWithScores = possibleOutcomesWithLoweredText.map((o) => {
    const elementScore = o.outcomeLowered.split('').map((c) => letterFreqScores[c] || 0).reduce((prevScore, charScore) => prevScore + charScore);
    return { ...o, score: elementScore };
  });

  // Let's do one better and not just provide the highest scoring string but an ordered list.
  possibleOutcomesWithScores.sort((a, b) => a.score - b.score);
  // Todo: We need to improve on the text representation for non alpha characters like '*-'

  console.log(`The highest scoring text with it's hex key was:\nkey: 0x${possibleOutcomesWithScores[possibleOutcomesWithScores.length - 1].key.toString(16)}, outcome: ${possibleOutcomesWithScores[possibleOutcomesWithScores.length - 1].outcome}`); // eslint-disable-line no-console
};

export default {
  hexToBase64,
  fixedXOR,
  singleByteXORCipher
};

