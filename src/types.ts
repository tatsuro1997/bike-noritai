import { components } from '@/schema';

export type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Spot = components['schemas']['Spot'];
