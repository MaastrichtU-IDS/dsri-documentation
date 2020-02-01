#!/bin/bash
git push
cd website/
yarn install
yarn build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true yarn run publish-gh-pages
git pull
