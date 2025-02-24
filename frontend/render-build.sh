#!/bin/sh

# Generate environment.prod.ts file
echo "Generating environment.prod.ts file..."
cat <<EOF > src/environments/environment.prod.ts
export const environment = {
  production: true,
  BASE_URL: "$BASE_URL"
};
EOF

# Install dependencies and build the Angular app
echo "Installing dependencies..."
npm install

echo "Building Angular app..."
npm run build -- --configuration production

