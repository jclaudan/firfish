import { URL } from "node:url";
import type { User } from "@/models/entities/user.js";
import { createTemp } from "@/misc/create-temp.js";
import { downloadUrl } from "@/misc/download-url.js";
import type { DriveFolder } from "@/models/entities/drive-folder.js";
import type { DriveFile } from "@/models/entities/drive-file.js";
import { DriveFiles } from "@/models/index.js";
import { driveLogger } from "./logger.js";
import { addFile } from "./add-file.js";

const logger = driveLogger.createSubLogger("downloader");

type Args = {
	url: string;
	user: { id: User["id"]; host: User["host"] } | null;
	folderId?: DriveFolder["id"] | null;
	uri?: string | null;
	sensitive?: boolean;
	force?: boolean;
	isLink?: boolean;
	comment?: string | null;
	requestIp?: string | null;
	requestHeaders?: Record<string, string> | null;
};

const PRIVATE_IPV4 =
	/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)|(^0\.)/;
const PRIVATE_IPV6 = /(f[c-e][0-9a-f][0-9a-f]:)|(F[C-E][0-9A-F][0-9A-F]:)|(::)/;

export async function uploadFromUrl({
	url,
	user,
	folderId = null,
	uri = null,
	sensitive = false,
	force = false,
	isLink = false,
	comment = null,
	requestIp = null,
	requestHeaders = null,
}: Args): Promise<DriveFile> {
	const parsedUrl = new URL(url);
	if (
		process.env.NODE_ENV === "production" &&
		(PRIVATE_IPV4.test(parsedUrl.hostname) ||
			PRIVATE_IPV6.test(parsedUrl.hostname) ||
			parsedUrl.hostname.includes("localhost"))
	) {
		throw new Error("Private IP is not allowed");
	}

	let name = parsedUrl.pathname.split("/").pop() || null;
	if (name == null || !DriveFiles.validateFileName(name)) {
		name = null;
	}

	// If the comment is same as the name, skip comment
	// (image.name is passed in when receiving attachment)
	if (comment !== null && name === comment) {
		comment = null;
	}

	// Create temp file
	const [path, cleanup] = await createTemp();

	try {
		// write content at URL to temp file
		await downloadUrl(url, path);

		const driveFile = await addFile({
			user,
			path,
			name,
			comment,
			folderId,
			force,
			isLink,
			url,
			uri,
			sensitive,
			requestIp,
			requestHeaders,
		});
		logger.succ(`Got: ${driveFile.id}`);
		return driveFile!;
	} catch (e) {
		logger.error(`Failed to create drive file: ${e}`, {
			url: url,
			e: e,
		});
		throw e;
	} finally {
		cleanup();
	}
}
