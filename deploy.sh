#!/bin/bash

# PRODUCTION

git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 start "yarn run start:prod" --name=Farm-Fresh-SPA


# agar mavjud bo‘lsa — restart, mavjud bo‘lmasa — start
# pm2 describe Farm-Fresh-SPA > /dev/null
# if [ $? -eq 0 ]; then
#   pm2 restart Farm-Fresh-SPA
# else
#   pm2 start "yarn run start:prod" --name=Farm-Fresh-SPA
# fi


# DEVELOPMENT

# git reset --hard
# git checkout develop
# git pull origin develop

# npm i
# pm2 start "npm run start:dev" --name=Farm-Fresh