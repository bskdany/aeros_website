import './App.css'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// either row level security works or I'm cooked 
const supabase = createClient(
  "https://blhpohmlkkmzorsivtvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaHBvaG1sa2ttem9yc2l2dHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc1NzQsImV4cCI6MjA1NzQ1MzU3NH0.G2BtM9tNMPiYPmS27ArqblW86w-Yri_FfxS7Kkq31cg"
);

function App() {
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
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100vh',
      minHeight: '100vh',
      }}>

      <div>
        <div style={{fontSize: '10em'}}>æros</div>
        <div style={{fontSize: '2em'}}>Because your attention is valuable</div>
      </div>


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
                padding: '12px 16px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginRight: '8px',
                backgroundColor: 'white',
                width: '240px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ccc';
                e.target.style.boxShadow = 'none';
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
                color: 'white',
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

    </div>
     
    </>
  )
}

export default App;