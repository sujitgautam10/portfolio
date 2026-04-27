'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
}

export function TypingAnimation({
  text,
  speed = 50,
  delay = 300,
  className = '',
  cursorClassName = 'bg-primary',
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let charIndex = 0

    const startTyping = () => {
      setIsTyping(true)
      
      const typeInterval = setInterval(() => {
        if (charIndex <= text.length) {
          setDisplayedText(text.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }

    timeoutId = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className={`inline-block ml-0.5 w-0.5 md:w-1 h-5 md:h-6 ${cursorClassName} animate-pulse`} />}
    </span>
  )
}
