import React from 'react'

export default function LimitedText({text,className}) {
    const truncatedText = text.length > 100 ? text.substring(0, 100) + '...' : text;

  return (
    <p className={className}>{truncatedText}</p>
  )
}
