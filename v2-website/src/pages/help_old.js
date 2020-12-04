import React from 'react';
import Layout from '@theme/Layout';

function Help() {
  return (
    <Layout title="Help">
      <header className="container">
        <h1>Need help?</h1>
      </header>
      <main>
        <div className="container" style={{marginTop: '20px'}}>
          <p>If you need help or have questions about the Data Science Research Infrastructure, try one of the mechanisms above.</p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              fontSize: '20px',
            }}>
            <p>
              <h2>Join the DSRI Slack</h2>
              <a href="https://dsri.slack.com"
                target="_blank" rel="noreferrer noopener" aria-label="Chat on Slack">
                <img alt="Chat on Slack" 
                src="https://img.shields.io/badge/Chat%20on-Slack-blueviolet"/>
              </a>
              <p>Contact us at <br/><a href="mailto:dsri-support-l@maastrichtuniversity.nl">dsri-support-l@maastrichtuniversity.nl</a><br/> to get an invitation to the DSRI Slack channel 💬</p>
            </p>
            <p>
              <h2>Submit issues</h2>
              <a href="https://github.com/MaastrichtU-IDS/dsri-documentation/issues"
                target="_blank" aria-label="GitHub issues">
                <img alt="GitHub issues" src="https://img.shields.io/github/issues/MaastrichtU-IDS/dsri-documentation?label=dsri-documentation"/>
              </a>
              <p>Submit <a href="https://github.com/MaastrichtU-IDS/dsri-documentation/issues">issues</a> 
              or <a href="https://github.com/MaastrichtU-IDS/dsri-documentation/pulls">pull requests</a>
              to request new features on the DSRI or improve the documentation 🔧</p>
            </p>
            <p>
              <h2>Contact us</h2>
              Feel free to contact <br/><a href="mailto:dsri-support-l@maastrichtuniversity.nl">dsri-support-l@maastrichtuniversity.nl</a><br/>if you have any questions 📬
            </p>
          </div>

          {/* <GridBlock contents={supportLinks} layout="threeColumn" /> */}
          <h1>The DSRI support team</h1>
          <p>Contact us at <b><a href="mailto:dsri-support-l@maastrichtuniversity.nl">dsri-support-l@maastrichtuniversity.nl</a></b>.</p>
          <p>From the <a href="https://maastrichtuniversity.nl/ids">Institute of Data Science</a> (IDS) and <a href="https://maastrichtuniversity.nl/icts">Information and Communications Technology Services</a> (ICTS) at <a href="https://maastrichtuniversity.nl">Maastricht University</a>.</p>
          <ul style={{listStyle: 'none'}}>
            <li><b>Vincent Emonet</b> - Data Science engineer at <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
            <li><b>Binosha Weerarathna</b> - Data Science engineer at <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
            <li><b>Brouwers Marcel</b> - System, Security and Network engineer at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
            <li><b>Sebastiaam Nijhuis</b> - System, Security and Network engineer at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
            <li><b>Maurice Steyvers</b> - ICT manager at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
            <li><b>Michel Dumontier</b> - Project investigator from <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export default Help;




// const React = require('react');

// const CompLibrary = {
//   Container: props => <div {...props}></div>,
//   GridBlock: props => <div {...props}></div>,
//   MarkdownBlock: props => <div {...props}></div>
// };

// import Layout from "@theme/Layout";

// const Container = CompLibrary.Container;
// const GridBlock = CompLibrary.GridBlock;

// function Help(props) {
//   const {config: siteConfig, language = ''} = props;
//   const {baseUrl, docsUrl} = siteConfig;
//   const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
//   const langPart = `${language ? `${language}/` : ''}`;
//   const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  // const supportLinks = [
  //   {
  //     content: `<a href="https://dsri.slack.com"
  //       target="_blank" rel="noreferrer noopener" aria-label="Chat on Slack">
  //       <img alt="Chat on Slack" 
  //       src="https://img.shields.io/badge/Chat%20on-Slack-blueviolet"/>
  //     </a>
  //     <p>Contact us at <br/>[dsri-support-l@maastrichtuniversity.nl](mailto:dsri-support-l@maastrichtuniversity.nl)<br/> to get an invitation to the DSRI Slack channel 💬</p>`,
  //     title: 'Join the DSRI Slack',
  //   },
  //   {
  //     content: `<a href="https://github.com/MaastrichtU-IDS/dsri-documentation/issues"
  //       target="_blank" aria-label="GitHub issues">
  //       <img alt="GitHub issues" src="https://img.shields.io/github/issues/MaastrichtU-IDS/dsri-documentation?label=dsri-documentation"/>
  //     </a>
  //     <p>Submit [issues](https://github.com/MaastrichtU-IDS/dsri-documentation/issues) or [pull requests](https://github.com/MaastrichtU-IDS/dsri-documentation/pulls) 
  //     to request new features on the DSRI or improve the documentation 🔧</p>`,
  //     title: 'Submit issues',
  //   },
  //   {
  //     content: "Feel free to contact <br/>[dsri-support-l@maastrichtuniversity.nl](mailto:dsri-support-l@maastrichtuniversity.nl)<br/>if you have any questions 📬",
  //     title: 'Contact us',
  //   },
  // ];

//   return (
//     <div className="docMainWrapper wrapper">
//       <Container className="mainContainer documentContainer postContainer">
//         <div className="post">
//           <header className="postHeader">
//             <h1>Need help?</h1>
//           </header>
//           <p>If you need help or have questions about the Data Science Research Infrastructure, try one of the mechanisms above.</p>
//           <GridBlock contents={supportLinks} layout="threeColumn" />
//           <h1>The DSRI support team</h1>
//           <p>Contact us at <b><a href="mailto:dsri-support-l@maastrichtuniversity.nl">dsri-support-l@maastrichtuniversity.nl</a></b>.</p>
//           <p>From the <a href="https://maastrichtuniversity.nl/ids">Institute of Data Science</a> (IDS) and <a href="https://maastrichtuniversity.nl/icts">Information and Communications Technology Services</a> (ICTS) at <a href="https://maastrichtuniversity.nl">Maastricht University</a>.</p>
//           <ul style={{listStyle: 'none'}}>
//             <li><b>Vincent Emonet</b> - Data Science engineer at <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
//             <li><b>Binosha Weerarathna</b> - Data Science engineer at <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
//             <li><b>Brouwers Marcel</b> - System, Security and Network engineer at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
//             <li><b>Sebastiaam Nijhuis</b> - System, Security and Network engineer at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
//             <li><b>Maurice Steyvers</b> - ICT manager at <a href="https://maastrichtuniversity.nl/icts">ICTS</a></li>
//             <li><b>Michel Dumontier</b> - Project investigator from <a href="https://maastrichtuniversity.nl/ids">IDS</a></li>
//           </ul>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default props => <Layout><Help {...props} /></Layout>;
