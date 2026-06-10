export const MEDIA_MIME_TYPES_BY_EXTENSION = {
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
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
  mts: "video/mp2t",
  tp: "video/mp2t",
  trp: "video/mp2t",
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

export const VIDEO_CODEC_ALIASES = {
  avc: "avc",
  avc1: "avc",
  h264: "avc",
  "h.264": "avc",
  x264: "avc",
  hevc: "hevc",
  hev1: "hevc",
  hvc1: "hevc",
  h265: "hevc",
  "h.265": "hevc",
  x265: "hevc"
};

const WEBOS_NATIVE_VIDEO_CODEC_MIME_TYPES = {
  // LG webOS TV docs list H.264/AVC for .avi, .mp4/.m4v/.mov, .3gp/.3g2, .mkv, and .ts/.trp/.tp/.mts.
  avc: new Set([
    "video/3gpp",
    "video/3gpp2",
    "video/mp4",
    "video/quicktime",
    "video/x-matroska",
    "video/x-msvideo",
    "video/mp2t"
  ]),
  // LG webOS TV docs list HEVC for .mp4/.m4v/.mov, .mkv, and .ts/.trp/.tp/.mts.
  hevc: new Set([
    "video/mp4",
    "video/quicktime",
    "video/x-matroska",
    "video/mp2t"
  ])
};

const MEDIA_EXTENSION_PATTERN = /\.(3g2|3gp|aac|avi|flac|m2ts|m4v|mkv|mov|mp3|mp4|mpeg|mpg|mts|tp|trp|ts|webm|wmv)(?=($|[/?#&]))/i;
const VIDEO_CODEC_PATTERN = /\b(avc1|avc|h\.?264|x264|hev1|hvc1|hevc|h\.?265|x265)\b/i;

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

export function normalizeVideoCodec(value = "") {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, ".")
    .replace(/\s+/g, "");
  return VIDEO_CODEC_ALIASES[normalized] || "";
}

export function extractVideoCodec(value = "") {
  const match = String(value || "").match(VIDEO_CODEC_PATTERN);
  return match ? normalizeVideoCodec(match[1]) : "";
}

export function webOsSupportsNativeVideoCodec(codec = "", mimeType = "") {
  const normalizedCodec = normalizeVideoCodec(codec);
  if (!normalizedCodec) {
    return false;
  }
  const supportedContainers = WEBOS_NATIVE_VIDEO_CODEC_MIME_TYPES[normalizedCodec];
  return Boolean(supportedContainers?.has(normalizeMimeType(mimeType)));
}

export function normalizeDeclaredMediaType(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }
  if (raw.includes("/")) {
    const normalizedMime = raw.toLowerCase();
    const codecOnlyMimeTypes = new Set([
      "video/avc",
      "video/h264",
      "video/h265",
      "video/hevc",
      "video/x-h264",
      "video/x-h265"
    ]);
    if (codecOnlyMimeTypes.has(normalizeMimeType(normalizedMime))) {
      return null;
    }
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
