
              import {IRepositoryParams} from './iRepositoryParams';
              import {FileCreateInput, FileUploadInfoResponse, File as GQLFile} from '../../../definitions/schema';

              export interface IFileRepository {
                uploadFileToStorage(
                  params: IRepositoryParams<{
                    key: string;
                    policy: string;
                    signature: string;
                    path: string;
                    file: any;
                  }>
                ): Promise<{
                  fileId: string;
                } | null>;
                getFileUploadInfo(
                  params: IRepositoryParams<undefined>
                ): Promise<FileUploadInfoResponse | null>;
                createFile(params: IRepositoryParams<FileCreateInput>): Promise<GQLFile>;
              }
            