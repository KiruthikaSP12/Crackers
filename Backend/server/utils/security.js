import crypto from "crypto";

export const hashPassword = (value) => crypto.createHash("sha256").update(value).digest("hex");
