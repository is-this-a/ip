# Is this a GitHub IP?

[![Node.js CI](https://github.com/is-this-a/ip/workflows/Node.js%20CI/badge.svg)](https://github.com/is-this-a/ip/actions?query=workflow%3A%22Node.js+CI%22)

A little tool for checking if an IP is within GitHub's published IP ranges.

## Usage

Head over to <https://is-this-a.github.io/ip/> to try it out.

Paste in an IP address to check if it's in GitHub's published IP ranges.

This tool fetches the data from [GitHub's API](https://help.github.com/articles/about-github-s-ip-addresses/) and uses the power of your computer to tell you if an IP you put in is in those computer-friendly ranges.

## Building

This tool is written in plain, modern JavaScript (it uses `fetch`!) and packaged using the [Parcel](https://parceljs.org) bundler.

To run it locally, check out a copy, run `yarn install` and then `yarn start`, and the site will run on <localhost:1234>.

Building for release is simple too, make sure you've `yarn install`ed and then run `yarn build`.

Putting it all together, you can run `yarn deploy` to build and push the compiled version up to GitHub Pages!
