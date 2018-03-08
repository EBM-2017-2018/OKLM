module.exports = {};

module.exports.score = {
  score: {
    $meta: 'textScore',
  },
};
module.exports.textSearch = fields => ({
  $text: {
    $search: fields,
    $language: 'fr',
    $diacriticSensitive: true,
  },
});
