export interface RepoInterface {
  _id: string;
  author: string;
  authorId: string;
  name: string;
  stars: number;
  mostusedlanguage: string;
  description: string;
  isprivate: boolean;
  commiteId: CommiteIdInterface[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommiteIdInterface {
  username: string;
  commiteId: string;
  title: string;
  description: string;
  _id: string;
  time: string;
}
