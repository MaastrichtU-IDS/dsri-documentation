#!/bin/bash
git push
cd website/
yarn install
GIT_USER=MaastrichtU-IDS USE_SSH=true yarn deploy
git pull
