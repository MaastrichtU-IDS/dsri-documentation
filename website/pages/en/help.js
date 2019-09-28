/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more using the [documentation.](${docUrl(
        'getstarted',
      )})`,
      title: 'Browse the Docs',
    },
    {
      content: 'Browse and submit [issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) or [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) to fix or improve the documentation.',
      title: 'GitHub',
    },
    {
      content: "Feel free to [contact](mailto:vincent.emonet@maastrichtuniversity.nl) the main maintainers if you have any questions.",
      title: 'Contact us',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>If you need help or have questions about the Data Science Research Infrastructure, try one of the mechanisms above.</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
