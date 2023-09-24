export class Init1000000000000 {
	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TYPE "log_level_enum" AS ENUM('error', 'warning', 'info', 'success', 'debug')`,
		);
		await queryRunner.query(
			`CREATE TABLE "log" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "domain" character varying(64) array NOT NULL DEFAULT '{}'::varchar[], "level" "log_level_enum" NOT NULL, "worker" character varying(8) NOT NULL, "machine" character varying(128) NOT NULL, "message" character varying(1024) NOT NULL, "data" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8e4eb51a35d81b64dda28eed0a" ON "log" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8cb40cfc8f3c28261e6f887b03" ON "log" ("domain") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_584b536b49e53ac81beb39a177" ON "log" ("level") `,
		);
		await queryRunner.query(
			`CREATE TABLE "drive_folder" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "name" character varying(128) NOT NULL, "userId" character varying(32), "parentId" character varying(32), CONSTRAINT "PK_7a0c089191f5ebdc214e0af808a" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_02878d441ceae15ce060b73daf" ON "drive_folder" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f4fc06e49c0171c85f1c48060d" ON "drive_folder" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_00ceffb0cdc238b3233294f08f" ON "drive_folder" ("parentId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "drive_file" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32), "userHost" character varying(128), "md5" character varying(32) NOT NULL, "name" character varying(256) NOT NULL, "type" character varying(128) NOT NULL, "size" integer NOT NULL, "comment" character varying(512), "properties" jsonb NOT NULL DEFAULT '{}', "storedInternal" boolean NOT NULL, "url" character varying(512) NOT NULL, "thumbnailUrl" character varying(512), "webpublicUrl" character varying(512), "accessKey" character varying(256), "thumbnailAccessKey" character varying(256), "webpublicAccessKey" character varying(256), "uri" character varying(512), "src" character varying(512), "folderId" character varying(32), "isSensitive" boolean NOT NULL DEFAULT false, "isLink" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_43ddaaaf18c9e68029b7cbb032e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c8dfad3b72196dd1d6b5db168a" ON "drive_file" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_860fa6f6c7df5bb887249fba22" ON "drive_file" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_92779627994ac79277f070c91e" ON "drive_file" ("userHost") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_37bb9a1b4585f8a3beb24c62d6" ON "drive_file" ("md5") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a40b8df8c989d7db937ea27cf6" ON "drive_file" ("type") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_d85a184c2540d2deba33daf642" ON "drive_file" ("accessKey") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_e74022ce9a074b3866f70e0d27" ON "drive_file" ("thumbnailAccessKey") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_c55b2b7c284d9fef98026fc88e" ON "drive_file" ("webpublicAccessKey") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e5848eac4940934e23dbc17581" ON "drive_file" ("uri") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_bb90d1956dafc4068c28aa7560" ON "drive_file" ("folderId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE, "lastFetchedAt" TIMESTAMP WITH TIME ZONE, "username" character varying(128) NOT NULL, "usernameLower" character varying(128) NOT NULL, "name" character varying(128), "followersCount" integer NOT NULL DEFAULT 0, "followingCount" integer NOT NULL DEFAULT 0, "notesCount" integer NOT NULL DEFAULT 0, "avatarId" character varying(32), "bannerId" character varying(32), "tags" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "avatarUrl" character varying(512), "bannerUrl" character varying(512), "avatarColor" character varying(32), "bannerColor" character varying(32), "isSuspended" boolean NOT NULL DEFAULT false, "isSilenced" boolean NOT NULL DEFAULT false, "isLocked" boolean NOT NULL DEFAULT false, "isBot" boolean NOT NULL DEFAULT false, "isCat" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, "isModerator" boolean NOT NULL DEFAULT false, "isVerified" boolean NOT NULL DEFAULT false, "emojis" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "host" character varying(128), "inbox" character varying(512), "sharedInbox" character varying(512), "featured" character varying(512), "uri" character varying(512), "token" character(16), CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9" UNIQUE ("token"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "REL_afc64b53f8db3707ceb34eb28e" UNIQUE ("bannerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4" ON "user" ("updatedAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a27b942a0d6dcff90e3ee9b5e8" ON "user" ("usernameLower") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_fa99d777623947a5b05f394cae" ON "user" ("tags") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3252a5df8d5bbd16b281f7799e" ON "user" ("host") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_be623adaa4c566baf5d29ce0c8" ON "user" ("uri") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_a854e557b1b14814750c7c7b0c" ON "user" ("token") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_5deb01ae162d1d70b80d064c27" ON "user" ("usernameLower", "host") `,
		);
		await queryRunner.query(
			`CREATE TABLE "app" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32), "secret" character varying(64) NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(512) NOT NULL, "permission" character varying(64) array NOT NULL, "callbackUrl" character varying(512), CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_048a757923ed8b157e9895da53" ON "app" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3f5b0899ef90527a3462d7c2cb" ON "app" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f49922d511d666848f250663c4" ON "app" ("secret") `,
		);
		await queryRunner.query(
			`CREATE TABLE "access_token" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "token" character varying(128) NOT NULL, "hash" character varying(128) NOT NULL, "userId" character varying(32) NOT NULL, "appId" character varying(32) NOT NULL, CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_70ba8f6af34bc924fc9e12adb8" ON "access_token" ("token") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_64c327441248bae40f7d92f34f" ON "access_token" ("hash") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9949557d0e1b2c19e5344c171e" ON "access_token" ("userId") `,
		);
		await queryRunner.query(
			`CREATE TYPE "note_visibility_enum" AS ENUM('public', 'home', 'followers', 'specified')`,
		);
		await queryRunner.query(
			`CREATE TABLE "note" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "replyId" character varying(32), "renoteId" character varying(32), "text" text, "name" character varying(256), "cw" character varying(512), "appId" character varying(32), "userId" character varying(32) NOT NULL, "viaMobile" boolean NOT NULL DEFAULT false, "localOnly" boolean NOT NULL DEFAULT false, "renoteCount" smallint NOT NULL DEFAULT 0, "repliesCount" smallint NOT NULL DEFAULT 0, "reactions" jsonb NOT NULL DEFAULT '{}', "visibility" "note_visibility_enum" NOT NULL, "uri" character varying(512), "score" integer NOT NULL DEFAULT 0, "fileIds" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "attachedFileTypes" character varying(256) array NOT NULL DEFAULT '{}'::varchar[], "visibleUserIds" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "mentions" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "mentionedRemoteUsers" text NOT NULL DEFAULT '[]', "emojis" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "tags" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "hasPoll" boolean NOT NULL DEFAULT false, "geo" jsonb DEFAULT null, "userHost" character varying(128), "replyUserId" character varying(32), "replyUserHost" character varying(128), "renoteUserId" character varying(32), "renoteUserHost" character varying(128), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e7c0567f5261063592f022e9b5" ON "note" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_17cb3553c700a4985dff5a30ff" ON "note" ("replyId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_52ccc804d7c69037d558bac4c9" ON "note" ("renoteId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5b87d9d19127bd5d92026017a7" ON "note" ("userId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_153536c67d05e9adb24e99fc2b" ON "note" ("uri") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_51c063b6a133a9cb87145450f5" ON "note" ("fileIds") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_25dfc71b0369b003a4cd434d0b" ON "note" ("attachedFileTypes") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_796a8c03959361f97dc2be1d5c" ON "note" ("visibleUserIds") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_54ebcb6d27222913b908d56fd8" ON "note" ("mentions") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_88937d94d7443d9a99a76fa5c0" ON "note" ("tags") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7125a826ab192eb27e11d358a5" ON "note" ("userHost") `,
		);
		await queryRunner.query(
			`CREATE TABLE "poll_vote" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, "choice" integer NOT NULL, CONSTRAINT "PK_fd002d371201c472490ba89c6a0" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0fb627e1c2f753262a74f0562d" ON "poll_vote" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_66d2bd2ee31d14bcc23069a89f" ON "poll_vote" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_aecfbd5ef60374918e63ee95fa" ON "poll_vote" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_50bd7164c5b78f1f4a42c4d21f" ON "poll_vote" ("userId", "noteId", "choice") `,
		);
		await queryRunner.query(
			`CREATE TABLE "note_reaction" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, "reaction" character varying(128) NOT NULL, CONSTRAINT "PK_767ec729b108799b587a3fcc9cf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_01f4581f114e0ebd2bbb876f0b" ON "note_reaction" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_13761f64257f40c5636d0ff95e" ON "note_reaction" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_45145e4953780f3cd5656f0ea6" ON "note_reaction" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_ad0c221b25672daf2df320a817" ON "note_reaction" ("userId", "noteId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "note_watching" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, "noteUserId" character varying(32) NOT NULL, CONSTRAINT "PK_49286fdb23725945a74aa27d757" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_318cdf42a9cfc11f479bd802bb" ON "note_watching" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b0134ec406e8d09a540f818288" ON "note_watching" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_03e7028ab8388a3f5e3ce2a861" ON "note_watching" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_44499765eec6b5489d72c4253b" ON "note_watching" ("noteUserId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_a42c93c69989ce1d09959df4cf" ON "note_watching" ("userId", "noteId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "note_unread" ("id" character varying(32) NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, "noteUserId" character varying(32) NOT NULL, "isSpecified" boolean NOT NULL, CONSTRAINT "PK_1904eda61a784f57e6e51fa9c1f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_56b0166d34ddae49d8ef7610bb" ON "note_unread" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e637cba4dc4410218c4251260e" ON "note_unread" ("noteId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_d908433a4953cc13216cd9c274" ON "note_unread" ("userId", "noteId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "notification" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "notifieeId" character varying(32) NOT NULL, "notifierId" character varying(32) NOT NULL, "type" character varying(32) NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "noteId" character varying(32), "reaction" character varying(128), "choice" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b11a5e627c41d4dc3170f1d370" ON "notification" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3c601b70a1066d2c8b517094cb" ON "notification" ("notifieeId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "meta" ("id" character varying(32) NOT NULL, "name" character varying(128), "description" character varying(1024), "maintainerName" character varying(128), "maintainerEmail" character varying(128), "announcements" jsonb NOT NULL DEFAULT '[]', "disableRegistration" boolean NOT NULL DEFAULT false, "disableLocalTimeline" boolean NOT NULL DEFAULT false, "disableGlobalTimeline" boolean NOT NULL DEFAULT false, "enableEmojiReaction" boolean NOT NULL DEFAULT true, "useStarForReactionFallback" boolean NOT NULL DEFAULT false, "langs" character varying(64) array NOT NULL DEFAULT '{}'::varchar[], "hiddenTags" character varying(256) array NOT NULL DEFAULT '{}'::varchar[], "blockedHosts" character varying(256) array NOT NULL DEFAULT '{}'::varchar[], "mascotImageUrl" character varying(512) DEFAULT '/static-assets/badges/info.avif', "bannerUrl" character varying(512), "errorImageUrl" character varying(512) DEFAULT '/static-assets/badges/error.avif', "iconUrl" character varying(512), "cacheRemoteFiles" boolean NOT NULL DEFAULT false, "proxyAccount" character varying(128), "enableRecaptcha" boolean NOT NULL DEFAULT false, "recaptchaSiteKey" character varying(64), "recaptchaSecretKey" character varying(64), "localDriveCapacityMb" integer NOT NULL DEFAULT 1024, "remoteDriveCapacityMb" integer NOT NULL DEFAULT 32, "maxNoteTextLength" integer NOT NULL DEFAULT 500, "summalyProxy" character varying(128), "enableEmail" boolean NOT NULL DEFAULT false, "email" character varying(128), "smtpSecure" boolean NOT NULL DEFAULT false, "smtpHost" character varying(128), "smtpPort" integer, "smtpUser" character varying(128), "smtpPass" character varying(128), "enableServiceWorker" boolean NOT NULL DEFAULT false, "swPublicKey" character varying(128), "swPrivateKey" character varying(128), "enableTwitterIntegration" boolean NOT NULL DEFAULT false, "twitterConsumerKey" character varying(128), "twitterConsumerSecret" character varying(128), "enableGithubIntegration" boolean NOT NULL DEFAULT false, "githubClientId" character varying(128), "githubClientSecret" character varying(128), "enableDiscordIntegration" boolean NOT NULL DEFAULT false, "discordClientId" character varying(128), "discordClientSecret" character varying(128), CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "following" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "followeeId" character varying(32) NOT NULL, "followerId" character varying(32) NOT NULL, "followerHost" character varying(128), "followerInbox" character varying(512), "followerSharedInbox" character varying(512), "followeeHost" character varying(128), "followeeInbox" character varying(512), "followeeSharedInbox" character varying(512), CONSTRAINT "PK_c76c6e044bdf76ecf8bfb82a645" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_582f8fab771a9040a12961f3e7" ON "following" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_24e0042143a18157b234df186c" ON "following" ("followeeId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6516c5a6f3c015b4eed39978be" ON "following" ("followerId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_307be5f1d1252e0388662acb96" ON "following" ("followerId", "followeeId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "instance" ("id" character varying(32) NOT NULL, "caughtAt" TIMESTAMP WITH TIME ZONE NOT NULL, "host" character varying(128) NOT NULL, "system" character varying(64), "usersCount" integer NOT NULL DEFAULT 0, "notesCount" integer NOT NULL DEFAULT 0, "followingCount" integer NOT NULL DEFAULT 0, "followersCount" integer NOT NULL DEFAULT 0, "driveUsage" integer NOT NULL DEFAULT 0, "driveFiles" integer NOT NULL DEFAULT 0, "latestRequestSentAt" TIMESTAMP WITH TIME ZONE, "latestStatus" integer, "latestRequestReceivedAt" TIMESTAMP WITH TIME ZONE, "lastCommunicatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "isNotResponding" boolean NOT NULL DEFAULT false, "isMarkedAsClosed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_eaf60e4a0c399c9935413e06474" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2cd3b2a6b4cf0b910b260afe08" ON "instance" ("caughtAt") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_8d5afc98982185799b160e10eb" ON "instance" ("host") `,
		);
		await queryRunner.query(
			`CREATE TABLE "muting" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "muteeId" character varying(32) NOT NULL, "muterId" character varying(32) NOT NULL, CONSTRAINT "PK_2e92d06c8b5c602eeb27ca9ba48" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f86d57fbca33c7a4e6897490cc" ON "muting" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ec96b4fed9dae517e0dbbe0675" ON "muting" ("muteeId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_93060675b4a79a577f31d260c6" ON "muting" ("muterId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_1eb9d9824a630321a29fd3b290" ON "muting" ("muterId", "muteeId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "sw_subscription" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "endpoint" character varying(512) NOT NULL, "auth" character varying(256) NOT NULL, "publickey" character varying(128) NOT NULL, CONSTRAINT "PK_e8f763631530051b95eb6279b91" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_97754ca6f2baff9b4abb7f853d" ON "sw_subscription" ("userId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "blocking" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "blockeeId" character varying(32) NOT NULL, "blockerId" character varying(32) NOT NULL, CONSTRAINT "PK_e5d9a541cc1965ee7e048ea09dd" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b9a354f7941c1e779f3b33aea6" ON "blocking" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2cd4a2743a99671308f5417759" ON "blocking" ("blockeeId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0627125f1a8a42c9a1929edb55" ON "blocking" ("blockerId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_98a1bc5cb30dfd159de056549f" ON "blocking" ("blockerId", "blockeeId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user_list" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "PK_87bab75775fd9b1ff822b656402" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b7fcefbdd1c18dce86687531f9" ON "user_list" ("userId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user_list_joining" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "userListId" character varying(32) NOT NULL, CONSTRAINT "PK_11abb3768da1c5f8de101c9df45" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d844bfc6f3f523a05189076efa" ON "user_list_joining" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_605472305f26818cc93d1baaa7" ON "user_list_joining" ("userListId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "hashtag" ("id" character varying(32) NOT NULL, "name" character varying(128) NOT NULL, "mentionedUserIds" character varying(32) array NOT NULL, "mentionedUsersCount" integer NOT NULL DEFAULT 0, "mentionedLocalUserIds" character varying(32) array NOT NULL, "mentionedLocalUsersCount" integer NOT NULL DEFAULT 0, "mentionedRemoteUserIds" character varying(32) array NOT NULL, "mentionedRemoteUsersCount" integer NOT NULL DEFAULT 0, "attachedUserIds" character varying(32) array NOT NULL, "attachedUsersCount" integer NOT NULL DEFAULT 0, "attachedLocalUserIds" character varying(32) array NOT NULL, "attachedLocalUsersCount" integer NOT NULL DEFAULT 0, "attachedRemoteUserIds" character varying(32) array NOT NULL, "attachedRemoteUsersCount" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_347fec870eafea7b26c8a73bac" ON "hashtag" ("name") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2710a55f826ee236ea1a62698f" ON "hashtag" ("mentionedUsersCount") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0e206cec573f1edff4a3062923" ON "hashtag" ("mentionedLocalUsersCount") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4c02d38a976c3ae132228c6fce" ON "hashtag" ("mentionedRemoteUsersCount") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d57f9030cd3af7f63ffb1c267c" ON "hashtag" ("attachedUsersCount") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c44bf4f680964145f2a68a341" ON "hashtag" ("attachedLocalUsersCount") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0b03cbcd7e6a7ce068efa8ecc2" ON "hashtag" ("attachedRemoteUsersCount") `,
		);
		await queryRunner.query(
			`CREATE TABLE "note_favorite" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, CONSTRAINT "PK_af0da35a60b9fa4463a62082b36" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_47f4b1892f5d6ba8efb3057d81" ON "note_favorite" ("userId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_0f4fb9ad355f3effff221ef245" ON "note_favorite" ("userId", "noteId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "abuse_user_report" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "reporterId" character varying(32) NOT NULL, "comment" character varying(512) NOT NULL, CONSTRAINT "PK_87873f5f5cc5c321a1306b2d18c" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_db2098070b2b5a523c58181f74" ON "abuse_user_report" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d049123c413e68ca52abe73420" ON "abuse_user_report" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_04cc96756f89d0b7f9473e8cdf" ON "abuse_user_report" ("reporterId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_5cd442c3b2e74fdd99dae20243" ON "abuse_user_report" ("userId", "reporterId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "registration_ticket" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "code" character varying(64) NOT NULL, CONSTRAINT "PK_f11696b6fafcf3662d4292734f8" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_0ff69e8dfa9fe31bb4a4660f59" ON "registration_ticket" ("code") `,
		);
		await queryRunner.query(
			`CREATE TABLE "messaging_message" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "recipientId" character varying(32) NOT NULL, "text" character varying(4096), "isRead" boolean NOT NULL DEFAULT false, "fileId" character varying(32), CONSTRAINT "PK_db398fd79dc95d0eb8c30456eaa" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e21cd3646e52ef9c94aaf17c2e" ON "messaging_message" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5377c307783fce2b6d352e1203" ON "messaging_message" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_cac14a4e3944454a5ce7daa514" ON "messaging_message" ("recipientId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "signin" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "ip" character varying(128) NOT NULL, "headers" jsonb NOT NULL, "success" boolean NOT NULL, CONSTRAINT "PK_9e96ddc025712616fc492b3b588" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_2c308dbdc50d94dc625670055f" ON "signin" ("userId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "auth_session" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "token" character varying(128) NOT NULL, "userId" character varying(32), "appId" character varying(32) NOT NULL, CONSTRAINT "PK_19354ed146424a728c1112a8cbf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_62cb09e1129f6ec024ef66e183" ON "auth_session" ("token") `,
		);
		await queryRunner.query(
			`CREATE TABLE "follow_request" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "followeeId" character varying(32) NOT NULL, "followerId" character varying(32) NOT NULL, "requestId" character varying(128), "followerHost" character varying(128), "followerInbox" character varying(512), "followerSharedInbox" character varying(512), "followeeHost" character varying(128), "followeeInbox" character varying(512), "followeeSharedInbox" character varying(512), CONSTRAINT "PK_53a9aa3725f7a3deb150b39dbfc" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_12c01c0d1a79f77d9f6c15fadd" ON "follow_request" ("followeeId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a7fd92dd6dc519e6fb435dd108" ON "follow_request" ("followerId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_d54a512b822fac7ed52800f6b4" ON "follow_request" ("followerId", "followeeId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "emoji" ("id" character varying(32) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(128) NOT NULL, "host" character varying(128), "url" character varying(512) NOT NULL, "uri" character varying(512), "type" character varying(64), "aliases" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b37dafc86e9af007e3295c2781" ON "emoji" ("name") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5900e907bb46516ddf2871327c" ON "emoji" ("host") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_4f4d35e1256c84ae3d1f0eab10" ON "emoji" ("name", "host") `,
		);
		await queryRunner.query(
			`CREATE TABLE "reversi_game" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "startedAt" TIMESTAMP WITH TIME ZONE, "user1Id" character varying(32) NOT NULL, "user2Id" character varying(32) NOT NULL, "user1Accepted" boolean NOT NULL DEFAULT false, "user2Accepted" boolean NOT NULL DEFAULT false, "black" integer, "isStarted" boolean NOT NULL DEFAULT false, "isEnded" boolean NOT NULL DEFAULT false, "winnerId" character varying(32), "surrendered" character varying(32), "logs" jsonb NOT NULL DEFAULT '[]', "map" character varying(64) array NOT NULL, "bw" character varying(32) NOT NULL, "isLlotheo" boolean NOT NULL DEFAULT false, "canPutEverywhere" boolean NOT NULL DEFAULT false, "loopedBoard" boolean NOT NULL DEFAULT false, "form1" jsonb DEFAULT null, "form2" jsonb DEFAULT null, "crc32" character varying(32), CONSTRAINT "PK_76b30eeba71b1193ad7c5311c3f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b46ec40746efceac604142be1c" ON "reversi_game" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE TABLE "reversi_matching" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "parentId" character varying(32) NOT NULL, "childId" character varying(32) NOT NULL, CONSTRAINT "PK_880bd0afbab232f21c8b9d146cf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b604d92d6c7aec38627f6eaf16" ON "reversi_matching" ("createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3b25402709dd9882048c2bbade" ON "reversi_matching" ("parentId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e247b23a3c9b45f89ec1299d06" ON "reversi_matching" ("childId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user_note_pining" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, CONSTRAINT "PK_a6a2dad4ae000abce2ea9d9b103" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_bfbc6f79ba4007b4ce5097f08d" ON "user_note_pining" ("userId") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_410cd649884b501c02d6e72738" ON "user_note_pining" ("userId", "noteId") `,
		);
		await queryRunner.query(
			`CREATE TYPE "poll_notevisibility_enum" AS ENUM('public', 'home', 'followers', 'specified')`,
		);
		await queryRunner.query(
			`CREATE TABLE "poll" ("noteId" character varying(32) NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE, "multiple" boolean NOT NULL, "choices" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "votes" integer array NOT NULL, "noteVisibility" "poll_notevisibility_enum" NOT NULL, "userId" character varying(32) NOT NULL, "userHost" character varying(128), CONSTRAINT "REL_da851e06d0dfe2ef397d8b1bf1" UNIQUE ("noteId"), CONSTRAINT "PK_da851e06d0dfe2ef397d8b1bf1b" PRIMARY KEY ("noteId"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0610ebcfcfb4a18441a9bcdab2" ON "poll" ("userId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7fa20a12319c7f6dc3aed98c0a" ON "poll" ("userHost") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user_keypair" ("userId" character varying(32) NOT NULL, "publicKey" character varying(4096) NOT NULL, "privateKey" character varying(4096) NOT NULL, CONSTRAINT "REL_f4853eb41ab722fe05f81cedeb" UNIQUE ("userId"), CONSTRAINT "PK_f4853eb41ab722fe05f81cedeb6" PRIMARY KEY ("userId"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "user_publickey" ("userId" character varying(32) NOT NULL, "keyId" character varying(256) NOT NULL, "keyPem" character varying(4096) NOT NULL, CONSTRAINT "REL_10c146e4b39b443ede016f6736" UNIQUE ("userId"), CONSTRAINT "PK_10c146e4b39b443ede016f6736d" PRIMARY KEY ("userId"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_171e64971c780ebd23fae140bb" ON "user_publickey" ("keyId") `,
		);
		await queryRunner.query(
			`CREATE TABLE "user_profile" ("userId" character varying(32) NOT NULL, "location" character varying(128), "birthday" character(10), "description" character varying(1024), "fields" jsonb NOT NULL DEFAULT '[]', "url" character varying(512), "email" character varying(128), "emailVerifyCode" character varying(128), "emailVerified" boolean NOT NULL DEFAULT false, "twoFactorTempSecret" character varying(128), "twoFactorSecret" character varying(128), "twoFactorEnabled" boolean NOT NULL DEFAULT false, "password" character varying(128), "clientData" jsonb NOT NULL DEFAULT '{}', "autoWatch" boolean NOT NULL DEFAULT false, "autoAcceptFollowed" boolean NOT NULL DEFAULT false, "alwaysMarkNsfw" boolean NOT NULL DEFAULT false, "carefulBot" boolean NOT NULL DEFAULT false, "twitter" boolean NOT NULL DEFAULT false, "twitterAccessToken" character varying(64) DEFAULT null, "twitterAccessTokenSecret" character varying(64) DEFAULT null, "twitterUserId" character varying(64) DEFAULT null, "twitterScreenName" character varying(64) DEFAULT null, "github" boolean NOT NULL DEFAULT false, "githubAccessToken" character varying(64) DEFAULT null, "githubId" integer DEFAULT null, "githubLogin" character varying(64) DEFAULT null, "discord" boolean NOT NULL DEFAULT false, "discordAccessToken" character varying(64) DEFAULT null, "discordRefreshToken" character varying(64) DEFAULT null, "discordExpiresDate" integer DEFAULT null, "discordId" character varying(64) DEFAULT null, "discordUsername" character varying(64) DEFAULT null, "discordDiscriminator" character varying(64) DEFAULT null, "userHost" character varying(128), CONSTRAINT "REL_51cb79b5555effaf7d69ba1cff" UNIQUE ("userId"), CONSTRAINT "PK_51cb79b5555effaf7d69ba1cff9" PRIMARY KEY ("userId"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_dce530b98e454793dac5ec2f5a" ON "user_profile" ("userHost") `,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__active_users_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__active_users" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__active_users_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_count" bigint NOT NULL, "___remote_count" bigint NOT NULL, CONSTRAINT "PK_317237a9f733b970604a11e314f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__drive_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__drive" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__drive_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_totalCount" bigint NOT NULL, "___local_totalSize" bigint NOT NULL, "___local_incCount" bigint NOT NULL, "___local_incSize" bigint NOT NULL, "___local_decCount" bigint NOT NULL, "___local_decSize" bigint NOT NULL, "___remote_totalCount" bigint NOT NULL, "___remote_totalSize" bigint NOT NULL, "___remote_incCount" bigint NOT NULL, "___remote_incSize" bigint NOT NULL, "___remote_decCount" bigint NOT NULL, "___remote_decSize" bigint NOT NULL, CONSTRAINT "PK_f96bc548a765cd4b3b354221ce7" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__federation_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__federation" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__federation_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___instance_total" bigint NOT NULL, "___instance_inc" bigint NOT NULL, "___instance_dec" bigint NOT NULL, CONSTRAINT "PK_b39dcd31a0fe1a7757e348e85fd" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__hashtag_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__hashtag" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__hashtag_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_count" bigint NOT NULL, "___remote_count" bigint NOT NULL, CONSTRAINT "PK_c32f1ea2b44a5d2f7881e37f8f9" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__instance_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__instance" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__instance_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___requests_failed" bigint NOT NULL, "___requests_succeeded" bigint NOT NULL, "___requests_received" bigint NOT NULL, "___notes_total" bigint NOT NULL, "___notes_inc" bigint NOT NULL, "___notes_dec" bigint NOT NULL, "___notes_diffs_normal" bigint NOT NULL, "___notes_diffs_reply" bigint NOT NULL, "___notes_diffs_renote" bigint NOT NULL, "___users_total" bigint NOT NULL, "___users_inc" bigint NOT NULL, "___users_dec" bigint NOT NULL, "___following_total" bigint NOT NULL, "___following_inc" bigint NOT NULL, "___following_dec" bigint NOT NULL, "___followers_total" bigint NOT NULL, "___followers_inc" bigint NOT NULL, "___followers_dec" bigint NOT NULL, "___drive_totalFiles" bigint NOT NULL, "___drive_totalUsage" bigint NOT NULL, "___drive_incFiles" bigint NOT NULL, "___drive_incUsage" bigint NOT NULL, "___drive_decFiles" bigint NOT NULL, "___drive_decUsage" bigint NOT NULL, CONSTRAINT "PK_1267c67c7c2d47b4903975f2c00" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__network_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__network" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__network_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___incomingRequests" bigint NOT NULL, "___outgoingRequests" bigint NOT NULL, "___totalTime" bigint NOT NULL, "___incomingBytes" bigint NOT NULL, "___outgoingBytes" bigint NOT NULL, CONSTRAINT "PK_bc4290c2e27fad14ef0c1ca93f3" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__notes_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__notes" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__notes_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_total" bigint NOT NULL, "___local_inc" bigint NOT NULL, "___local_dec" bigint NOT NULL, "___local_diffs_normal" bigint NOT NULL, "___local_diffs_reply" bigint NOT NULL, "___local_diffs_renote" bigint NOT NULL, "___remote_total" bigint NOT NULL, "___remote_inc" bigint NOT NULL, "___remote_dec" bigint NOT NULL, "___remote_diffs_normal" bigint NOT NULL, "___remote_diffs_reply" bigint NOT NULL, "___remote_diffs_renote" bigint NOT NULL, CONSTRAINT "PK_0aec823fa85c7f901bdb3863b14" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__per_user_drive_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__per_user_drive" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__per_user_drive_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___totalCount" bigint NOT NULL, "___totalSize" bigint NOT NULL, "___incCount" bigint NOT NULL, "___incSize" bigint NOT NULL, "___decCount" bigint NOT NULL, "___decSize" bigint NOT NULL, CONSTRAINT "PK_d0ef23d24d666e1a44a0cd3d208" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__per_user_following_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__per_user_following" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__per_user_following_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_followings_total" bigint NOT NULL, "___local_followings_inc" bigint NOT NULL, "___local_followings_dec" bigint NOT NULL, "___local_followers_total" bigint NOT NULL, "___local_followers_inc" bigint NOT NULL, "___local_followers_dec" bigint NOT NULL, "___remote_followings_total" bigint NOT NULL, "___remote_followings_inc" bigint NOT NULL, "___remote_followings_dec" bigint NOT NULL, "___remote_followers_total" bigint NOT NULL, "___remote_followers_inc" bigint NOT NULL, "___remote_followers_dec" bigint NOT NULL, CONSTRAINT "PK_85bb1b540363a29c2fec83bd907" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__per_user_notes_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__per_user_notes" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__per_user_notes_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___total" bigint NOT NULL, "___inc" bigint NOT NULL, "___dec" bigint NOT NULL, "___diffs_normal" bigint NOT NULL, "___diffs_reply" bigint NOT NULL, "___diffs_renote" bigint NOT NULL, CONSTRAINT "PK_334acf6e915af2f29edc11b8e50" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__per_user_reaction_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__per_user_reaction" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__per_user_reaction_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_count" bigint NOT NULL, "___remote_count" bigint NOT NULL, CONSTRAINT "PK_984f54dae441e65b633e8d27a7f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__test_grouped_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__test_grouped" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__test_grouped_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___foo_total" bigint NOT NULL, "___foo_inc" bigint NOT NULL, "___foo_dec" bigint NOT NULL, CONSTRAINT "PK_f4a2b175d308695af30d4293272" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__test_unique_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__test_unique" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__test_unique_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___foo" bigint NOT NULL, CONSTRAINT "PK_409bac9c97cc612d8500012319d" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__test_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__test" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__test_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___foo_total" bigint NOT NULL, "___foo_inc" bigint NOT NULL, "___foo_dec" bigint NOT NULL, CONSTRAINT "PK_b4bc31dffbd1b785276a3ecfc1e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "__chart__users_span_enum" AS ENUM('hour', 'day')`,
		);
		await queryRunner.query(
			`CREATE TABLE "__chart__users" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "group" character varying(128), "span" "__chart__users_span_enum" NOT NULL, "unique" jsonb NOT NULL DEFAULT '{}', "___local_total" bigint NOT NULL, "___local_inc" bigint NOT NULL, "___local_dec" bigint NOT NULL, "___remote_total" bigint NOT NULL, "___remote_inc" bigint NOT NULL, "___remote_dec" bigint NOT NULL, CONSTRAINT "PK_4dfcf2c78d03524b9eb2c99d328" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_folder" ADD CONSTRAINT "FK_f4fc06e49c0171c85f1c48060d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_folder" ADD CONSTRAINT "FK_00ceffb0cdc238b3233294f08f2" FOREIGN KEY ("parentId") REFERENCES "drive_folder"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" ADD CONSTRAINT "FK_bb90d1956dafc4068c28aa7560a" FOREIGN KEY ("folderId") REFERENCES "drive_folder"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "drive_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_afc64b53f8db3707ceb34eb28e2" FOREIGN KEY ("bannerId") REFERENCES "drive_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "app" ADD CONSTRAINT "FK_3f5b0899ef90527a3462d7c2cb3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "access_token" ADD CONSTRAINT "FK_9949557d0e1b2c19e5344c171e9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "access_token" ADD CONSTRAINT "FK_a3ff16c90cc87a82a0b5959e560" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_17cb3553c700a4985dff5a30ff5" FOREIGN KEY ("replyId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_52ccc804d7c69037d558bac4c96" FOREIGN KEY ("renoteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_ec5c201576192ba8904c345c5cc" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll_vote" ADD CONSTRAINT "FK_66d2bd2ee31d14bcc23069a89f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll_vote" ADD CONSTRAINT "FK_aecfbd5ef60374918e63ee95fa7" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_reaction" ADD CONSTRAINT "FK_13761f64257f40c5636d0ff95ee" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_reaction" ADD CONSTRAINT "FK_45145e4953780f3cd5656f0ea6a" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_watching" ADD CONSTRAINT "FK_b0134ec406e8d09a540f8182888" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_watching" ADD CONSTRAINT "FK_03e7028ab8388a3f5e3ce2a8619" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_unread" ADD CONSTRAINT "FK_56b0166d34ddae49d8ef7610bb9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_unread" ADD CONSTRAINT "FK_e637cba4dc4410218c4251260e4" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_3c601b70a1066d2c8b517094cb9" FOREIGN KEY ("notifieeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_3b4e96eec8d36a8bbb9d02aa710" FOREIGN KEY ("notifierId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_769cb6b73a1efe22ddf733ac453" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "following" ADD CONSTRAINT "FK_24e0042143a18157b234df186c3" FOREIGN KEY ("followeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "following" ADD CONSTRAINT "FK_6516c5a6f3c015b4eed39978be5" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "muting" ADD CONSTRAINT "FK_ec96b4fed9dae517e0dbbe0675c" FOREIGN KEY ("muteeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "muting" ADD CONSTRAINT "FK_93060675b4a79a577f31d260c67" FOREIGN KEY ("muterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "sw_subscription" ADD CONSTRAINT "FK_97754ca6f2baff9b4abb7f853dd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "blocking" ADD CONSTRAINT "FK_2cd4a2743a99671308f5417759e" FOREIGN KEY ("blockeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "blocking" ADD CONSTRAINT "FK_0627125f1a8a42c9a1929edb552" FOREIGN KEY ("blockerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list" ADD CONSTRAINT "FK_b7fcefbdd1c18dce86687531f99" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list_joining" ADD CONSTRAINT "FK_d844bfc6f3f523a05189076efaa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list_joining" ADD CONSTRAINT "FK_605472305f26818cc93d1baaa74" FOREIGN KEY ("userListId") REFERENCES "user_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_favorite" ADD CONSTRAINT "FK_47f4b1892f5d6ba8efb3057d81a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_favorite" ADD CONSTRAINT "FK_0e00498f180193423c992bc4370" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "abuse_user_report" ADD CONSTRAINT "FK_d049123c413e68ca52abe734203" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "abuse_user_report" ADD CONSTRAINT "FK_04cc96756f89d0b7f9473e8cdf3" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" ADD CONSTRAINT "FK_5377c307783fce2b6d352e1203b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" ADD CONSTRAINT "FK_cac14a4e3944454a5ce7daa5142" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" ADD CONSTRAINT "FK_535def119223ac05ad3fa9ef64b" FOREIGN KEY ("fileId") REFERENCES "drive_file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "signin" ADD CONSTRAINT "FK_2c308dbdc50d94dc625670055f7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "auth_session" ADD CONSTRAINT "FK_c072b729d71697f959bde66ade0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "auth_session" ADD CONSTRAINT "FK_dbe037d4bddd17b03a1dc778dee" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "follow_request" ADD CONSTRAINT "FK_12c01c0d1a79f77d9f6c15fadd2" FOREIGN KEY ("followeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "follow_request" ADD CONSTRAINT "FK_a7fd92dd6dc519e6fb435dd108f" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_game" ADD CONSTRAINT "FK_f7467510c60a45ce5aca6292743" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_game" ADD CONSTRAINT "FK_6649a4e8c5d5cf32fb03b5da9f6" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_matching" ADD CONSTRAINT "FK_3b25402709dd9882048c2bbade0" FOREIGN KEY ("parentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_matching" ADD CONSTRAINT "FK_e247b23a3c9b45f89ec1299d066" FOREIGN KEY ("childId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_note_pining" ADD CONSTRAINT "FK_bfbc6f79ba4007b4ce5097f08d6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_note_pining" ADD CONSTRAINT "FK_68881008f7c3588ad7ecae471cf" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll" ADD CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_keypair" ADD CONSTRAINT "FK_f4853eb41ab722fe05f81cedeb6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_publickey" ADD CONSTRAINT "FK_10c146e4b39b443ede016f6736d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}
	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_publickey" DROP CONSTRAINT "FK_10c146e4b39b443ede016f6736d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_keypair" DROP CONSTRAINT "FK_f4853eb41ab722fe05f81cedeb6"`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll" DROP CONSTRAINT "FK_da851e06d0dfe2ef397d8b1bf1b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_note_pining" DROP CONSTRAINT "FK_68881008f7c3588ad7ecae471cf"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_note_pining" DROP CONSTRAINT "FK_bfbc6f79ba4007b4ce5097f08d6"`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_matching" DROP CONSTRAINT "FK_e247b23a3c9b45f89ec1299d066"`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_matching" DROP CONSTRAINT "FK_3b25402709dd9882048c2bbade0"`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_game" DROP CONSTRAINT "FK_6649a4e8c5d5cf32fb03b5da9f6"`,
		);
		await queryRunner.query(
			`ALTER TABLE "reversi_game" DROP CONSTRAINT "FK_f7467510c60a45ce5aca6292743"`,
		);
		await queryRunner.query(
			`ALTER TABLE "follow_request" DROP CONSTRAINT "FK_a7fd92dd6dc519e6fb435dd108f"`,
		);
		await queryRunner.query(
			`ALTER TABLE "follow_request" DROP CONSTRAINT "FK_12c01c0d1a79f77d9f6c15fadd2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "auth_session" DROP CONSTRAINT "FK_dbe037d4bddd17b03a1dc778dee"`,
		);
		await queryRunner.query(
			`ALTER TABLE "auth_session" DROP CONSTRAINT "FK_c072b729d71697f959bde66ade0"`,
		);
		await queryRunner.query(
			`ALTER TABLE "signin" DROP CONSTRAINT "FK_2c308dbdc50d94dc625670055f7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" DROP CONSTRAINT "FK_535def119223ac05ad3fa9ef64b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" DROP CONSTRAINT "FK_cac14a4e3944454a5ce7daa5142"`,
		);
		await queryRunner.query(
			`ALTER TABLE "messaging_message" DROP CONSTRAINT "FK_5377c307783fce2b6d352e1203b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "abuse_user_report" DROP CONSTRAINT "FK_04cc96756f89d0b7f9473e8cdf3"`,
		);
		await queryRunner.query(
			`ALTER TABLE "abuse_user_report" DROP CONSTRAINT "FK_d049123c413e68ca52abe734203"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_favorite" DROP CONSTRAINT "FK_0e00498f180193423c992bc4370"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_favorite" DROP CONSTRAINT "FK_47f4b1892f5d6ba8efb3057d81a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list_joining" DROP CONSTRAINT "FK_605472305f26818cc93d1baaa74"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list_joining" DROP CONSTRAINT "FK_d844bfc6f3f523a05189076efaa"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_list" DROP CONSTRAINT "FK_b7fcefbdd1c18dce86687531f99"`,
		);
		await queryRunner.query(
			`ALTER TABLE "blocking" DROP CONSTRAINT "FK_0627125f1a8a42c9a1929edb552"`,
		);
		await queryRunner.query(
			`ALTER TABLE "blocking" DROP CONSTRAINT "FK_2cd4a2743a99671308f5417759e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "sw_subscription" DROP CONSTRAINT "FK_97754ca6f2baff9b4abb7f853dd"`,
		);
		await queryRunner.query(
			`ALTER TABLE "muting" DROP CONSTRAINT "FK_93060675b4a79a577f31d260c67"`,
		);
		await queryRunner.query(
			`ALTER TABLE "muting" DROP CONSTRAINT "FK_ec96b4fed9dae517e0dbbe0675c"`,
		);
		await queryRunner.query(
			`ALTER TABLE "following" DROP CONSTRAINT "FK_6516c5a6f3c015b4eed39978be5"`,
		);
		await queryRunner.query(
			`ALTER TABLE "following" DROP CONSTRAINT "FK_24e0042143a18157b234df186c3"`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_769cb6b73a1efe22ddf733ac453"`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_3b4e96eec8d36a8bbb9d02aa710"`,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_3c601b70a1066d2c8b517094cb9"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_unread" DROP CONSTRAINT "FK_e637cba4dc4410218c4251260e4"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_unread" DROP CONSTRAINT "FK_56b0166d34ddae49d8ef7610bb9"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_watching" DROP CONSTRAINT "FK_03e7028ab8388a3f5e3ce2a8619"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_watching" DROP CONSTRAINT "FK_b0134ec406e8d09a540f8182888"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_reaction" DROP CONSTRAINT "FK_45145e4953780f3cd5656f0ea6a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note_reaction" DROP CONSTRAINT "FK_13761f64257f40c5636d0ff95ee"`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll_vote" DROP CONSTRAINT "FK_aecfbd5ef60374918e63ee95fa7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "poll_vote" DROP CONSTRAINT "FK_66d2bd2ee31d14bcc23069a89f8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_ec5c201576192ba8904c345c5cc"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_52ccc804d7c69037d558bac4c96"`,
		);
		await queryRunner.query(
			`ALTER TABLE "note" DROP CONSTRAINT "FK_17cb3553c700a4985dff5a30ff5"`,
		);
		await queryRunner.query(
			`ALTER TABLE "access_token" DROP CONSTRAINT "FK_a3ff16c90cc87a82a0b5959e560"`,
		);
		await queryRunner.query(
			`ALTER TABLE "access_token" DROP CONSTRAINT "FK_9949557d0e1b2c19e5344c171e9"`,
		);
		await queryRunner.query(
			`ALTER TABLE "app" DROP CONSTRAINT "FK_3f5b0899ef90527a3462d7c2cb3"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "FK_afc64b53f8db3707ceb34eb28e2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_bb90d1956dafc4068c28aa7560a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_file" DROP CONSTRAINT "FK_860fa6f6c7df5bb887249fba22e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_folder" DROP CONSTRAINT "FK_00ceffb0cdc238b3233294f08f2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "drive_folder" DROP CONSTRAINT "FK_f4fc06e49c0171c85f1c48060d2"`,
		);
		await queryRunner.query(`DROP TABLE "__chart__users"`);
		await queryRunner.query(`DROP TYPE "__chart__users_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__test"`);
		await queryRunner.query(`DROP TYPE "__chart__test_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__test_unique"`);
		await queryRunner.query(`DROP TYPE "__chart__test_unique_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__test_grouped"`);
		await queryRunner.query(`DROP TYPE "__chart__test_grouped_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__per_user_reaction"`);
		await queryRunner.query(`DROP TYPE "__chart__per_user_reaction_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__per_user_notes"`);
		await queryRunner.query(`DROP TYPE "__chart__per_user_notes_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__per_user_following"`);
		await queryRunner.query(
			`DROP TYPE "__chart__per_user_following_span_enum"`,
		);
		await queryRunner.query(`DROP TABLE "__chart__per_user_drive"`);
		await queryRunner.query(`DROP TYPE "__chart__per_user_drive_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__notes"`);
		await queryRunner.query(`DROP TYPE "__chart__notes_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__network"`);
		await queryRunner.query(`DROP TYPE "__chart__network_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__instance"`);
		await queryRunner.query(`DROP TYPE "__chart__instance_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__hashtag"`);
		await queryRunner.query(`DROP TYPE "__chart__hashtag_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__federation"`);
		await queryRunner.query(`DROP TYPE "__chart__federation_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__drive"`);
		await queryRunner.query(`DROP TYPE "__chart__drive_span_enum"`);
		await queryRunner.query(`DROP TABLE "__chart__active_users"`);
		await queryRunner.query(`DROP TYPE "__chart__active_users_span_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_dce530b98e454793dac5ec2f5a"`);
		await queryRunner.query(`DROP TABLE "user_profile"`);
		await queryRunner.query(`DROP INDEX "IDX_171e64971c780ebd23fae140bb"`);
		await queryRunner.query(`DROP TABLE "user_publickey"`);
		await queryRunner.query(`DROP TABLE "user_keypair"`);
		await queryRunner.query(`DROP INDEX "IDX_7fa20a12319c7f6dc3aed98c0a"`);
		await queryRunner.query(`DROP INDEX "IDX_0610ebcfcfb4a18441a9bcdab2"`);
		await queryRunner.query(`DROP TABLE "poll"`);
		await queryRunner.query(`DROP TYPE "poll_notevisibility_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_410cd649884b501c02d6e72738"`);
		await queryRunner.query(`DROP INDEX "IDX_bfbc6f79ba4007b4ce5097f08d"`);
		await queryRunner.query(`DROP TABLE "user_note_pining"`);
		await queryRunner.query(`DROP INDEX "IDX_e247b23a3c9b45f89ec1299d06"`);
		await queryRunner.query(`DROP INDEX "IDX_3b25402709dd9882048c2bbade"`);
		await queryRunner.query(`DROP INDEX "IDX_b604d92d6c7aec38627f6eaf16"`);
		await queryRunner.query(`DROP TABLE "reversi_matching"`);
		await queryRunner.query(`DROP INDEX "IDX_b46ec40746efceac604142be1c"`);
		await queryRunner.query(`DROP TABLE "reversi_game"`);
		await queryRunner.query(`DROP INDEX "IDX_4f4d35e1256c84ae3d1f0eab10"`);
		await queryRunner.query(`DROP INDEX "IDX_5900e907bb46516ddf2871327c"`);
		await queryRunner.query(`DROP INDEX "IDX_b37dafc86e9af007e3295c2781"`);
		await queryRunner.query(`DROP TABLE "emoji"`);
		await queryRunner.query(`DROP INDEX "IDX_d54a512b822fac7ed52800f6b4"`);
		await queryRunner.query(`DROP INDEX "IDX_a7fd92dd6dc519e6fb435dd108"`);
		await queryRunner.query(`DROP INDEX "IDX_12c01c0d1a79f77d9f6c15fadd"`);
		await queryRunner.query(`DROP TABLE "follow_request"`);
		await queryRunner.query(`DROP INDEX "IDX_62cb09e1129f6ec024ef66e183"`);
		await queryRunner.query(`DROP TABLE "auth_session"`);
		await queryRunner.query(`DROP INDEX "IDX_2c308dbdc50d94dc625670055f"`);
		await queryRunner.query(`DROP TABLE "signin"`);
		await queryRunner.query(`DROP INDEX "IDX_cac14a4e3944454a5ce7daa514"`);
		await queryRunner.query(`DROP INDEX "IDX_5377c307783fce2b6d352e1203"`);
		await queryRunner.query(`DROP INDEX "IDX_e21cd3646e52ef9c94aaf17c2e"`);
		await queryRunner.query(`DROP TABLE "messaging_message"`);
		await queryRunner.query(`DROP INDEX "IDX_0ff69e8dfa9fe31bb4a4660f59"`);
		await queryRunner.query(`DROP TABLE "registration_ticket"`);
		await queryRunner.query(`DROP INDEX "IDX_5cd442c3b2e74fdd99dae20243"`);
		await queryRunner.query(`DROP INDEX "IDX_04cc96756f89d0b7f9473e8cdf"`);
		await queryRunner.query(`DROP INDEX "IDX_d049123c413e68ca52abe73420"`);
		await queryRunner.query(`DROP INDEX "IDX_db2098070b2b5a523c58181f74"`);
		await queryRunner.query(`DROP TABLE "abuse_user_report"`);
		await queryRunner.query(`DROP INDEX "IDX_0f4fb9ad355f3effff221ef245"`);
		await queryRunner.query(`DROP INDEX "IDX_47f4b1892f5d6ba8efb3057d81"`);
		await queryRunner.query(`DROP TABLE "note_favorite"`);
		await queryRunner.query(`DROP INDEX "IDX_0b03cbcd7e6a7ce068efa8ecc2"`);
		await queryRunner.query(`DROP INDEX "IDX_0c44bf4f680964145f2a68a341"`);
		await queryRunner.query(`DROP INDEX "IDX_d57f9030cd3af7f63ffb1c267c"`);
		await queryRunner.query(`DROP INDEX "IDX_4c02d38a976c3ae132228c6fce"`);
		await queryRunner.query(`DROP INDEX "IDX_0e206cec573f1edff4a3062923"`);
		await queryRunner.query(`DROP INDEX "IDX_2710a55f826ee236ea1a62698f"`);
		await queryRunner.query(`DROP INDEX "IDX_347fec870eafea7b26c8a73bac"`);
		await queryRunner.query(`DROP TABLE "hashtag"`);
		await queryRunner.query(`DROP INDEX "IDX_605472305f26818cc93d1baaa7"`);
		await queryRunner.query(`DROP INDEX "IDX_d844bfc6f3f523a05189076efa"`);
		await queryRunner.query(`DROP TABLE "user_list_joining"`);
		await queryRunner.query(`DROP INDEX "IDX_b7fcefbdd1c18dce86687531f9"`);
		await queryRunner.query(`DROP TABLE "user_list"`);
		await queryRunner.query(`DROP INDEX "IDX_98a1bc5cb30dfd159de056549f"`);
		await queryRunner.query(`DROP INDEX "IDX_0627125f1a8a42c9a1929edb55"`);
		await queryRunner.query(`DROP INDEX "IDX_2cd4a2743a99671308f5417759"`);
		await queryRunner.query(`DROP INDEX "IDX_b9a354f7941c1e779f3b33aea6"`);
		await queryRunner.query(`DROP TABLE "blocking"`);
		await queryRunner.query(`DROP INDEX "IDX_97754ca6f2baff9b4abb7f853d"`);
		await queryRunner.query(`DROP TABLE "sw_subscription"`);
		await queryRunner.query(`DROP INDEX "IDX_1eb9d9824a630321a29fd3b290"`);
		await queryRunner.query(`DROP INDEX "IDX_93060675b4a79a577f31d260c6"`);
		await queryRunner.query(`DROP INDEX "IDX_ec96b4fed9dae517e0dbbe0675"`);
		await queryRunner.query(`DROP INDEX "IDX_f86d57fbca33c7a4e6897490cc"`);
		await queryRunner.query(`DROP TABLE "muting"`);
		await queryRunner.query(`DROP INDEX "IDX_8d5afc98982185799b160e10eb"`);
		await queryRunner.query(`DROP INDEX "IDX_2cd3b2a6b4cf0b910b260afe08"`);
		await queryRunner.query(`DROP TABLE "instance"`);
		await queryRunner.query(`DROP INDEX "IDX_307be5f1d1252e0388662acb96"`);
		await queryRunner.query(`DROP INDEX "IDX_6516c5a6f3c015b4eed39978be"`);
		await queryRunner.query(`DROP INDEX "IDX_24e0042143a18157b234df186c"`);
		await queryRunner.query(`DROP INDEX "IDX_582f8fab771a9040a12961f3e7"`);
		await queryRunner.query(`DROP TABLE "following"`);
		await queryRunner.query(`DROP TABLE "meta"`);
		await queryRunner.query(`DROP INDEX "IDX_3c601b70a1066d2c8b517094cb"`);
		await queryRunner.query(`DROP INDEX "IDX_b11a5e627c41d4dc3170f1d370"`);
		await queryRunner.query(`DROP TABLE "notification"`);
		await queryRunner.query(`DROP INDEX "IDX_d908433a4953cc13216cd9c274"`);
		await queryRunner.query(`DROP INDEX "IDX_e637cba4dc4410218c4251260e"`);
		await queryRunner.query(`DROP INDEX "IDX_56b0166d34ddae49d8ef7610bb"`);
		await queryRunner.query(`DROP TABLE "note_unread"`);
		await queryRunner.query(`DROP INDEX "IDX_a42c93c69989ce1d09959df4cf"`);
		await queryRunner.query(`DROP INDEX "IDX_44499765eec6b5489d72c4253b"`);
		await queryRunner.query(`DROP INDEX "IDX_03e7028ab8388a3f5e3ce2a861"`);
		await queryRunner.query(`DROP INDEX "IDX_b0134ec406e8d09a540f818288"`);
		await queryRunner.query(`DROP INDEX "IDX_318cdf42a9cfc11f479bd802bb"`);
		await queryRunner.query(`DROP TABLE "note_watching"`);
		await queryRunner.query(`DROP INDEX "IDX_ad0c221b25672daf2df320a817"`);
		await queryRunner.query(`DROP INDEX "IDX_45145e4953780f3cd5656f0ea6"`);
		await queryRunner.query(`DROP INDEX "IDX_13761f64257f40c5636d0ff95e"`);
		await queryRunner.query(`DROP INDEX "IDX_01f4581f114e0ebd2bbb876f0b"`);
		await queryRunner.query(`DROP TABLE "note_reaction"`);
		await queryRunner.query(`DROP INDEX "IDX_50bd7164c5b78f1f4a42c4d21f"`);
		await queryRunner.query(`DROP INDEX "IDX_aecfbd5ef60374918e63ee95fa"`);
		await queryRunner.query(`DROP INDEX "IDX_66d2bd2ee31d14bcc23069a89f"`);
		await queryRunner.query(`DROP INDEX "IDX_0fb627e1c2f753262a74f0562d"`);
		await queryRunner.query(`DROP TABLE "poll_vote"`);
		await queryRunner.query(`DROP INDEX "IDX_7125a826ab192eb27e11d358a5"`);
		await queryRunner.query(`DROP INDEX "IDX_88937d94d7443d9a99a76fa5c0"`);
		await queryRunner.query(`DROP INDEX "IDX_54ebcb6d27222913b908d56fd8"`);
		await queryRunner.query(`DROP INDEX "IDX_796a8c03959361f97dc2be1d5c"`);
		await queryRunner.query(`DROP INDEX "IDX_25dfc71b0369b003a4cd434d0b"`);
		await queryRunner.query(`DROP INDEX "IDX_51c063b6a133a9cb87145450f5"`);
		await queryRunner.query(`DROP INDEX "IDX_153536c67d05e9adb24e99fc2b"`);
		await queryRunner.query(`DROP INDEX "IDX_5b87d9d19127bd5d92026017a7"`);
		await queryRunner.query(`DROP INDEX "IDX_52ccc804d7c69037d558bac4c9"`);
		await queryRunner.query(`DROP INDEX "IDX_17cb3553c700a4985dff5a30ff"`);
		await queryRunner.query(`DROP INDEX "IDX_e7c0567f5261063592f022e9b5"`);
		await queryRunner.query(`DROP TABLE "note"`);
		await queryRunner.query(`DROP TYPE "note_visibility_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_9949557d0e1b2c19e5344c171e"`);
		await queryRunner.query(`DROP INDEX "IDX_64c327441248bae40f7d92f34f"`);
		await queryRunner.query(`DROP INDEX "IDX_70ba8f6af34bc924fc9e12adb8"`);
		await queryRunner.query(`DROP TABLE "access_token"`);
		await queryRunner.query(`DROP INDEX "IDX_f49922d511d666848f250663c4"`);
		await queryRunner.query(`DROP INDEX "IDX_3f5b0899ef90527a3462d7c2cb"`);
		await queryRunner.query(`DROP INDEX "IDX_048a757923ed8b157e9895da53"`);
		await queryRunner.query(`DROP TABLE "app"`);
		await queryRunner.query(`DROP INDEX "IDX_5deb01ae162d1d70b80d064c27"`);
		await queryRunner.query(`DROP INDEX "IDX_a854e557b1b14814750c7c7b0c"`);
		await queryRunner.query(`DROP INDEX "IDX_be623adaa4c566baf5d29ce0c8"`);
		await queryRunner.query(`DROP INDEX "IDX_3252a5df8d5bbd16b281f7799e"`);
		await queryRunner.query(`DROP INDEX "IDX_fa99d777623947a5b05f394cae"`);
		await queryRunner.query(`DROP INDEX "IDX_a27b942a0d6dcff90e3ee9b5e8"`);
		await queryRunner.query(`DROP INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4"`);
		await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP INDEX "IDX_bb90d1956dafc4068c28aa7560"`);
		await queryRunner.query(`DROP INDEX "IDX_e5848eac4940934e23dbc17581"`);
		await queryRunner.query(`DROP INDEX "IDX_c55b2b7c284d9fef98026fc88e"`);
		await queryRunner.query(`DROP INDEX "IDX_e74022ce9a074b3866f70e0d27"`);
		await queryRunner.query(`DROP INDEX "IDX_d85a184c2540d2deba33daf642"`);
		await queryRunner.query(`DROP INDEX "IDX_a40b8df8c989d7db937ea27cf6"`);
		await queryRunner.query(`DROP INDEX "IDX_37bb9a1b4585f8a3beb24c62d6"`);
		await queryRunner.query(`DROP INDEX "IDX_92779627994ac79277f070c91e"`);
		await queryRunner.query(`DROP INDEX "IDX_860fa6f6c7df5bb887249fba22"`);
		await queryRunner.query(`DROP INDEX "IDX_c8dfad3b72196dd1d6b5db168a"`);
		await queryRunner.query(`DROP TABLE "drive_file"`);
		await queryRunner.query(`DROP INDEX "IDX_00ceffb0cdc238b3233294f08f"`);
		await queryRunner.query(`DROP INDEX "IDX_f4fc06e49c0171c85f1c48060d"`);
		await queryRunner.query(`DROP INDEX "IDX_02878d441ceae15ce060b73daf"`);
		await queryRunner.query(`DROP TABLE "drive_folder"`);
		await queryRunner.query(`DROP INDEX "IDX_584b536b49e53ac81beb39a177"`);
		await queryRunner.query(`DROP INDEX "IDX_8cb40cfc8f3c28261e6f887b03"`);
		await queryRunner.query(`DROP INDEX "IDX_8e4eb51a35d81b64dda28eed0a"`);
		await queryRunner.query(`DROP TABLE "log"`);
		await queryRunner.query(`DROP TYPE "log_level_enum"`);
	}
}
