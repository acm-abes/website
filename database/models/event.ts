import mongoose, { Schema, model, models, Document } from 'mongoose';
import type { EventType } from '@/types';
import { EventSchema } from '@/schemas/mongoose/event';

export const Event =
  models.Event || model<EventType>('Event', EventSchema);
