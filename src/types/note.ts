export interface INote {
  id?: number;
  title: string;
  content: string;
}

export interface IOptimisticNote extends INote {
  pending?: boolean;
}
