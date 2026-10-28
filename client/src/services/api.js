const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const getHeaders = (token, isFormData = false) => {
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ================= AUTH API =================
export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerAdmin = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const getAdminMe = async (token) => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Authentication check failed');
  return data;
};

// ================= DASHBOARD METRICS =================
export const fetchDashboardStats = async (token) => {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
  return data.data;
};

// ================= CONTACTS / ENQUIRIES =================
export const submitContactEnquiry = async (formData) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit enquiry');
  return data;
};

export const fetchContactsAdmin = async ({ status = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/contact?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch enquiries');
  return data;
};

export const updateContactStatus = async (id, { status, notes }, token) => {
  const res = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify({ status, notes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update enquiry status');
  return data;
};

export const deleteContactEnquiry = async (id, token) => {
  const res = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete enquiry');
  return data;
};

// ================= PROJECTS / WORK =================
export const fetchPublicProjects = async (category = 'All') => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);

  const res = await fetch(`${API_BASE}/projects?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
  return data.data || [];
};

export const fetchAdminProjects = async ({ category = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/projects/admin/all?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin projects');
  return data.data || [];
};

export const createProject = async (formData, token) => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getHeaders(token, true),
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create project');
  return data;
};

export const updateProject = async (id, formData, token) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(token, true),
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update project');
  return data;
};

export const togglePublishProject = async (id, token) => {
  const res = await fetch(`${API_BASE}/projects/${id}/publish`, {
    method: 'PATCH',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle project status');
  return data;
};

export const deleteProject = async (id, token) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete project');
  return data;
};

// ================= JOBS / CAREERS =================
export const fetchPublicJobs = async () => {
  const res = await fetch(`${API_BASE}/jobs`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch vacancies');
  return data.data || [];
};

export const fetchAdminJobs = async ({ status = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/jobs/admin/all?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin jobs');
  return data.data || [];
};

export const createJob = async (jobData, token) => {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create vacancy');
  return data;
};

export const updateJob = async (id, jobData, token) => {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update vacancy');
  return data;
};

export const updateJobStatus = async (id, status, token) => {
  const res = await fetch(`${API_BASE}/jobs/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update job status');
  return data;
};

export const deleteJob = async (id, token) => {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete vacancy');
  return data;
};

// ================= APPLICATIONS =================
export const submitJobApplication = async (formData) => {
  const res = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit application');
  return data;
};

export const fetchAdminApplications = async ({ status = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/applications/admin/all?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch applications');
  return data.data || [];
};

export const updateApplicationStatus = async (id, { status, adminNotes }, token) => {
  const res = await fetch(`${API_BASE}/applications/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify({ status, adminNotes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update application');
  return data;
};

export const deleteApplication = async (id, token) => {
  const res = await fetch(`${API_BASE}/applications/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete application');
  return data;
};

export const downloadResume = async (id, token) => {
  const res = await fetch(`${API_BASE}/applications/${id}/resume`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to download resume');
  }
  const blob = await res.blob();
  const contentDisposition = res.headers.get('content-disposition') || '';
  const filenameMatch = contentDisposition.match(/filename="?([^";\r\n]+)"?/);
  const filename = filenameMatch ? filenameMatch[1] : `resume-${id}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ================= PRODUCTS =================
export const fetchPublicProducts = async (category = 'All') => {
  const params = new URLSearchParams();
  if (category && category !== 'All' && category !== 'All Products') params.append('category', category);

  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
  return data.data || [];
};

export const fetchAdminProducts = async ({ category = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (category && category !== 'All' && category !== 'All Products') params.append('category', category);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/products/admin/all?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin products');
  return data.data || [];
};

export const createProduct = async (formData, token) => {
  const isForm = formData instanceof FormData;
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: getHeaders(token, isForm),
    body: isForm ? formData : JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create product');
  return data;
};

export const updateProduct = async (id, formData, token) => {
  const isForm = formData instanceof FormData;
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: getHeaders(token, isForm),
    body: isForm ? formData : JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update product');
  return data;
};

export const togglePublishProduct = async (id, token) => {
  const res = await fetch(`${API_BASE}/products/${id}/publish`, {
    method: 'PATCH',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle product status');
  return data;
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete product');
  return data;
};

// ================= INSIGHTS / CASE STUDIES =================
export const fetchPublicInsights = async (tag = 'All') => {
  const params = new URLSearchParams();
  if (tag && tag !== 'All') params.append('tag', tag);

  const res = await fetch(`${API_BASE}/insights?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch insights');
  return data.data || [];
};

export const fetchAdminInsights = async ({ tag = 'All', search = '' } = {}, token) => {
  const params = new URLSearchParams();
  if (tag && tag !== 'All') params.append('tag', tag);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/insights/admin/all?${params.toString()}`, {
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin insights');
  return data.data || [];
};

export const createInsight = async (formData, token) => {
  const isForm = formData instanceof FormData;
  const res = await fetch(`${API_BASE}/insights`, {
    method: 'POST',
    headers: getHeaders(token, isForm),
    body: isForm ? formData : JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create insight');
  return data;
};

export const updateInsight = async (id, formData, token) => {
  const isForm = formData instanceof FormData;
  const res = await fetch(`${API_BASE}/insights/${id}`, {
    method: 'PUT',
    headers: getHeaders(token, isForm),
    body: isForm ? formData : JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update insight');
  return data;
};

export const togglePublishInsight = async (id, token) => {
  const res = await fetch(`${API_BASE}/insights/${id}/publish`, {
    method: 'PATCH',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle insight status');
  return data;
};

export const deleteInsight = async (id, token) => {
  const res = await fetch(`${API_BASE}/insights/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete insight');
  return data;
};
