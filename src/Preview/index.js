const React = require('react');
const Pronunciation = require('./Pronunciation').default;
const Definition = require('./Definition').default;
const styles = require('./assets/css/styles.css');

export default class Preview extends React.Component {
  render() {
    const word = this.props.word;
    return (
      <div className={styles.preview} id={word.id}>
        <h1 className={styles.header}>{word.title} </h1>
        {word.pronunciations &&
            <Pronunciation pronunciations={word.pronunciation} lang={'en_US'} />
        }
        {word.senses &&
            <Definition senses={word.senses} part_of_speech={word.subtitle} />
        }
      </div>);
  }
};
