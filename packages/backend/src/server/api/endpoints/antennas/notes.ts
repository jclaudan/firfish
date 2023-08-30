import define from "../../define.js";
import readNote from "@/services/note/read.js";
import { Antennas, Notes } from "@/models/index.js";
import { redisClient } from "@/db/redis.js";
import { genId, getTimestamp } from "@/misc/gen-id.js";
import { makePaginationQuery } from "../../common/make-pagination-query.js";
import { generateVisibilityQuery } from "../../common/generate-visibility-query.js";
import { generateMutedUserQuery } from "../../common/generate-muted-user-query.js";
import { ApiError } from "../../error.js";
import { generateBlockedUserQuery } from "../../common/generate-block-query.js";

export const meta = {
	tags: ["antennas", "account", "notes"],

	requireCredential: true,

	kind: "read:account",

	errors: {
		noSuchAntenna: {
			message: "No such antenna.",
			code: "NO_SUCH_ANTENNA",
			id: "850926e0-fd3b-49b6-b69a-b28a5dbd82fe",
		},
	},

	res: {
		type: "array",
		optional: false,
		nullable: false,
		items: {
			type: "object",
			optional: false,
			nullable: false,
			ref: "Note",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		antennaId: { type: "string", format: "misskey:id" },
		limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
		sinceId: { type: "string", format: "misskey:id" },
		untilId: { type: "string", format: "misskey:id" },
		sinceDate: { type: "integer" },
		untilDate: { type: "integer" },
	},
	required: ["antennaId"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const antenna = await Antennas.findOneBy({
		id: ps.antennaId,
		userId: user.id,
	});

	if (antenna == null) {
		throw new ApiError(meta.errors.noSuchAntenna);
	}

	const limit = ps.limit + (ps.untilId ? 1 : 0) + (ps.sinceId ? 1 : 0); // untilIdに指定したものも含まれるため+1
	let end = "+";
	if (ps.untilDate) {
		end = ps.untilDate.toString();
	} else if (ps.untilId) {
		end = getTimestamp(ps.untilId).toString();
	}
	let start = "-";
	if (ps.sinceDate) {
		start = ps.sinceDate.toString();
	} else if (ps.sinceId) {
		start = getTimestamp(ps.sinceId).toString();
	}
	const noteIdsRes = await redisClient.xrevrange(
		`antennaTimeline:${antenna.id}`,
		end,
		start,
		"COUNT",
		limit,
	);

	if (noteIdsRes.length === 0) {
		return [];
	}

	const noteIds = noteIdsRes
		.map((x) => x[1][1])
		.filter((x) => x !== ps.untilId && x !== ps.sinceId);

	if (noteIds.length === 0) {
		return [];
	}

	const query = makePaginationQuery(
		Notes.createQueryBuilder("note"),
		ps.sinceId,
		ps.untilId,
		ps.sinceDate,
		ps.untilDate,
	)
		.where("note.id IN (:...noteIds)", { noteIds: noteIds })
		.leftJoinAndSelect("note.reply", "reply")
		.leftJoinAndSelect("note.renote", "renote")
		.andWhere("note.visibility != 'home'");

	generateVisibilityQuery(query, user);
	generateMutedUserQuery(query, user);
	generateBlockedUserQuery(query, user);

	const notes = await query.take(limit).getMany();

	if (notes.length > 0) {
		readNote(user.id, notes);
	}

	return await Notes.packMany(notes, user);
});
