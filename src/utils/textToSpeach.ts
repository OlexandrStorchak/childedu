export const textToSpeach = async (item: string, voice:SpeechSynthesisVoice) => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(item)
    speech.voice = voice
    speech.rate = 0.8;
    speechSynthesis.speak(speech)
  } else {
    alert('Text-to-speech is not supported in this browser.')
  }
}
