/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt='DSRI'
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('introduction')}>
              Get started
            </a>
            <a href={this.docUrl('deploy-from-template')}>
              Start applications
            </a>
            <a href={this.docUrl('openshift-install')}>
              Install the CLI
            </a>
          </div>

          <div>
            <h5>Source</h5>
            {/* <a href={`${this.props.config.baseUrl}blog`}>Blog</a> */}
            {/* <a
              className="github-button"
              href={this.props.config.repoUrl}
              // data-icon="octicon-star"
              data-count-href={`${this.props.config.repoUrl}/stargazers`}
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              DSRI-documentation
            </a> */}
            <a href={this.props.config.repoUrl}
              target="_blank"
              aria-label="Star this project on GitHub">
              <img alt="GitHub stars" src="https://img.shields.io/github/stars/MaastrichtU-IDS/dsri-documentation?label=DSRI-documentation&style=social"/>
            </a>
            <h5>Issues</h5>
            <a href="https://github.com/MaastrichtU-IDS/dsri-documentation/issues"
              target="_blank" aria-label="GitHub issues">
              <img alt="GitHub issues" src="https://img.shields.io/github/issues/MaastrichtU-IDS/dsri-documentation?label=dsri-documentation"/>
            </a>
          </div>

          <div>
            <h5>Community</h5>
            <a href="https://dsri.slack.com"
              target="_blank" rel="noreferrer noopener" aria-label="Chat on Slack">
              <img alt="Chat on Slack" 
              src="https://img.shields.io/badge/Chat%20on-Slack-blueviolet"/>
            </a>
            <a href="https://twitter.com/MaastrichtU"
              target="_blank" rel="noreferrer noopener" aria-label="Follow on Twitter">
              <img alt="Follow on Twitter"
              src="https://img.shields.io/twitter/follow/MaastrichtU?style=social"/>
            </a>
            <a href="https://www.facebook.com/maastricht.university/"
              target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
            {/* <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/"
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a> 
            <a
              href="https://twitter.com/um_ids"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )} */}
          </div>
        </section>

        {/* <a
          href="https://opensource.facebook.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={`${this.props.config.baseUrl}img/oss_logo.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a> */}
        <section className="copyright">
          <div style={{marginBottom: '10px'}}>
            We track page views and users demographics using Google Analytics to improve our users experience. <a href="https://policies.google.com/technologies/partner-sites">See how Google uses collected informations</a>.<br/>
            You can prevent Google Analytics tracking by enabling <a href="https://blog.mozilla.org/blog/2019/06/04/firefox-now-available-with-enhanced-tracking-protection-by-default/">Firefox Tracking Protection</a>, installing <a href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=fr">uBlock Origin add-on</a>, or using the official <a href='https://tools.google.com/dlpage/gaoptout/'>Google Analytics Opt-out add-on</a>.
          </div>
          <div>
            <a rel="license" href="https://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution 4.0 International license" target="_blank">
              <img src="/dsri-documentation/img/cc-by.svg" alt="cc by license"/> 
            </a>
          </div>
          {this.props.config.copyright}
        </section>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-172146359-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-172146359-1');
        </script> */}
      </footer>
    );
  }
}

module.exports = Footer;