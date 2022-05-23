// A typed array (Ex: Uint8Array) is a representation of a buffer (ArrayBuffer).
const hexStringToByteArray = (hex) => {
  const a = [];
  for (let i = 0, len = hex.length; i < len; i += 2) {
    a.push(parseInt(hex.substr(i, 2), 16));
  }
  const byteArray = new Uint8Array(a);
  return byteArray;
};

const byteArrayToBaseN = ({ base = 'utf8', byteArray }) => Buffer.from(byteArray).toString(base);

const xOrCombinationFrom2EqualLengthBuffers = (buff1, buff2) => {
  const xOrdByteArray = Uint8Array.from(buff1, (v, i) => v ^ buff2[i]); // eslint-disable-line no-bitwise
  return xOrdByteArray;
};

export default {
  hexStringToByteArray,
  byteArrayToBaseN,
  xOrCombinationFrom2EqualLengthBuffers
};

