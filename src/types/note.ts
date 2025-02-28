export interface INote {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface IOptimisticNote extends INote {
  pending?: boolean;
}
