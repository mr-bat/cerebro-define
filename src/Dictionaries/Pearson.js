function parsePronunciation(pronunciations,lang){
  switch(lang){
    case 'en_GB':
      return pronunciations[0].ipa;
    case 'en_US':
      return pronunciations[1] ? pronunciations[1].ipa : pronunciations[0].ipa;
  }
};

function parseAudioURL(pronunciations,lang){
  const entrypoint = 'http://api.pearson.com';
  switch(lang){
    case 'en_GB':
      return entrypoint + pronunciations[0].audio[0].url;
      break;
    case 'en_US':
      if(pronunciations[1]){
        return entrypoint + pronunciations[1].audio[0].url
      }else if(pronunciations[0].audio[1]){
        return entrypoint + pronunciations[0].audio[1].url
      }else{
        return entrypoint +  pronunciations[0].audio[0].url;
      }
      break;
  }
};

const Pearson = {
  api: query =>
    `http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=${encodeURIComponent(query)}`,
  normalize: word => ({
    id: word.id,
    title: word.headword,
    subtitle: word.part_of_speech,
    pronunciation: {
      phonetic: word.pronunciations.pronunciations[0].ipa ? parsePronunciation(senses.pronunciations, senses.lang) : '',
      sound_url: word.pronunciations.pronunciations[0].audio ? parseAudioURL(senses.pronunciations, senses.lang) : '',
    },
  }),
};

export default Pearson;
