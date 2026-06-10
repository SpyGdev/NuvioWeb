export const MEDIA_MIME_TYPES_BY_EXTENSION = {
  "3gp": "video/3gpp",
  aac: "audio/aac",
  avi: "video/x-msvideo",
  flac: "audio/flac",
  m2ts: "video/mp2t",
  m4v: "video/mp4",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  ts: "video/mp2t",
  webm: "video/webm",
  wmv: "video/x-ms-wmv"
};

export const DIRECT_VIDEO_MIME_TYPES = new Set([
  "video/mp4",
  "video/x-matroska",
  "video/x-msvideo",
  "video/quicktime",
  "video/webm",
  "video/mp2t",
  "video/mpeg"
]);

const MEDIA_EXTENSION_PATTERN = /\.(3gp|aac|avi|flac|m2ts|m4v|mkv|mov|mp3|mp4|mpeg|mpg|ts|webm|wmv)(?=($|[/?#&]))/i;

export function normalizeMimeType(mimeType) {
  return String(mimeType || "").toLowerCase().split(";")[0].trim();
}

export function normalizeMediaExtension(value = "") {
  return String(value || "").trim().toLowerCase().replace(/^\.+/, "");
}

export function getMediaMimeTypeForExtension(extension = "") {
  return MEDIA_MIME_TYPES_BY_EXTENSION[normalizeMediaExtension(extension)] || null;
}

export function getMediaExtensionFromPath(path = "") {
  const match = String(path || "").toLowerCase().match(MEDIA_EXTENSION_PATTERN);
  return match ? normalizeMediaExtension(match[1]) : "";
}

export function guessMediaMimeTypeFromPath(path = "") {
  return getMediaMimeTypeForExtension(getMediaExtensionFromPath(path));
}

export function hasKnownMediaExtension(path = "") {
  return Boolean(getMediaExtensionFromPath(path));
}

export function isDirectVideoMimeType(mimeType = "") {
  return DIRECT_VIDEO_MIME_TYPES.has(normalizeMimeType(mimeType));
}

export function normalizeDeclaredMediaType(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }
  if (raw.includes("/")) {
    const normalizedMime = raw.toLowerCase();
    const mimeAliases = {
      "application/x-matroska": "video/x-matroska",
      "video/avi": "video/x-msvideo",
      "video/msvideo": "video/x-msvideo",
      "video/mpegts": "video/mp2t",
      "video/vnd.dlna.mpeg-tts": "video/mp2t",
      "video/x-m2ts": "video/mp2t",
      "video/x-mpegts": "video/mp2t",
      "video/x-mpegurl": "application/vnd.apple.mpegurl"
    };
    return mimeAliases[normalizeMimeType(normalizedMime)] || normalizedMime;
  }

  const normalized = normalizeMediaExtension(raw);
  const aliases = {
    dash: "application/dash+xml",
    hls: "application/vnd.apple.mpegurl",
    m3u8: "application/vnd.apple.mpegurl",
    matroska: "video/x-matroska",
    mpegts: "video/mp2t",
    "mpeg-ts": "video/mp2t",
    quicktime: "video/quicktime",
    mpd: "application/dash+xml"
  };
  return aliases[normalized] || getMediaMimeTypeForExtension(normalized);
}
