
      import { File as GQLFile } from '../../definitions/schema';
      import { IFileEntity } from './interfaces';

      export class FileEntity implements IFileEntity {
        private readonly _id: string;
        private readonly _downloadUrl: string;
        private readonly _fileId: string;
        private readonly _fileName: string;
        private readonly _fileRaw?: File;

        constructor(data?: GQLFile & {
          fileRaw?: File;
        }) {
          this._id = data?.id || '';
          this._downloadUrl = data?.downloadUrl || '';
          this._fileId = data?.fileId || '';
          this._fileName = data?.filename || '';
          this._fileRaw = data?.fileRaw || undefined;
        }

        get Id(): string {
          return this._id;
        }

        get DownloadUrl(): string {
          return this._downloadUrl;
        }

        get FileId(): string {
          return this._fileId;
        }

        get FileName(): string {
          return this._fileName;
        }

        get FileRaw(): File | undefined {
          return this._fileRaw;
        }
      }
    