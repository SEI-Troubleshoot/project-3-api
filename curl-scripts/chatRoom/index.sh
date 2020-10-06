#!/bin/bash

API="http://localhost:4741"
URL_PATH="/chatRoom"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
