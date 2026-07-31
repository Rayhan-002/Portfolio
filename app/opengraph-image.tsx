import { ImageResponse } from 'next/og'
import { personal } from '@/lib/data'

export const alt = `${personal.name} — ${personal.tagline}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          color: '#f4f4f5',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            fontWeight: 600,
            color: '#3b82f6',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700 }}>
          {personal.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 500,
            color: '#a1a1aa',
            marginTop: 20,
          }}
        >
          {personal.tagline}
        </div>
      </div>
    ),
    { ...size }
  )
}
