import './App.css'
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// either row level security works or I'm cooked 
const supabase = createClient(
  "https://blhpohmlkkmzorsivtvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaHBvaG1sa2ttem9yc2l2dHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc1NzQsImV4cCI6MjA1NzQ1MzU3NH0.G2BtM9tNMPiYPmS27ArqblW86w-Yri_FfxS7Kkq31cg"
);

function App() {
  const [isDesktop, setIsDesktop] = useState(false)

  // Add window resize listener to detect desktop vs mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])


  if(isDesktop){
    return (
        <>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'center',
          justifyContent: 'center',
          gap: '10vw',
          }}>

          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'space-around'}}>
            <div> 
              <div style={{fontSize: '10em'}}>æros</div>
              <div style={{fontSize: '1.4em'}}>Because your attention is valuable</div>
            </div>
            <Waitlist/>
          </div>
        
          <div style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Video/>
          </div>
        </div>
        </>
      )
  }
  else{
    return (
        <>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          justifyContent: 'center',
          gap: '10vw',
          }}>

          <div>
            <div style={{fontSize: '10em'}}>æros</div>
            <div style={{fontSize: '1.4em'}}>Because your attention is valuable</div>
          </div>
        
          <div style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Video/>
          </div>

          <Waitlist/>

        </div>
        </>
      )
  }
  
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
<div className="waitlist-form" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
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
      </div>)
}

function Video(){
  return (
        <video 
          autoPlay 
          muted 
          loop
          playsInline
          style={{
            height: '100%',  // Take full height of container
            maxHeight: '100%',
            objectFit: 'contain',  // Maintain aspect ratio
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <source src="/demo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>)
}

export default App;