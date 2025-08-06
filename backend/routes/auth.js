/* ******************************************
 * Auth Routes
 * This file defines authentication-related endpoints
 *******************************************/

// Import Express router
const express = require('express')
const router = express.Router()
const { requiresAuth } = require('express-openid-connect')

/* ******************************************
 * Authentication Routes
 *******************************************/

// Root route - shows login status
// req.oidc.isAuthenticated() is provided from the auth middleware
router.get('/', (req, res) => {
	const loginStatus = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'

	res.status(200).json({
		success: true,
		message: 'Authentication status retrieved',
		data: {
			isAuthenticated: req.oidc.isAuthenticated(),
			status: loginStatus
		}
	})
})

// Profile route - requires authentication
router.get('/profile', requiresAuth(), (req, res) => {
	try {
		res.status(200).json({
			success: true,
			message: 'User profile retrieved successfully',
			data: {
				user: req.oidc.user
			}
		})
	} catch (error) {
		console.error('❌ Error getting user profile:', error)
		res.status(500).json({
			success: false,
			message: 'Error retrieving user profile',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
})

/* ******************************************
 * Export Router
 *******************************************/
module.exports = router
