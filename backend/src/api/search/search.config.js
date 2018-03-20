module.exports = {};

module.exports.sort = {
  score: {
    score: {
      $meta: 'textScore',
    },
  },
  date_asc: ['creationTime', 1],
  date_desc: ['creationTime', -1],
  rank: 3['$score', -1],
};
module.exports.textSearch = fields => ({
  $text: {
    $search: fields,
    $language: 'fr',
    $diacriticSensitive: false,
  },
});
module.exports.score = {
  score: {
    $meta: 'textScore',
  },
};
