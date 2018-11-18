const React = require('react');
const SoundButton = require('./SoundButton').default;
const styles = require('./assets/css/styles.css');

export default class Pronunciation extends React.Component {
  render() {
    const { phonetic, sound_url } = this.props.pronunciation;

    return (
      <div>
        <p className={styles.ipa}> /{phonetic}/{'  '}
          {sound_url &&
            <SoundButton url={sound_url} />}
        </p>
      </div>);
  }
};
