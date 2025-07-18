import mongoose, { Schema, model, models, Document } from 'mongoose';
import type { EventType } from '@/types';

export const EventSchema = new Schema<EventType>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: false },
  banners: { type: [String], required: false },
  prizes: { type: String, required: true },
  sponsors: { type: [String], required: false },
});