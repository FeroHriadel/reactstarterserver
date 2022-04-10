# !!!!!!!!!!!!!!!!!!!!!!!!!
# THIS APP IS JUST BEING BUILT
## It might take a week or three to finish
# !!!!!!!!!!!!!!!!!!!!!!!!!



# REACT STARTER TEMPLATE (SERVER)

## What is this?
A starter template that gives you some features that almost all apps have so you can save time coding. This is the server that complements the client app that you can find at: https://github.com/FeroHriadel/reactstarterclient.git

## Features
- Sign up/in/out: JWT, password hashing
- Protected routes - user routes/admin routes (Authorization Bearer JWT-token)
- Image upload (Cloudinary)
- Stores items in DB. Item has: title, description, image, category, tags. You can change it into anything else you need (product, employee...)
- emails (Sendinblue)

## How to run
1. git clone https://github.com/FeroHriadel/reactstarterserver.git
2. npm install
3. You'll need a Cloudinary account, Sendinblue account, and MongoDB account.
4. In the root create: .env file with the following variables:
- PORT=5000
- NODE_ENV=development
- CLIENT_URL=http://localhost:3000
- MONGO_URI=mongodb+srv://< YOUR MONGODB USERNAME >:< YOUR MONGODB PASSWORD >@cluster0.n...
- JWT_SECRET=YourJWTSecretMakeItLongAndWithNumbers123
- ...(COMPLETE LATER)
5. npm run dev

## Technologies:
- NodeJS/Express
- MongoDB
- Sendinblue
- Cloudinary

