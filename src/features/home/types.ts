export type CharacterStatus = 'alive' | 'dead' | 'missing';

export type CharacterSummary = {
  id: string;
  name: string;
  profession: string;
  status: CharacterStatus;
  avatarId?: string | null;
  currentCity: string;
  daysAlive: number;
  zombiesKilled: number;
};
