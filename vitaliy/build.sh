npm run docusaurus build

aws s3 sync --acl public-read build/ s3://dev.embrace.io-docs/docs/

npm run serve
