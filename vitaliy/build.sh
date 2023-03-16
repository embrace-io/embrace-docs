npm run docusaurus build

aws s3 sync --acl public-read build/ s3://embrace-dev-docs/docs/

npm run serve
