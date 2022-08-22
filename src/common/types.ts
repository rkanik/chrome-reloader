export type ReloadTimer = {
  origin: string;
  isEnabled: boolean;
  isInterval: boolean;
  milliseconds: number;

  createdAt: string;
  updatedAt: string;
};

export type ReloadTimers = ReloadTimer[];
