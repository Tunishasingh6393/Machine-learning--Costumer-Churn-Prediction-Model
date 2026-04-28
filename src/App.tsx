import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  PhoneCall, 
  Mail, 
  Ticket,
  BarChart3,
  Calendar,
  LayoutDashboard,
  LogOut,
  Bell
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Customer } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [custRes, statsRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/stats')
        ]);
        const custData = await custRes.json();
        const statsData = await statsRes.json();
        setCustomers(custData);
        setStats(statsData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchesTab = activeTab === 'all' || c.riskLevel.toLowerCase() === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAction = async (customerId: string, action: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, action })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Action failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-10 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">ChurnGuard AI</span>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
            <NavItem icon={<Users size={20} />} label="Customers" />
            <NavItem icon={<BarChart3 size={20} />} label="ML Insights" />
            <NavItem icon={<Bell size={20} />} label="Alerts" />
            <NavItem icon={<Calendar size={20} />} label="Retention Plan" />
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-100">
          <NavItem icon={<LogOut size={20} />} label="Sign Out" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Success-Ops Dashboard</h1>
            <p className="text-slate-500 mt-1">Predictive churn monitoring & proactive retention.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Customers" 
            value={stats?.totalCustomers.toLocaleString()} 
            change="+12% from last month" 
            icon={<Users className="text-blue-600" />} 
          />
          <StatCard 
            title="At-Risk (High)" 
            value={stats?.atRisk} 
            change="-2.1% trend" 
            icon={<AlertTriangle className="text-red-500" />} 
            trend="down"
          />
          <StatCard 
            title="Avg Churn Risk" 
            value={stats?.predictedChurnRate} 
            change="Stable" 
            icon={<TrendingDown className="text-amber-500" />} 
          />
          <StatCard 
            title="Retention Lift" 
            value={stats?.retentionLift} 
            change="Target: +5%" 
            icon={<CheckCircle2 className="text-emerald-500" />} 
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main List */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Predictive Worklist</h2>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {['all', 'high', 'medium', 'low'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={cn(
                        "px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all",
                        activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {tab} Risk
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="pb-4 px-2">Customer</th>
                      <th className="pb-4 px-2">Contract</th>
                      <th className="pb-4 px-2 text-center">Metric Score</th>
                      <th className="pb-4 px-2">Risk Status</th>
                      <th className="pb-4 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode='popLayout'>
                      {filteredCustomers.map((customer) => (
                        <motion.tr 
                          key={customer.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 group-hover:border-blue-200 transition-colors">
                                {customer.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{customer.name}</div>
                                <div className="text-xs text-slate-400">{customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                              {customer.contractType}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-mono font-bold text-blue-600">
                                {(customer.churnProbability * 100).toFixed(1)}%
                              </span>
                              <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${customer.churnProbability * 100}%` }}
                                  className={cn(
                                    "h-full",
                                    customer.riskLevel === 'High' ? "bg-red-500" : 
                                    customer.riskLevel === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                                  )}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset",
                              customer.riskLevel === 'High' ? "bg-red-50/50 text-red-600 ring-red-200" :
                              customer.riskLevel === 'Medium' ? "bg-amber-50/50 text-amber-600 ring-amber-200" :
                              "bg-emerald-50/50 text-emerald-600 ring-emerald-200"
                            )}>
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                customer.riskLevel === 'High' ? "bg-red-500 animate-pulse" :
                                customer.riskLevel === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                              )} />
                              {customer.riskLevel}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(customer.id, customer.suggestedAction);
                              }}
                              className="p-2 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-lg transition-all text-slate-400 hover:text-blue-600"
                            >
                              <ArrowUpRight size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Risk Factor Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Support Vol', value: 85 },
                    { name: 'Billing Issues', value: 45 },
                    { name: 'Low Usage', value: 30 },
                    { name: 'Contract End', value: 92 },
                    { name: 'Price Sensitivity', value: 64 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {[85, 45, 30, 92, 64].map((v, i) => (
                        <Cell key={i} fill={v > 70 ? '#ef4444' : v > 40 ? '#f59e0b' : '#3b82f6'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Side Panel: Insights */}
          <div className="space-y-6">
            <div className="bg-blue-600 rounded-3xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Retention Play</h3>
                <p className="text-blue-100 text-sm mb-6">
                  System has identified 12 customers eligible for "Loyalty Saver" campaign.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Review Campaign
                </button>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl shadow-inner" />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Risk Insight</h3>
              {selectedCustomer ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Driver Breakdown</div>
                    <div className="space-y-2">
                       <ProgressBar label="Support Intensity" val={selectedCustomer.supportCalls * 10} color="bg-red-400" />
                       <ProgressBar label="Engagement Drop" val={100 - (selectedCustomer.usageGb / 6)} color="bg-amber-400" />
                       <ProgressBar label="Billing Variance" val={selectedCustomer.monthlyCharges / 2} color="bg-blue-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <ActionButton icon={<PhoneCall size={16} />} label="Customer Callback" onClick={() => handleAction(selectedCustomer.id, 'CallBack')} />
                    <ActionButton icon={<Mail size={16} />} label="Send Retention Email" onClick={() => handleAction(selectedCustomer.id, 'Email')} />
                    <ActionButton icon={<Ticket size={16} />} label="Issue Promo Credit" variant="outline" onClick={() => handleAction(selectedCustomer.id, 'Credit')} />
                  </div>
                </motion.div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 gap-2 border-2 border-dashed border-slate-100 rounded-2xl">
                  <LayoutDashboard size={32} strokeWidth={1.5} />
                  <p className="text-xs">Select a customer for deep analysis</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Churn Probability Log</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'M', v: 12 }, { day: 'T', v: 15 }, { day: 'W', v: 14 }, 
                    { day: 'T', v: 18 }, { day: 'F', v: 16 }, { day: 'S', v: 19 }, { day: 'S', v: 17 }
                  ]}>
                    <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
                    <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Past 7 Days</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  -2.4% <ArrowUpRight size={12} className="rotate-90" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        active 
          ? "bg-blue-50 text-blue-700 font-bold" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}

function StatCard({ title, value, change, icon, trend }: { title: string, value: string, change: string, icon: React.ReactNode, trend?: 'up' | 'down' }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-slate-50 rounded-xl">
          {icon}
        </div>
        <div className={cn(
          "text-xs font-bold px-2 py-0.5 rounded-md",
          trend === 'up' ? "bg-emerald-50 text-emerald-600" : 
          trend === 'down' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
        )}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change.split(' ')[0]}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{title}</div>
    </div>
  );
}

function ProgressBar({ label, val, color }: { label: string, val: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
        <span>{label}</span>
        <span>{Math.min(100, Math.round(val))}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, val)}%` }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, variant = 'primary' }: { icon: React.ReactNode, label: string, onClick: () => void, variant?: 'primary' | 'outline' }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all",
        variant === 'primary' ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
