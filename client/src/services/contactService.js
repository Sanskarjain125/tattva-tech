const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Submit a contact form message to backend
 * @param {Object} data { name, email, company, message }
 */
export const sendContactMessage = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit contact message');
    }
    return result;
  } catch (error) {
    // If backend is unreachable, throw informative error
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Fetch all contact submissions (for demo/admin view)
 */
export const getContactMessages = async () => {
  try {
    const response = await fetch(`${API_BASE}/contact`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch messages');
    }
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
