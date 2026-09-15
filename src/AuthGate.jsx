import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Globe2, LockKeyhole, Sparkles, Video, Share2, Clock3 } from 'lucide-react';
import { supabase, supabaseConfigured } from './lib/supabase';
import BrandLogo from './BrandLogo';

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const sharedMeeting = readSharedMeeting();

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

  if (sharedMeeting) return <SharedMeeting meeting={sharedMeeting} />;
  if (!supabaseConfigured) return <>{children}</>;
  if (loading) return <div className="auth-loading"><div className="auth-logo"><BrandLogo iconOnly/></div><span>Loading your workspace…</span></div>;
  if (session) return <>{React.cloneElement(children, { session })}</>;

  return showLogin ? <div className="auth-page"><div className="auth-visual"><div className="auth-visual-inner"><div className="brand auth-brand"><span className="brandmark">f</span><span>fathom</span></div><div className="auth-quote">“The best meeting notes are the ones that move the work forward.”<small>— Fathom workspace</small></div><div className="auth-preview"><div className="preview-top"><span className="preview-dot"/><span className="preview-dot yellow"/><span className="preview-dot green"/><span>Q3 Product roadmap</span></div><div className="preview-lines"><i/><i/><i className="short"/><div className="preview-chip"><Sparkles size={13}/> AI summary ready</div></div></div></div></div><div className="auth-card-wrap"><div className="auth-card"><button className="back-link" onClick={() => setShowLogin(false)}><ArrowRight size={14}/> Back to overview</button><div className="auth-card-icon"><LockKeyhole size={18}/></div><p className="eyebrow">YOUR MEETING INTELLIGENCE</p><h1>Make every meeting count.</h1><p className="auth-subtitle">Capture the conversation, find the signal, and turn decisions into momentum.</p><button className="google-btn" onClick={signInGoogle}><Globe2 size={17}/> Continue with Google <ArrowRight size={15}/></button><div className="or"><span>or continue with email</span></div><form onSubmit={signInEmail}><input type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} /><button className="email-btn">Send magic link <ArrowRight size={15}/></button></form>{message&&<p className="auth-message">{message}</p>}<p className="terms">By continuing, you agree to our Terms and Privacy Policy.</p><div className="auth-trust"><span><Check size={13}/> Free to get started</span><span><Check size={13}/> No credit card</span></div></div></div></div> : <MarketingLanding onStart={() => setShowLogin(true)} onLogin={() => setShowLogin(true)}/>;
}

