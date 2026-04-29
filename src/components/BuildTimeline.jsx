import { useState } from 'react'

const ACCENT = '#2563EB'
const BORDER = '#E5E5E5'
const TEXT = '#1A1A1A'
const MUTED = '#6B7280'

const milestones = [
  { week: 1, name: 'Research', desc: 'Market gap, persona definition', position: 'above' },
  { week: 2, name: 'Product Brief', desc: 'Scope, revenue model', position: 'below' },
  { week: 3, name: 'UX Design', desc: 'Flow, question reduction', position: 'above' },
  { week: 4, name: 'Build Intake', desc: 'React, Claude Code skills', position: 'below' },
  { week: 5, name: 'Build API', desc: 'Claude integration, proxy', position: 'above' },
  { week: 6, name: 'UI Polish + Ship', desc: 'Vercel deployment, live', position: 'below' },
]

function Card({ milestone }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${BORDER}`,
        borderRadius: '10px',
        padding: '14px 16px',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.12)'
          : '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textAlign: 'left',
        cursor: 'default',
      }}
    >
      <p style={{ margin: '0 0 5px', fontWeight: '700', fontSize: '13px', color: TEXT, lineHeight: 1.3 }}>
        {milestone.name}
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: MUTED, lineHeight: 1.5 }}>
        {milestone.desc}
      </p>
    </div>
  )
}

function Dot({ number }) {
  return (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: ACCENT,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: '700',
      flexShrink: 0,
      position: 'relative',
      zIndex: 1,
      boxShadow: `0 0 0 5px rgba(37,99,235,0.12)`,
    }}>
      {number}
    </div>
  )
}

const COL = 'repeat(6, 1fr)'
const GAP = '12px'
const CONNECTOR_H = '20px'

export default function BuildTimeline() {
  return (
    <section style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Desktop timeline ── */}
      <div className="fsai-timeline-desktop">

        {/* Row 1: above-cards */}
        <div style={{ display: 'grid', gridTemplateColumns: COL, gap: `0 ${GAP}` }}>
          {milestones.map((m) => (
            <div
              key={m.week}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80px' }}
            >
              {m.position === 'above' ? (
                <>
                  <Card milestone={m} />
                  <div style={{ width: '1px', flex: 1, minHeight: CONNECTOR_H, backgroundColor: BORDER }} />
                </>
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </div>
          ))}
        </div>

        {/* Row 2: spine with dots */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: COL, gap: `0 ${GAP}`, padding: '4px 0' }}>
          {/* Spine line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 'calc(8.333% + 0px)',
            right: 'calc(8.333% + 0px)',
            height: '2px',
            backgroundColor: BORDER,
            transform: 'translateY(-50%)',
            zIndex: 0,
          }} />
          {milestones.map((m) => (
            <div
              key={m.week}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}
            >
              <Dot number={m.week} />
            </div>
          ))}
        </div>

        {/* Row 3: week labels */}
        <div style={{ display: 'grid', gridTemplateColumns: COL, gap: `0 ${GAP}`, marginTop: '8px', marginBottom: '4px' }}>
          {milestones.map((m) => (
            <div
              key={m.week}
              style={{ textAlign: 'center', fontSize: '11px', fontWeight: '600', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Week {m.week}
            </div>
          ))}
        </div>

        {/* Row 4: below-cards */}
        <div style={{ display: 'grid', gridTemplateColumns: COL, gap: `0 ${GAP}` }}>
          {milestones.map((m) => (
            <div
              key={m.week}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80px' }}
            >
              {m.position === 'below' ? (
                <>
                  <div style={{ width: '1px', flex: 1, minHeight: CONNECTOR_H, backgroundColor: BORDER }} />
                  <Card milestone={m} />
                </>
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile timeline ── */}
      <div className="fsai-timeline-mobile" style={{ position: 'relative', paddingLeft: '52px' }}>
        {/* Vertical spine */}
        <div style={{
          position: 'absolute',
          left: '17px',
          top: '18px',
          bottom: '18px',
          width: '2px',
          backgroundColor: BORDER,
        }} />

        {milestones.map((m) => (
          <div key={m.week} style={{ position: 'relative', marginBottom: '20px' }}>
            {/* Dot */}
            <div style={{ position: 'absolute', left: '-52px', top: 0 }}>
              <Dot number={m.week} />
            </div>
            {/* Week label */}
            <div style={{ fontSize: '11px', fontWeight: '600', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Week {m.week}
            </div>
            <Card milestone={m} />
          </div>
        ))}
      </div>

      {/* ── Certifications bar ── */}
      <div style={{
        marginTop: '36px',
        padding: '16px 24px',
        background: 'linear-gradient(90deg, #4F46E5, #2563EB 50%, #0EA5E9)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ fontSize: '18px', flexShrink: 0 }}>🎓</span>
        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px', lineHeight: 1.4 }}>
          4 Anthropic certifications completed in parallel
        </span>
      </div>

      <style>{`
        .fsai-timeline-desktop { display: block; }
        .fsai-timeline-mobile  { display: none; }
        @media (max-width: 680px) {
          .fsai-timeline-desktop { display: none; }
          .fsai-timeline-mobile  { display: block; }
        }
      `}</style>
    </section>
  )
}
