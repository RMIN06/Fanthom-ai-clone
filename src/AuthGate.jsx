import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Globe2, LockKeyhole, Sparkles, Video } from 'lucide-react';
import { supabase, supabaseConfigured } from './lib/supabase';

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signInGoogle() {
    setMessage('Opening Google sign-in…');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) setMessage(error.message);
  }

  async function signInEmail(e) {
    e.preventDefault();
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    setMessage(error ? error.message : 'Check your inbox for a secure sign-in link.');
  }

  if (!supabaseConfigured) return <>{children}</>;
  if (loading) return <div className="auth-loading"><div className="auth-logo"><Video size={19}/></div><span>Loading your workspace…</span></div>;
  if (session) return <>{React.cloneElement(children, { session })}</>;

  return <div className="auth-page"><div className="auth-visual"><div className="auth-visual-inner"><div className="brand auth-brand"><span className="brandmark">f</span><span>fathom</span></div><div className="auth-quote">“The best meeting notes are the ones that move the work forward.”<small>— Fathom workspace</small></div><div className="auth-preview"><div className="preview-top"><span className="preview-dot"/><span className="preview-dot yellow"/><span className="preview-dot green"/><span>Q3 Product roadmap</span></div><div className="preview-lines"><i/><i/><i className="short"/><div className="preview-chip"><Sparkles size={13}/> AI summary ready</div></div></div></div></div><div className="auth-card-wrap"><div className="auth-card"><div className="auth-card-icon"><LockKeyhole size={18}/></div><p className="eyebrow">YOUR MEETING INTELLIGENCE</p><h1>Make every meeting count.</h1><p className="auth-subtitle">Capture the conversation, find the signal, and turn decisions into momentum.</p><button className="google-btn" onClick={signInGoogle}><Globe2 size={17}/> Continue with Google <ArrowRight size={15}/></button><div className="or"><span>or continue with email</span></div><form onSubmit={signInEmail}><input type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} /><button className="email-btn">Send magic link <ArrowRight size={15}/></button></form>{message&&<p className="auth-message">{message}</p>}<p className="terms">By continuing, you agree to our Terms and Privacy Policy.</p><div className="auth-trust"><span><Check size={13}/> Free to get started</span><span><Check size={13}/> No credit card</span></div></div></div></div>;
}
