#!/bin/bash

# Create environment.ts file
echo "Creating environment.ts file..."
cat <<EOF > src/environments/environment.ts
export const environment = {
  production: false,
  BASE_URL: "$BASE_URL"
};
EOF

# Create environment.prod.ts file
echo "Creating environment.prod.ts file..."
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