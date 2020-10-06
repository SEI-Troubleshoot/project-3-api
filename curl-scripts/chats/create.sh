#!/bin/bash

API="http://localhost:4741"
URL_PATH="/chatRoom/"

curl "${API}${URL_PATH}${ID}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "chats": {
      "content": "'"${CONTENT}"'"
    }
  }'

echo
