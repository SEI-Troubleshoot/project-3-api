  #!/bin/bash

  API="http://localhost:4741"
  URL_PATH="/chatRoom"

  curl "${API}${URL_PATH}" \
    --include \
    --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${TOKEN}" \
    --data '{
      "room": {
        "chatName": "'"${NAME}"'",
        "membersId": "'"${MEM}"'",
        "admin": "'"${TOKEN}"'"
      }
    }'

  echo
