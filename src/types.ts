export type ViewState = 
  | 'aura' 
  | 'explore' 
  | 'emergency' 
  | 'network' 
  | 'profile' 
  | 'safety-active' 
  | 'medical-emergency' 
  | 'nearby-help';

export interface Contact {
  id: string;
  name: string;
  status: 'online' | 'nearby' | 'offline';
  lastSeen: string;
  avatar: string;
}
