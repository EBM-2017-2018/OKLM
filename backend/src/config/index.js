module.exports = {
  app: {
    port: process.env.APP_PORT || 4000,
  },
  auth: {
    provider: process.env.AUTH_PROVIDER,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  filesystem: {
    uploadPath: process.env.FILESYSTEM_UPLOAD_PATH,
  },
};
