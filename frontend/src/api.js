const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export async function createLink(targetUrl, customCode) {
  const response = await fetch(`${API_URL}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      target_url: targetUrl,
      custom_code: customCode
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'Failed to create link');
  }

  const result = await response.json();
  return result.data;
}

export async function getAllLinks() {
  const response = await fetch(`${API_URL}/api/links`);

  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }

  const result = await response.json();
  return result.data || [];
}

export async function getLinkStats(code) {
  const response = await fetch(`${API_URL}/api/links/${code}`);

  if (!response.ok) {
    throw new Error('Link not found');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteLink(code) {
  const response = await fetch(`${API_URL}/api/links/${code}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete link');
  }

  const result = await response.json();
  return result.data;
}
