import * as linkService from '../services/linkService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createLink = asyncHandler(async (req, res) => {
  const { target_url, custom_code } = req.body;

  if (!target_url) {
    throw new ApiError(400, 'target_url is required');
  }

  try {
    const link = await linkService.createLink(target_url, custom_code);
    res.status(201).json(new ApiResponse(201, link, 'Link created successfully'));
  } catch (error) {
    if (error.message.includes('already exists')) {
      throw new ApiError(409, error.message);
    }
    throw new ApiError(400, error.message);
  }
});

export const getAllLinks = asyncHandler(async (req, res) => {
  const links = await linkService.getAllLinks();
  res.json(new ApiResponse(200, links, 'Links fetched successfully'));
});

export const getLinkStats = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const link = await linkService.getLinkByCode(code);

  if (!link) {
    throw new ApiError(404, 'Link not found');
  }

  res.json(new ApiResponse(200, link, 'Link stats fetched successfully'));
});

export const deleteLink = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const link = await linkService.getLinkByCode(code);

  if (!link) {
    throw new ApiError(404, 'Link not found');
  }

  await linkService.deleteLink(code);
  res.json(new ApiResponse(200, null, 'Link deleted successfully'));
});

export const redirect = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const link = await linkService.getLinkByCode(code);

  if (!link) {
    throw new ApiError(404, 'Link not found');
  }

  await linkService.incrementClick(code);
  res.redirect(302, link.target_url);
});

export const healthCheck = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, { status: 'ok' }, 'Server is healthy'));
});
