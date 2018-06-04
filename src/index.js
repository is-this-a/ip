import CIDRMatcher from 'cidr-matcher';
import arrayToSentence from 'array-to-sentence';

document.addEventListener('DOMContentLoaded', () => {
  const ipInput = document.getElementById('ip_address');
  const resultOutput = document.getElementById('result');

  let checkIp;

  fetch('https://api.github.com/meta')
    .then((response) => response.json())
    .then((jsonData) => {
      const ipGroups = {};

      Object.keys(jsonData).forEach((name) => {
        // discard non-array items
        if (Array.isArray(jsonData[name])) {
          ipGroups[name] = new CIDRMatcher(jsonData[name]);
        }
      });

      checkIp = (ipAddress) => (
        Object.keys(ipGroups)
          .filter((name) => ipGroups[name].contains(ipAddress))
      );
    });

  ipInput.addEventListener('change', () => {
    const matches = checkIp(ipInput.value);

    console.log(matches);

    if (matches.length < 1) {
      resultOutput.innerText = 'No!';
      return;
    }

    resultOutput.innerText = `Yep! That's an address GitHub use for ${arrayToSentence(matches)}!`;
  });
});
