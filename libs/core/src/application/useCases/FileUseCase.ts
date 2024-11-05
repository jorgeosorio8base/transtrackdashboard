
        import { FileCreateInput, FileUploadInfoResponse } from '../../definitions/schema';
        import { FileEntity, IFileEntity } from '../../domain';
        import { FileRepository, IFileRepository, IRepositoryParams } from '../../infrastructure';
        import { IFileUseCase } from './interfaces';

        export class FileUseCase implements IFileUseCase {
          private readonly fileRepository: IFileRepository;
          private readonly errorCatcher: (error: unknown, methodName: string) => never;

          constructor() {
            this.fileRepository = new FileRepository();
            this.errorCatcher = (
                      error: unknown,
                      methodName: string,
                    ) => {
                        if (error instanceof Error) {
                            throw new Error(error.message);
                        }
                        
                        if (typeof error === 'string') {
                            throw new Error(error);
                        }

                        throw new Error(`An error occurred trying to ${methodName}`);
                    };
          }

          createFile(params: 
            IRepositoryParams<FileCreateInput>
          ): Promise<IFileEntity | null> {
            try {
              return this.fileRepository
              .createFile(params)
              .then((file) => new FileEntity(file))
              .catch((err) => this.errorCatcher(err, 'createFile'));
            } catch (error) {
              this.errorCatcher(error, 'createFile');
            }
          }

          getFileUploadInfo(
            params: IRepositoryParams<undefined>
          ): Promise<FileUploadInfoResponse | null> {
            try {
              return this.fileRepository
              .getFileUploadInfo(params)
              .then((response) => response)
              .catch((err) => this.errorCatcher(err, 'getFileUploadInfo'));
            } catch (error) {
              this.errorCatcher(error, 'getFileUploadInfo');
            }
          }

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
          } | null> {
            try {
              return this.fileRepository.uploadFileToStorage(params)
              .then((response) => response)
              .catch((err) => this.errorCatcher(err, 'uploadToFileStack'));
            } catch (error) {
              this.errorCatcher(error, 'uploadToFileStack');
            }
          }
        }
    