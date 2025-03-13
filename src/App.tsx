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
    } catch (error) {
      setMessage('Error joining waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>æros</h1>
      <div className="waitlist-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  )
}

export default App;