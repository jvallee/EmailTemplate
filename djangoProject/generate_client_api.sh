#!/bin/bash
set -e

echo hello

rm swagger.json

python3 manage.py generate_swagger swagger.json

#rm -rf src/util/gen/api && openapi-generator generate -i ../djangoProject/swagger.json --generator-name typescript-axios --type-mappings object=any -o src/util/gen/api --config api.json && cd src/util/gen/api && npm install && npm run build && npm audit fix

cd ../frontend  && npm run api

echo goodbye