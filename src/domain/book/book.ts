export interface Book {
    id: string;
    title: string;
    description: string;
    author: string;
    year: string;
    coverPath: string | null;
    sourcePath: string | null;
    cover: File | null;
    source: File | null;
}


export interface BookDataWithActionStatus extends Book {
    coverActionStatus?: FileEditAction;
    sourceActionStatus?: FileEditAction;
}

export enum FileEditAction {
    Keep = "keep",
    Replace = "replace",
    Remove = "remove",
}


export type AddBookFormData = Pick<Book, 'id' | 'title' | 'author' | 'description' | 'year' | 'cover' | 'source'>

export type BookToSave = Pick<Book, 'id' | 'title' | 'author' | 'description' | 'year' | 'coverPath' | 'sourcePath'>