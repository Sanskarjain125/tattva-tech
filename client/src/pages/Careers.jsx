import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Globe,
  Clock,
  TrendingUp,
  Heart,
  Briefcase,
  MapPin,
  CheckCircle,
  X,
  Send,
  Upload,
  FileText,
  Loader2,
  RefreshCw,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchPublicJobs, submitJobApplication } from '../services/api';

export default function Careers({ setActivePage }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);

  const perks = [
    { title: 'Remote Friendly', icon: Globe, desc: 'Work from anywhere with high autonomy.' },
    { title: 'Flexible Work', icon: Clock, desc: 'Flexible asynchronous hours & balance.' },
    { title: 'Learning & Growth', icon: TrendingUp, desc: '$2,000/yr conference & book budget.' },
    { title: 'Great Team Culture', icon: Heart, desc: 'Ego-free, collaborative craftspeople.' },
  ];

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicJobs();
      setJobs(data);
    } catch (err) {
      console.error('Failed to load vacancies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setError(null);
    setApplicationSubmitted(false);
    setFormData({
      applicantName: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      coverLetter: '',
    });
    setResumeFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      if (error) setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!resumeFile) {
      setError('Please upload your resume document (PDF, DOC, or DOCX).');
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append('jobId', selectedJob._id);
      payload.append('jobTitle', selectedJob.title);
      payload.append('applicantName', formData.applicantName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('portfolioUrl', formData.portfolioUrl);
      payload.append('coverLetter', formData.coverLetter);
      payload.append('resume', resumeFile);

      await submitJobApplication(payload);

      setApplicationSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#38bdf8'],
      });
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please check all fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION (Screen 9) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 border-b border-slate-200/80">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Careers at Tattvaa Tech
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Build the Future With Us
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Join a team of passionate thinkers, builders and creators working on impactful technology products.
            </p>

            {/* 4 Perks Badges (Matching Screen 9) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center text-center gap-1.5"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <perk.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{perk.title}</span>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('open-positions');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all inline-flex items-center gap-2"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual: Collaborative Workspace Card with Badge (Matching Screen 9) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 min-h-[340px] flex items-center justify-center p-6 text-center">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 opacity-90"></div>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-center gap-2 text-white">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <span className="font-black text-sm">T</span>
                  </div>
                  <div className="text-left">
                    <div className="text-base font-black tracking-wide">TATTVAA TECH</div>
                    <div className="text-[8px] tracking-[0.2em] text-blue-400 font-bold">IDEAS INTO IMPACT</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  Collaborative spaces designed for deep engineering focus, rapid whiteboarding, and team momentum.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 shadow-xl text-slate-900 text-xs font-bold animate-float-medium select-none">
                  <span className="text-blue-600">✦ Grow</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-cyan-600">Learn</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-indigo-600">Innovate</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= OPEN POSITIONS SECTION ================= */}
        <div id="open-positions" className="mt-16">
          <div className="text-left mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                Join The Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Current Openings ({jobs.length})
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                All roles are managed directly through our real-time MongoDB recruitment pipeline.
              </p>
            </div>
            <button
              onClick={loadJobs}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Roles</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
              <RefreshCw className="w-7 h-7 animate-spin text-blue-600" />
              <span>Checking live vacancies in database...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-400 space-y-2">
              <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">No active vacancies right now</h3>
              <p className="text-xs">Feel free to send your resume via our contact form for future openings.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {job.department}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {job.employmentType}
                      </span>
                      {job.salary && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {job.salary}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>Apply directly with resume</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenApply(job)}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all self-start md:self-center flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ================= APPLY NOW MODAL ================= */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn text-left">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you for applying for the <b>{selectedJob.title}</b> position. Our talent team has been notified and a confirmation email has been dispatched to <b>{formData.email}</b>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  Candidate Application Form
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1 mb-1">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500 mb-5">{selectedJob.department} • {selectedJob.location}</p>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">LinkedIn / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/janedoe"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Resume Upload File */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Resume / CV (PDF, DOC, DOCX) *</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors text-blue-700 w-full justify-center">
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">
                          {resumeFile ? resumeFile.name : 'Choose Resume Document'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Cover Letter / Note to Team</label>
                    <textarea
                      rows="3"
                      placeholder="Tell us what excites you about this role and Tattvaa Tech..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading Resume & Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
