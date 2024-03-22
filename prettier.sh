# prettier.sh
#/bin/sh
tmpfileTwig=test.liquid
cat - >$tmpfileTwig 
npx prettier --log-level silent --write $tmpfileTwig --plugin=@shopify/prettier-plugin-liquid 
cat $tmpfileTwig
# rm -f $tmpfileTwi