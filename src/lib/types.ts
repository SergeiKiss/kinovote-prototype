export type ContentItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'movie' | 'series';
  votes: {
    up: number;
    down: number;
  };
  trailerUrl?: string;
  aiHint: string;
  actors: string[];
  director: string;
  country: string;
  genre: string;
};

export type Vote = 'up' | 'down' | null | undefined;
