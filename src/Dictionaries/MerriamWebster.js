const apiKey = require('../apiKey');

/**
 *
 * @desc Delete the string after the given char
 * @param  {String} char
 * @param  {String} string
 * @return {String}
 */
const removeAfter = (char, string) => {
  const n = string.indexOf(char);
  string = n === -1 ? string : string.substring(0, n);
  return string;
};

const parseAudioURL = query => {
  const subDir = query.substring(0, 3) === 'bix' ? 'bix' :
    query.substring(0, 2) === 'gg' ? 'gg' :
    !isNan(query[0]) ? 'number' : q[0];
  return `https://media.merriam-webster.com/soundc11/${subDir}/${q}`;
}

const MerriamWebster = {
  api: query =>
    `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(query)}?key=${apiKey.MerriamWebster}`,
  normalize: word => ({
    id: word.meta.uuid, // j3dd21x
    title: removeAfter(':', word.meta.id), // test
    subtitle: word.meta['app-shortdef'].fl, // noun
    pronunciation: {
      phonetic: word.hwi.prs[0].ipa,
      sound_url: parseAudioURL(word.hwi.prs[0].sound.audio),
    },
  }),
};

export default MerriamWebster;
