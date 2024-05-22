#!/bin/bash

for image in $(cd images && ls); do
  echo "$image"
  aws --endpoint-url http://localhost:9000 s3 cp images/$image s3://threadly-dev

done