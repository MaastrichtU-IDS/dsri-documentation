#!/bin/bash

# Publishing is usually done automatically by a GitHub Action
# You need to use SSH with git authentication for this script to work

git push
cd website/
yarn install
API_URL=https://api.dsri.maastrichtuniversity.nl GIT_USER=MaastrichtU-IDS USE_SSH=true yarn deploy
git pull
