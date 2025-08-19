import React from 'react'
import styles from '../../styles/Items.module.css'
import { EnglishEntries } from '../../constants/english'
import { textToSpeech } from '../../utils/textToSpeech'
import Separator from '../separator'

interface IItems {
  items: EnglishEntries
  selectedVoice: SpeechSynthesisVoice | null
}

const Items = ({ items, selectedVoice }: IItems) => {
  return (
    <div className={styles.items}>
      {<>{Object.keys(items).map(item => <div key={item} className={styles.item} onClick={() => textToSpeech(String(item), selectedVoice!)}>
        {items[item]}
      </div>)}
      </>}
      <Separator />
    </div>
  )
}

export default Items
