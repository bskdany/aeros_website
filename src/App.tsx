import './App.css'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// either row level security works or I'm cooked 
const supabase = createClient(
  "https://blhpohmlkkmzorsivtvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaHBvaG1sa2ttem9yc2l2dHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc1NzQsImV4cCI6MjA1NzQ1MzU3NH0.G2BtM9tNMPiYPmS27ArqblW86w-Yri_FfxS7Kkq31cg"
);

function App() {
  return (
    <>
      <div className="app-container">
        <div className="content-section">
          <div> 
            <div className="title">Go Grind</div>
            <div className="subtitle">Because honestly wtf</div>
          </div>
          <Waitlist />
        </div>
      
        <div className="video-container">
          <Video />
        </div>
      </div>
    </>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error
      
      setMessage('Thanks for joining our waitlist!')
      setEmail('')
      setSubmitted(true)
    } catch (error) {
      setMessage('Error joining waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="waitlist-form">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              boxSizing: 'border-box',
              padding: '12px 16px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              outline: 'none',
              color: "black"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4f46e5';
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '12px 16px',
              fontSize: '16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#4f46e5',
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <p className="message">{message}</p>
        </div>
      )}
      {message && !submitted && <p className="message">{message}</p>}
    </div>
  )
}

function Video(){
  return (
        <video 
          autoPlay 
          muted 
          loop
          playsInline
          style={{
            objectFit: 'contain',  // Maintain aspect ratio
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: 'auto'
          }}
        >
          <source src="/demo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>)
}

export default App;