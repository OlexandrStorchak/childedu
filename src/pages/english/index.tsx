import { useState } from 'react';
import { animals, emotions, food, fruits, nature, sports, sweets, technology, transportation, weather } from '../../constants';
import styles from '../../styles/English.module.css'
import VoiceSelect from '../../components/english/VoiceSelect';
import Items from '../../components/english/Items';

const English = () => {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  return (
    <div className={styles['sweets-wrapper']}>
      <VoiceSelect selectedVoice={selectedVoice} setSelectedVoice={setSelectedVoice} />
      <Items items={fruits} selectedVoice={selectedVoice} />
      <Items items={sweets} selectedVoice={selectedVoice} />
      <Items items={weather} selectedVoice={selectedVoice} />
      <Items items={animals} selectedVoice={selectedVoice} />
      <Items items={transportation} selectedVoice={selectedVoice} />
      <Items items={sports} selectedVoice={selectedVoice} />
      <Items items={emotions} selectedVoice={selectedVoice} />
      <Items items={technology} selectedVoice={selectedVoice} />
      <Items items={food} selectedVoice={selectedVoice} />
      <Items items={nature} selectedVoice={selectedVoice} />
    </div>
  );
}

export default English
