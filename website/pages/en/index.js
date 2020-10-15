/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle" style={{color: siteConfig.colors.secondaryColor}}>
        {siteConfig.title}
        <small style={{color: siteConfig.colors.primaryColor}}>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/openshift-um-logo.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('introduction')}>Get started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Sustainable and scalable Data Science for everyone</h2>
        <MarkdownBlock>
          Access the [Data Science Research Infrastructure](/dsri-documentation/docs/access-dsri) on the UM network
        </MarkdownBlock>
        <MarkdownBlock>
          [Deploy popular Data Science applications](/dsri-documentation/docs/deploy-from-template) from the DSRI web interface in pods
        </MarkdownBlock>
        <MarkdownBlock>
          Or start your [custom application from a Docker image](/dsri-documentation/docs/deploy-from-docker)
        </MarkdownBlock>
        <MarkdownBlock>
          Access your application via the generated URL
        </MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block>
        {[
          {
            content:
              '[OpenShift](https://www.openshift.com/) and [Kubernetes](https://kubernetes.io/) allow you to run any [Docker](https://www.docker.com/) container in parallel on multiple nodes'
              + '\n \n[OpenShift](https://www.openshift.com/) also enables you to leverage the power of [MapReduce](https://mapr.com/products/product-overview/mapreduce/) jobs',
            image: `${baseUrl}img/openshift_kubernetes_docker.png`,
            imageAlign: 'left',
            title: 'Run jobs in parallel on multiple nodes',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="dark">
        {[
          {
            content:
              'Run your experiments on the DSRI servers\n \nRelieve your laptop from resource consuming workloads',
            image: `${baseUrl}img/undraw_server_cluster.svg`,
            imageAlign: 'right',
            title: 'Get the computing power you need',
          },
        ]}
      </Block>
    );

    // Top page features
    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'We use [MapR](https://mapr.com/) FileSystem to securely store and access your file',
            image: `${baseUrl}img/mapr_logo.png`,
            imageAlign: 'top',
            title: 'A distributed filesystem',
          },
          {
            content: '[Kubernetes](https://kubernetes.io/) allows you to run containers started from [Docker](https://www.docker.com/) images',
            image: `${baseUrl}img/Kubernetes.png`,
            imageAlign: 'top',
            title: 'To run anything',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <div>
      <Block background="dark">
        {[
          {
            content:
              'Data stored on the [MapR](https://mapr.com/) FileSystem are replicated over multiple nodes for high availability and fault tolerance\n \n' + 
              'The DSRI also works on offering a long term storage solution with [iRODS](https://irods.org/) [DataHub](https://portal.datahubmaastricht.nl/)',
            image: `${baseUrl}img/DataHub_irods.png`,
            imageAlign: 'right',
            title: 'Securely store your data',
          },
        ]}
      </Block>
    </div>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2><a href={pageUrl('users')}>Who uses the Data Science Research Infrastructure?</a></h2>
          <div className="logos">{showcase}</div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
