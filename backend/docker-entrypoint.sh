#!/bin/sh
pwd
node -v
npm -v

ls 

rm -rf node_modules package-lock.json

npm install
if [ $? -ne 0 ]; then
  echo "❌ npm install failed!"
  exit 1
fi
echo "✅ npm install completed successfully!"

echo "🔧 Running DB init..."
#npm run init-db
npm run init-db
if [ $? -ne 0 ]; then
  echo "❌ DB initialization failed!"
  exit 1
fi
echo "✅ DB initialized successfully!"

echo "🚀 Starting app..."
npm run start
echo "✅ App started successfully!"
