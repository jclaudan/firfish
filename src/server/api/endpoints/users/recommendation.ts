const ms = require('ms');
import $ from 'cafy';
import User, { pack, ILocalUser } from '../../../../models/user';
import { getFriendIds } from '../../common/get-friends';
import Mute from '../../../../models/mute';
import * as request from 'request-promise-native';
import config from '../../../../config';

export const meta = {
	desc: {
		'ja-JP': 'おすすめのユーザー一覧を取得します。'
	},

	requireCredential: true,

	kind: 'account-read'
};

export default (params: any, me: ILocalUser) => new Promise((res, rej) => {
	main(params, me).then(r => res(r), e => rej(e));
});

async function main(params: any, me: ILocalUser) {
	let result = [] as any[];

	if (config.user_recommendation && config.user_recommendation.external) {
		result = await getExternal(params, me);
	}

	if (result.length === 0) {
		result = await getInternal(params, me);
	}

	return result;
}

async function getExternal(params: any, me: ILocalUser) {
	const userName = me.username;
	const hostName = config.hostname;
	const limit = params.limit || 3;
	const offset = params.offset || 0;
	const timeout = config.user_recommendation.timeout || 20000;
	const engine = config.user_recommendation.engine;

	const url = engine
		.replace('{{host}}', hostName)
		.replace('{{user}}', userName)
		.replace('{{limit}}', limit)
		.replace('{{offset}}', offset);

	const result = await request({
		url: url,
		timeout: timeout,
		json: true,
		followRedirect: true,
		followAllRedirects: true
	});

	return result;
}

async function getInternal(params: any, me: ILocalUser) {
	// Get 'limit' parameter
	const [limit = 10, limitErr] = $.num.optional.range(1, 100).get(params.limit);
	if (limitErr) throw 'invalid limit param';

	// Get 'offset' parameter
	const [offset = 0, offsetErr] = $.num.optional.min(0).get(params.offset);
	if (offsetErr) throw 'invalid offset param';

	// ID list of the user itself and other users who the user follows
	const followingIds = await getFriendIds(me._id);

	// ミュートしているユーザーを取得
	const mutedUserIds = (await Mute.find({
		muterId: me._id
	})).map(m => m.muteeId);

	const users = await User
		.find({
			_id: {
				$nin: followingIds.concat(mutedUserIds)
			},
			isLocked: false,
			$or: [{
				lastUsedAt: {
					$gte: new Date(Date.now() - ms('7days'))
				}
			}, {
				host: null
			}]
		}, {
			limit: limit,
			skip: offset,
			sort: {
				followersCount: -1
			}
		});

	// Serialize
	return await Promise.all(users.map(async user =>
		await pack(user, me, { detail: true })));
}
