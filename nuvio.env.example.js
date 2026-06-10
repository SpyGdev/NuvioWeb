(function configureNuvioPublicEnv() {
  var root = typeof globalThis !== "undefined" ? globalThis : window;
  root.__NUVIO_ENV__ = Object.assign({}, root.__NUVIO_ENV__ || {}, {
    SUPABASE_URL: "https://dpyhjjcoabcglfmgecug.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweWhqamNvYWJjZ2xmbWdlY3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3ODYyNDcsImV4cCI6MjA4NjM2MjI0N30.U-3QSNDdpsnvRk_7ZL419AFTOtggHJJcmkodxeXjbkg",
    TV_LOGIN_REDIRECT_BASE_URL: "https://nuvioapp.space/tv-login",
    PUBLIC_APP_URL: "",
    YOUTUBE_PROXY_URL: "https://nuviomedia.github.io/NuvioWeb/youtube-proxy.html",
    PARENTAL_GUIDE_API_URL: "https://api.imdbapi.dev/",
    INTRODB_API_URL: "https://api.introdb.app/",
    IMDB_RATINGS_API_BASE_URL: "https://seriesgraph.com/",
    AVATAR_PUBLIC_BASE_URL: "https://dpyhjjcoabcglfmgecug.supabase.co/storage/v1/object/public/avatars",
    CONTRIBUTIONS_URL: "https://gitserver.tapframe.space/api/unique-contributions",
    DONATIONS_BASE_URL: "https://donations.nuvioapp.space/",
    DONATIONS_DONATE_URL: "https://ko-fi.com/tapframe",
    ADDON_REMOTE_BASE_URL: "",
    WEBOS_SERVICE_ID: "space.nuvio.webos.service",
    ENABLE_REMOTE_WRAPPER_MODE: false,
    PREFERRED_PLAYBACK_ORDER: ["native-file", "platform-avplay", "native-hls", "hls.js", "dash.js"],
    TMDB_API_KEY: "439c478a771f35c05022f9feabcca01c",
    TRAKT_CLIENT_ID: "5783db7c46a5b22f072d4b224f9bd7dc2cbaba66dbe3515d1feb59e3ca72394c",
    TRAKT_CLIENT_SECRET: "bf6e7561dafee902f5a2a67d2b31feac1563632f331f3958c978aff6389ea384",
    TRAKT_API_URL: "https://api.trakt.tv",
    TRAKT_REDIRECT_URI: "nuvio://auth/trakt"
  });
}());
