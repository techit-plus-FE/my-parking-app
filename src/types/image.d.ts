interface imageResponseType {
  config: object;
  data: {
    ok?: number;
    file? : FilesResType;
    files? : FilesResType[];
  };
}

interface ImageSlice {
  uploadImage: (ref: RefObject<HTMLInputElement>) => Promise<string[]>
}