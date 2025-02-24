#!/bin/sh

echo "Generating environment.prod.ts file..."
cat <<EOF > src/environments/environment.prod.ts
export const environment = {
  production: true,
  BASE_URL: "$BASE_URL"
};
EOF

echo "Building Angular app..."
npm install
npm run build -- --prod
