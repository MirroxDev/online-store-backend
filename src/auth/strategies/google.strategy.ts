import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
			callbackURL:
				configService.getOrThrow('SERVER_URL') +
				'/auth/google/callback',
			scope: ['email', 'profile']
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	): Promise<any> {
		const { displayName, emails, photos } = profile

		if (!emails || !emails[0] || !photos || !photos[0]) {
			return new Error('Email or photo not found in Google profile')
		}

		const user = {
			email: emails[0].value,
			name: displayName,
			picture: photos[0].value
		}

		done(null, user)
	}
}
