const express = require('express')
const path = require('path')
const { auth } = require('express-openid-connect')
const env = require('dotenv').config()
const app = express()

// Auth0 configuration
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: process.env.BASE_URL,
	clientID: process.env.CLIENT_ID,
	issuerBaseURL: process.env.ISSUER_BASE_URL
}

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Only use auth in production, not in tests
if (process.env.NODE_ENV !== 'test') {
	app.use(auth(config))
}

const db = require('./data/db')
const setupSwagger = require('./swagger')
const indexRoutes = require('./routes/index')

// Only initialize database if not in test environment
if (process.env.NODE_ENV !== 'test') {
	db.intializeDb((err) => {
		if (err) {
			console.error('Failed to initialize database:', err)
			process.exit(1)
		} else {
			console.log('Database initialized successfully')
		}
	})
}

setupSwagger(app)

/* ---------- routes ---------- */
app.use('/', indexRoutes)

/* ---------- middleware ---------- */
app.use(express.static(path.join(__dirname, '../frontend/public'))) // serve frontend static files

/* ---------- start server ---------- */
const PORT = process.env.PORT || 3000

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

module.exports = app
