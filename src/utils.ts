import { BookItem } from './models';

export const sortByWriter = (books: BookItem[]): BookItem[] => {
  return books.sort((a, b) =>
    a.writer.toLowerCase() > b.writer.toLowerCase() ? 1 : -1
  );
};

export const parseBooks = (
  list: FileList | null,
  callback: (value: BookItem[]) => void
): void => {
  if (!list) {
    return;
  }

  const file = list.item(0);

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const books: BookItem[] = JSON.parse((e.target?.result as string) || "[]");
    callback(books);
  };

  reader.readAsText(list[0]);
};
