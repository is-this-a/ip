import CIDRMatcher from 'cidr-matcher';
import arrayToSentence from 'array-to-sentence';

const NAÏVE_ADDRESS_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

document.addEventListener('DOMContentLoaded', () => {
  const ipInput = document.getElementById('ip');
  const resultOutput = document.getElementById('result');

  let checkIp;

  const errorHandler = () => {
    ipInput.value = '⁉️';
    ipInput.disabled = true;
    resultOutput.innerText = 'The GitHub API seems to be down! Try again later.';
  };

  fetch('https://api.github.com/meta')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      errorHandler();
    })
    .catch(errorHandler)
    .then((jsonData) => {
      const ipGroups = {};

      Object.keys(jsonData).sort().forEach((name) => {
        // discard non-array items
        if (Array.isArray(jsonData[name])) {
          ipGroups[name] = (
            new CIDRMatcher(jsonData[name].map((ip) => (
              /* CIDRMatcher now requires CIDR notation for all IPs,     *
               * so we whack `/32` on the end of any which don't already */
              ip.indexOf('/') !== -1
                ? ip
                : `${ip}/32`
            )))
          );
        }
      });

      checkIp = (ipAddress) => (
        Object.keys(ipGroups)
          .filter((name) => ipGroups[name].contains(ipAddress))
      );

      update();
    });

  const update = () => {
    const value = ipInput.value.trim();

    if (!value) {
      resultOutput.innerText = 'Paste or type an IP address to find out!';
      return;
    }

    if (!NAÏVE_ADDRESS_REGEX.test(ipInput.value)) {
      if (resultOutput.innerText !== 'Paste or type an IP address to find out!') {
        resultOutput.innerText = 'This doesnʼt look like an IP address!';
      }

      return;
    }

    const matches = checkIp(value);

    if (matches.length < 1) {
      resultOutput.innerText = 'No!';
      return;
    }

    resultOutput.innerText = `Yep! Thatʼs an address GitHub use for ${arrayToSentence(matches)}!`;
  };

  ipInput.addEventListener('input', update);
  ipInput.addEventListener('keydown', (event) => {
    if (!ipInput.value && ((event.key && event.key === 'Enter') || event.keyCode === 13)) {
      ipInput.value = ipInput.getAttribute('placeholder');
      update();
    }
  });
});
