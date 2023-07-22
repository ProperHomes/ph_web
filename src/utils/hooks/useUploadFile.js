import { useMutation, gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation createFile($input: CreateFileInput!) {
    createFile(input: $input) {
      file {
        id
        key
        extension
        info
        signedUrl
      }
    }
  }
`;

function useUploadFile() {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleFileUpload = async (fileInput) => {
    try {
      const res = await uploadFile({ variables: { input: fileInput } });
      return res?.data?.createFile?.file;
    } catch (err) {
      console.log(err);
    }
  };

  return handleFileUpload;
}

export default useUploadFile;
