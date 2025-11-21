import { prisma } from '../db/client.js';
import { validateUrl, validateCode } from '../utils/validation.js';

export async function createLink(targetUrl, customCode) {
  if (!validateUrl(targetUrl)) {
    throw new Error('Invalid URL format');
  }

  if (!customCode) {
    throw new Error('Custom code is required');
  }

  if (!validateCode(customCode)) {
    throw new Error('Code must be 6-8 alphanumeric characters');
  }

  const existing = await prisma.link.findUnique({
    where: { code: customCode }
  });

  if (existing) {
    throw new Error('Code already exists');
  }

  const link = await prisma.link.create({
    data: {
      code: customCode,
      target_url: targetUrl
    }
  });

  return link;
}

export async function getAllLinks() {
  return await prisma.link.findMany({
    orderBy: { created_at: 'desc' }
  });
}

export async function getLinkByCode(code) {
  return await prisma.link.findUnique({
    where: { code }
  });
}

export async function incrementClick(code) {
  return await prisma.link.update({
    where: { code },
    data: {
      total_clicks: { increment: 1 },
      last_clicked: new Date()
    }
  });
}

export async function deleteLink(code) {
  return await prisma.link.delete({
    where: { code }
  });
}
