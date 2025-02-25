#!/bin/sh
set -e

echo "Backend mode: $MEDUSA_WORKER_MODE"
yes | cp -rf /app/mercur/apps/backend/.env.k8s /app/mercur/apps/backend/.env

if [ "$MEDUSA_WORKER_MODE" = 'worker' ]; then
    yarn run start 
else
    yarn predeploy && yarn run start
fi