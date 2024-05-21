import { useEffect, useState } from "react";
import styles from '../../../styles/English.module.css'
import Separator from "../../separator";

interface IVoiceSelect {
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void
}

const VoiceSelect = ({ setSelectedVoice, selectedVoice }: IVoiceSelect) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number | null>(0);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const storedVoice = window.localStorage.getItem('voice')
      const availableVoices = window.speechSynthesis.getVoices()
      const filteredVoices = availableVoices.filter(voice => voice.lang.includes('en-US'))
      const voiceIndex = availableVoices.findIndex((v) => v.voiceURI === storedVoice)
      setSelectedVoiceIndex(parseInt(window.localStorage.getItem('voiceIndex')!))
      setVoices(filteredVoices)
      setSelectedVoice(availableVoices[voiceIndex])
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    if (selectedVoice) { window.localStorage.setItem('voice', selectedVoice.voiceURI) }
  }, [selectedVoice])

  const onVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(voices[parseInt(e.target.value)])
    setSelectedVoiceIndex(parseInt(e.target.value))
    window.localStorage.setItem('voiceIndex', e.target.value)
  }

  return (
    <div className={styles.sweets}>
      <select onChange={onVoiceChange}
        value={selectedVoiceIndex!}>
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            🗣️ {voice.name}
          </option>
        ))}
      </select>
      <Separator />
    </div>
  );
};

export default VoiceSelect;
