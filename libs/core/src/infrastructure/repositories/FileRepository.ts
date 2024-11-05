
      /* eslint-disable @typescript-eslint/no-explicit-any */
      import {IRepositoryParams, IFileRepository} from './interfaces';
      import {Http, IHttp} from '../http';
      import { gql } from 'graphql-request';
      import {Environment} from '../../environment';
      import { FileCreateInput, FileUploadInfoResponse, File as GQLFile } from '../../definitions/schema';

      export class FileRepository implements IFileRepository {
        private readonly http: IHttp;

        constructor() {
          this.http = new Http();
        }

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
          } | null> {
            const queryParams = new URLSearchParams({
              key: params.variables.key,
              policy: params.variables.policy,
              signature: params.variables.signature,
              path: params.variables.path,
            });

            return this.http
              .request<{
                url: string;
              }>({
                url: `https://www.filestackapi.com/api/store/S3?${queryParams}`,
                method: 'POST',
                headers: {
                  'Content-Type': params.variables.file.type,
                },
                body: params.variables.file,
              })
              .then((response) => {
                const pathname = new URL(response.url).pathname;
                return {
                  fileId: pathname.replace(/\//g, ''),
                };
              })
              .catch(() => null);
        }

        getFileUploadInfo(
          params: IRepositoryParams<undefined>
        ): Promise<FileUploadInfoResponse | null> {
          return this.http
            .requestGraphQL<{
              system: {
                fileUploadSignInfo: FileUploadInfoResponse;
              };
            }>({
              requestDocument: gql`
                query {
                  system {
                    fileUploadSignInfo {
                      ...FileUploadInfo
                    }
                  }
                }

                fragment FileUploadInfo on FileStackSignInfoResponse {
                  apiKey
                  policy
                  signature
                  path
                }
              `,
              url: Environment.BACKEND_API_URL,
              token: params.token,
            })
            .then((response) => response.system.fileUploadSignInfo);
        }

        createFile(params: IRepositoryParams<FileCreateInput>): Promise<GQLFile> {
          return this.http
            .requestGraphQL<{
              fileCreate: GQLFile;
            }>({
              requestDocument: gql`
                mutation ($data: FileCreateInput!) {
                  fileCreate(data: $data) {
                    id
                    fileId
                    filename
                    downloadUrl
                  }
                }
              `,
              url: Environment.BACKEND_API_URL,
              variables: {
                data: params.variables,
              },
              token: params.token,
            })
            .then((response) => response.fileCreate);
        }
      }
    