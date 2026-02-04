import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, ShieldCheck, Truck, Users, Activity, CheckCircle2 } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import LandingNavbar from '../components/common/LandingNavbar'
import LandingFooter from '../components/common/LandingFooter'

export default function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Optional: Redirect if already logged in? 
    // Usually landing pages are accessible even if logged in, but the "Get Started" button changes behavior.
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent"></div>
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              New: AI-Powered Demand Forecasting
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Inventory management <br />
              <span className="text-gradient">
                reimagined.
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed mb-8">
              Stop guessing. Start growing. Real-time tracking, supplier management, and powerful analytics to keep your stock in check.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/register')}
                className="btn-click inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
              >
                Start Free Trial <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/login')} // Using login for demo
                className="btn-click inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all hover:border-gray-300"
              >
                View Live Demo
              </button>
            </div>
            <div className="pt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                 ))}
              </div>
              <p>Trusted by 2,000+ companies</p>
            </div>
          </div>
          <div className="relative animate-in slide-in-from-right-5 duration-1000 fade-in delay-200 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white/50 backdrop-blur-xl p-2">
               <img 
                 src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                 alt="Dashboard Preview" 
                 className="rounded-xl w-full h-auto shadow-inner"
               />
               
               {/* Floating cards */}
               <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">Growth</div>
                    <div className="text-lg font-bold text-gray-900">+12.5%</div>
                  </div>
               </div>

               <div className="absolute -top-6 -right-6 p-4 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow" style={{animationDelay: '1s'}}>
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">Orders</div>
                    <div className="text-lg font-bold text-gray-900">1,240</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Powerful Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything you need to manage your inventory</h3>
            <p className="text-lg text-gray-500">From procurement to sales to analytics, we have got you covered with a suite of tools designed for efficiency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <BarChart3 className="text-white" size={24} />, 
                color: 'bg-blue-500',
                title: 'Real-time Analytics', 
                desc: 'Get insights into your sales, stock levels, and profits instantly.' 
              },
              { 
                icon: <Truck className="text-white" size={24} />, 
                color: 'bg-indigo-500',
                title: 'Supplier Management', 
                desc: 'Keep track of all your suppliers and purchase orders in one place.' 
              },
              { 
                icon: <ShieldCheck className="text-white" size={24} />, 
                color: 'bg-teal-500',
                title: 'Secure & Reliable', 
                desc: 'Enterprise-grade security to keep your business data safe.' 
              },
              { 
                icon: <Activity className="text-white" size={24} />, 
                color: 'bg-orange-500',
                title: 'Stock Alerts', 
                desc: 'Get notified when stock is low so you never miss a sale.' 
              },
              { 
                icon: <Users className="text-white" size={24} />, 
                color: 'bg-purple-500',
                title: 'Multi-User Access', 
                desc: 'Assign roles like Admin, Manager, and Staff with specific permissions.' 
              },
               { 
                icon: <Activity className="text-white" size={24} />, 
                color: 'bg-pink-500',
                title: 'Audit Logs', 
                desc: 'Track every action taken in the system for full accountability.' 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift group transition-all duration-300 hover:border-gray-200">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-opacity-20`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 bg-white border-y border-gray-100">
         <div className="container-main text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Mock Logos */}
               {['Acme Corp', 'Global Tech', 'Nebula Inc', 'Circle Systems', 'Fox Run'].map(brand => (
                  <span key={brand} className="text-2xl font-bold font-serif text-gray-400">{brand}</span>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-main">
          <div className="relative bg-gray-900 rounded-3xl p-12 md:p-24 text-center overflow-hidden">
             {/* Abstract background circles */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[150%] rounded-full bg-primary-900/20 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[120%] rounded-full bg-purple-900/20 blur-3xl"></div>
             </div>

             <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to scale your business?</h2>
               <p className="text-lg text-gray-300 mb-10">
                 Join thousands of businesses that use Acme Inventory to save time and increase profits.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button 
                   onClick={() => navigate('/register')}
                   className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-500 transition-colors shadow-lg shadow-primary-900/50"
                 >
                   Get Started for Free
                 </button>
                 <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-transparent border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
                 >
                   Contact Sales
                 </button>
               </div>
               <p className="mt-6 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
             </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
