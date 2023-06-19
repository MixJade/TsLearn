npm run docs:build
cd ./docs/.vuepress/dist
git init
git add .
git commit -m "MixJade"
git branch -M main
git remote add origin git@github.com:MixJade/MixJade.github.io.git
git push -f origin main