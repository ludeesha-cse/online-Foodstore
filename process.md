## Process

1. Add header

2. List Foods

   1. Create Food model
   2. Create data.ts
   3. Add sample foods
   4. Add images to assets
   5. Create Food service
   6. Create Home component

3. Search bar
   Add method to Food service
   Add search route
   Show search result in Home component
   Generate search component
   Add to home component
   Add ts
   Add html
   Add css

4. Tags Bar

   1. Create Tag model
   2. Add sample tags to data.ts
   3. Food service
      1. Add get all tags method
      2. Add get all foods by tag method
   4. Add tags route
   5. Show tag result in Home component
   6. Generate Tags component
      1. Add to home component

5. Food Page

   1. Add method to food service
   2. Generate Food Page component
      1. Add Route(Rouuter link to the components and app-routing.module)

6. Cart Page

   1. Create CartItem Model
   2. Create Cart Model
   3. Generate Cart service
   4. Add to Cart Button in Food Page
   5. Generate Cart page component
      1. Add Route

7. Not Found!

   1. Generate Component
   2. Add To Pages
      1. Home Page
      2. Food Page
      3. Cart Page

8. Connect To Backend

   1. Create backend folder
   2. npm init
   3. npm install typescript
   4. Create tsconfig.json
   5. Create .gitignore
   6. Copy data.ts to backend/src
   7. npm install express cors
   8. Create server.ts
      1. install @types
      2. Add Apis
   9. npm install nodemon ts-node --save-dev
   10. Add urs.ts to frontend
   11. Add HttpClient module
   12. Update food service

9. Login Page

   1. Generate Component
      1. Add to routes
      2. Add ts
      3. Add html
      4. Import Reactive Forms Module
      5. Add Css
   
   2. Add Login Api
      1. Use json
      2. Add jsonwebtoken
      3. Test Using Postman

11. Connect Login API To MongoDB Atlas
   1. Moving Apis into routers
   2. Create MongoDB Atlas
   3. Create .env file
   4. Install
      1. mongoose
      2. dotenv
      3. bcryptjs
      4. express-async-handler
   5. Connect to MongoDB Atlas
   6. Use MongoDB instead of data.ts in apis

12. Register User
   1. Add Register api
   2. Add Register service method
   3. Add Register link
   4. Add Register Component

13. Loading!
   1. Add Image
   2. Add Component
   3. Add Service
   4. Add Interceptor

14. Checkout Page

   1. Create Order Model
   2. Create Checkout Page Component
      1. Add To Router
   3. Add User to User Service
   4. Add Cart to Cart Service
   5. Create Order Items List Component
   6. Adding Map To The Checkout Page
      1. Add Leaflet npm package
         1. Add @types/leaflet
         2. Add Css to angular.json
      2. Add AddressLatLng to Order Model
      3. Create Map component
         1. Add to checkout page
         2. Add TS
            1. Change app-map selector to map
         3. Add Html
         4. Add CSS
      4. Add Auth Guard
   7. Save Order
      1. Add Order Model
      2. Add Order Status Enum
      3. Add Auth Middleware
      4. Add Order Router
         1. Add create API
      5. Add Order Urls to urls.ts
      6. Add Order Service
         1. Add create Method
      7. Add Auth Interceptor 
