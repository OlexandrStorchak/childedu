import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
    } else {
      console.log('Speech synthesis is not supported in this browser.')
    }
  }, [])

}
