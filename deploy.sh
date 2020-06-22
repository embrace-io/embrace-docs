#!/bin/bash
BRANCH=$1
BUCKET=$2

echo "deploying $BRANCH into $BUCKET"
/home/travis/.local/bin/aws s3 sync --acl public-read --delete public/ s3://$BUCKET

