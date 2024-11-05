
            import { FileCreateInput, FileUploadInfoResponse } from '../../../definitions/schema';
            import { IFileEntity } from '../../../domain';
            import { IRepositoryParams } from '../../../infrastructure';

            export interface IFileUseCase {
              uploadFileToStorage(params: 
                IRepositoryParams<{
                  key: string;
                  policy: string;
                  signature: string;
                  path: string;
                  file: File;
                }>
              ): Promise<{
                fileId: string;
              } | null>;
              createFile(params: 
                IRepositoryParams<FileCreateInput>
              ): Promise<IFileEntity | null>;
              getFileUploadInfo(
                params: IRepositoryParams<undefined>
              ): Promise<FileUploadInfoResponse | null>;
            }
          