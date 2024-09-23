export interface Idea {
  id: number;
  rubric: number;
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  username: string;
  likes: string;
  file_one: string | null;
  file_two: string | null;
  file_three: string | null;
  file_four: string | null;
  file_five: string | null;
}
