import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const prismIncludeLanguages = (PrismObject) => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: {prism: {additionalLanguages = []} = {}},
    } = siteConfig;
    window.Prism = PrismObject;
    additionalLanguages.forEach((lang) => {
      require(`prismjs/components/prism-${lang}`); // eslint-disable-line
    });
    delete window.Prism;
  }
};

export default prismIncludeLanguages;
