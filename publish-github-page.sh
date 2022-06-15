#!/bin/bash
git push
cd website/
yarn install
API_URL=https://api.dsri.maastrichtuniversity.nl GIT_USER=MaastrichtU-IDS USE_SSH=true yarn deploy
git pull
