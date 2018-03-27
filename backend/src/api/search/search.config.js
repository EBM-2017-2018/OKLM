module.exports = {};

module.exports.sort = {
  score: {
    score: {
      $meta: 'textScore',
    },
  },
  date_asc: ['creationTime', 1],
  date_desc: ['creationTime', -1],
  rank: ['$score', -1],
  rank1: ['$meta', 'textScore'],
};
module.exports.textSearch = fields => ({
  $text: {
    $search: fields,
    $diacriticSensitive: false,
  },
});
module.exports.score = {
  score: {
    $meta: 'textScore',
  },
};
