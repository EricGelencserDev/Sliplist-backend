'use strict';
const crypto = require('crypto')
const uuid = require('uuid/v1')

module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
				validate:{
					isEmail: true
			}
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		encryptedPassword: {
			type: DataTypes.STRING,
			allowNull: false
		},
		authToken: {
			type: DataTypes.STRING
		},
		authTokenExpiration: {
			type: DataTypes.DATE
		},
		salt: {
			type: DataTypes.STRING
		},
	},

{
	setterMethods:{
		password(value){
		if(value){
		const salt = uuid();
			this.setDataValue('salt', salt)
			const hash = this.encrypt(value);
			this.setDataValue('encryptedPassword', hash)
		}
	}
},
	instanceMethods:{
		toJSON(){
			return {
				id: this.get('id'),
				firstName: this.get('firstName'),
				lastName: this.get('lastName'),
				email: this.get('email'),
				authToken: this.get('authToken'),
				authTokenExpiration: this.get('authTokenExpiration')
		}
	},
		encrypt(value){
			const salt = this.get('salt');
				return crypto.createHmac('sha512' , salt)
					.update(value)
					.digest('hex')
					},
					setAuthToken(){
					const token = uuid()
					const expiration = new Date()
					expiration.setMonth(expiration.getMonth() + 1)
					this.setDataValue('authToken', token)
					this.setDataValue('authTokenExpiration', expiration)

	},
		verifyPassword(unverifiedPassword) {
			const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword);
				return encryptedUnverifiedPassword === this.get('encryptedPassword')
				}
		},
	hooks: {
			beforeCreate: function(user, options) {
			user.setAuthToken()
			}
		}
	});
	return User;
};
