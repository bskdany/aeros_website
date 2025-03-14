import './App.css'
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// either row level security works or I'm cooked 
const supabase = createClient(
  "https://blhpohmlkkmzorsivtvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaHBvaG1sa2ttem9yc2l2dHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc1NzQsImV4cCI6MjA1NzQ1MzU3NH0.G2BtM9tNMPiYPmS27ArqblW86w-Yri_FfxS7Kkq31cg"
);

function App() {
  const [isDesktop, setIsDesktop] = useState(() => {
    // Safe check for window object (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 768px)').matches;
    }
    return false; // Default to mobile view when window isn't available
  });

  // Improved window resize listener using matchMedia
  useEffect(() => {
    // Skip if window is not available
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    // Set initial value (in case the initial state calculation was wrong)
    setIsDesktop(mediaQuery.matches);
    
    // Define handler function
    const handleResize = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    
    // Add event listener with browser compatibility
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleResize);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleResize);
      }
    };
  }, []);


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
<div className="waitlist-form" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
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
                marginRight: '8px',
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