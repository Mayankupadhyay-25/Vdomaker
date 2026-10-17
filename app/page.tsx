import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  PlayCircle, 
  Calendar, 
  Video, 
  Mail, 
  BarChart3, 
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground dark">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              V
            </div>
            <span className="text-xl font-bold tracking-tight">VdoMaker</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="hidden sm:inline-block text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Button asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[50rem] w-[100rem] opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
          </div>
          
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              VdoMaker 2.0 is now live
            </div>
            
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-8">
              Create & Schedule AI Videos in <span className="text-primary">Seconds</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10">
              The ultimate AI short video generator and auto-scheduler for YouTube Shorts, Instagram Reels, TikTok, and Email campaigns. Turn text into viral videos instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 rounded-full text-base font-semibold w-full sm:w-auto gap-2 group">
                <Link href="/sign-up">
                  Start Creating Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-semibold w-full sm:w-auto gap-2 backdrop-blur-sm bg-background/50 border-border/50">
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 bg-zinc-950">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to go viral</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Automate your entire content pipeline from ideation to distribution.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Video className="h-6 w-6 text-blue-500" />,
                  title: "AI Video Generation",
                  description: "Turn text prompts, articles, or scripts into highly engaging short-form videos with AI avatars and voiceovers."
                },
                {
                  icon: <Calendar className="h-6 w-6 text-purple-500" />,
                  title: "Smart Auto-Scheduler",
                  description: "Connect your YouTube, Instagram, and TikTok accounts to auto-publish content at the best times for your audience."
                },
                {
                  icon: <Mail className="h-6 w-6 text-green-500" />,
                  title: "Email Campaigns",
                  description: "Embed generated videos directly into your email marketing sequences to boost open rates and conversions."
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
                  title: "Advanced Analytics",
                  description: "Track views, engagement, and conversion metrics across all platforms in one unified dashboard."
                }
              ].map((feature, i) => (
                <div key={i} className="group relative rounded-3xl border border-border/50 bg-card/50 p-8 hover:bg-card transition-colors overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background border border-border shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">From prompt to published in minutes.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  VdoMaker simplifies the complex process of video creation and distribution into a few simple clicks.
                </p>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Write a prompt or script", desc: "Just describe what you want, or paste an existing blog post or script." },
                    { step: "02", title: "AI generates the video", desc: "Our engine adds visuals, subtitles, AI voice, and background music instantly." },
                    { step: "03", title: "Schedule everywhere", desc: "Select your platforms and let our scheduler publish at peak engagement times." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                {/* Mockup visual */}
                <div className="relative rounded-2xl border border-border/50 bg-card p-2 shadow-2xl overflow-hidden aspect-square sm:aspect-video lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-purple-500/10"></div>
                  <div className="h-full w-full rounded-xl bg-background border border-border/50 flex flex-col items-center justify-center relative p-8 text-center">
                    <Video className="h-16 w-16 text-primary/50 mb-4" />
                    <div className="h-4 w-3/4 rounded-full bg-muted mb-3"></div>
                    <div className="h-4 w-1/2 rounded-full bg-muted mb-8"></div>
                    
                    <div className="flex gap-4 w-full">
                      <div className="h-24 flex-1 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                         <div className="text-primary font-medium text-sm flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                           Generating AI Video...
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
           <div className="container mx-auto max-w-4xl px-4 sm:px-8 text-center relative z-10">
             <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Ready to scale your video content?</h2>
             <p className="text-xl text-muted-foreground mb-10">
               Join thousands of creators and marketers who are saving 20+ hours a week with VdoMaker.
             </p>
             <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg font-semibold shadow-xl shadow-primary/20">
               <Link href="/sign-up">Start Your Free Trial</Link>
             </Button>
             <p className="mt-4 text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-background pt-16 pb-8">
        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                  V
                </div>
                <span className="text-xl font-bold tracking-tight">VdoMaker</span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-6">
                The all-in-one AI platform to generate, edit, and schedule short-form video content across all your favorite channels.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  <span className="sr-only">YouTube</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">AI Video Generator</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Auto-Scheduler</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Email Integration</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Video Tutorials</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Creator Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} VdoMaker Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