function MarketingLanding({ onStart, onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <div className="marketing-page"><header className={`marketing-nav ${scrolled ? 'scrolled' : ''}`}><div className="marketing-inner"><div className="brand marketing-brand"><span className="brandmark">f</span><span>fathom</span></div><nav><a href="#product">Product</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a></nav><div className="marketing-actions"><button className="login-link" onClick={onLogin}>Log in</button><button className="marketing-cta" onClick={onStart}>Get started free <ArrowRight size={15}/></button></div></div></header><main><section className="marketing-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="marketing-hero-copy"><span className="hero-kicker"><Sparkles size={14}/> Your meeting, made useful</span><h1>Be present.<br/><span>Remember everything.</span></h1><p>Fathom turns the conversations you care about into clear notes, decisions, and next steps — automatically.</p><div className="hero-actions"><button className="marketing-cta large" onClick={onStart}>Start for free <ArrowRight size={16}/></button><span className="hero-note"><Check size={14}/> No credit card · takes 30 seconds</span></div></div><div className="trust-row"><span>Trusted by teams who think out loud</span><i/> <strong>2,400+ conversations organized</strong></div></section><section className="product-frame" id="product"><div className="browser-chrome"><span/><span/><span/><strong>Fathom workspace</strong></div><div className="product-preview"><div className="preview-sidebar"><div className="preview-logo"><span className="brandmark">f</span> fathom</div><div className="preview-nav active"><LayoutIcon/> Meetings</div><div className="preview-nav"><Search size={13}/> Ask</div><div className="preview-nav"><TagIcon/> Highlights</div></div><div className="preview-main"><small>YOUR MEETING INTELLIGENCE</small><h3>Good morning, Alex <Sparkles size={16}/></h3><div className="preview-stats"><b>3<small>meetings this week</small></b><b>8.4<small>hours captured</small></b><b>9<small>action items</small></b></div><div className="preview-detail"><div><strong>Q3 Product roadmap</strong><span>Today · 42 min</span></div><div className="preview-summary"><Sparkles size={13}/><span>AI summary ready</span></div></div></div></div></section><section className="feature-section" id="solutions"><div className="section-intro"><span className="hero-kicker">THE FULL LOOP</span><h2>Less note-taking.<br/>More moving forward.</h2></div><div className="feature-grid"><Feature icon={<Sparkles/>} title="Clarity" text="A calm, accurate transcript and an AI summary you can trust at a glance."/><Feature icon={<Search/>} title="Momentum" text="Ask across every conversation and jump to the exact moment behind the answer."/><Feature icon={<CalendarDays/>} title="Ease" text="Connect your calendar once. Your meeting workspace keeps itself ready."/></div></section><section className="stats-band"><div><strong>18k+</strong><span>hours reclaimed</span></div><div><strong>94%</strong><span>summary confidence</span></div><div><strong>3.2×</strong><span>faster follow-through</span></div></section><section className="integrations"><span>Works with the calls you already use</span><div><Integration name="Zoom"/><Integration name="Google Meet"/><Integration name="Teams"/><Integration name="Slack"/></div></section><section className="marketing-final" id="pricing"><div><span className="hero-kicker">YOUR NEXT CALL IS A BETTER NOTE</span><h2>Show up for the conversation.<br/>We’ll handle the rest.</h2><button className="marketing-cta light" onClick={onStart}>Build your meeting memory <ArrowRight size={16}/></button></div></section></main><footer className="marketing-footer"><div className="brand marketing-brand"><span className="brandmark">f</span><span>fathom</span></div><div><strong>Product</strong><a href="#product">How it works</a><a href="#solutions">Ask your meetings</a></div><div><strong>Company</strong><a href="#pricing">Pricing</a><a href="#product">Security</a></div><div><strong>Legal</strong><a href="#product">Privacy</a><a href="#product">Terms</a></div><small>© 2025 Fathom workspace. Built for better conversations.</small></footer></div>;
}
function Feature({ icon, title, text }) { return <article className="feature"><div className="feature-icon">{React.cloneElement(icon, { size: 18 })}</div><h3>{title}</h3><p>{text}</p></article>; }
function Integration({ name }) { return <span className="integration"><i>{name.slice(0, 1)}</i>{name}</span>; }
function LayoutIcon() { return <span className="tiny-grid"><i/><i/><i/><i/></span>; }
function TagIcon() { return <span className="tiny-tag">◆</span>; }

function readSharedMeeting() {
  const match = window.location.hash.match(/^#shared=([^&]+)/);
  if (!match) return null;
  try {
    const base64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(decodeURIComponent(escape(window.atob(padded))));
  } catch {
    return null;
  }
}

function SharedMeeting({ meeting }) {
  return <div className="shared-page"><div className="shared-shell"><div className="shared-brand"><span className="brandmark">f</span><span>fathom</span><span className="shared-badge"><Share2 size={12}/> Shared meeting</span></div><div className="shared-meta"><span>{meeting.topic || 'Meeting notes'}</span><span>·</span><span>{meeting.date}</span><span>·</span><span><Clock3 size={12}/> {meeting.duration}</span></div><h1>{meeting.title}</h1><p className="shared-intro">A concise meeting record with the decisions, follow-ups, and transcript moments worth sharing.</p><section className="shared-summary"><div className="shared-label"><Sparkles size={15}/> AI SUMMARY</div><p>{meeting.summary}</p></section><div className="shared-columns"><section><h2>Highlights</h2>{(meeting.highlights || []).map((item, index) => <div className="shared-highlight" key={index}><span>{['04:18', '12:42', '21:06'][index] || '00:00'}</span><strong>{typeof item === 'object' ? item.text : item}</strong></div>)}</section><section><h2>Transcript</h2>{(meeting.transcript || []).map((row, index) => <div className="shared-transcript" key={index}><span>{row[0]}</span><div><strong>{row[1]}</strong><p>{row[2]}</p></div></div>)}</section></div><footer>Made with fathom · Capture the conversation, keep the work moving.</footer></div></div>;
}
