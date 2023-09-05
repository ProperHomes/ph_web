'use client';
import { useMutation, gql } from "@apollo/client";

export const DELETE_FILE = gql`
  mutation deleteFile($id: UUID!) {
    deleteFile(input: { id: $id }) {
      file {
        id
      }
    }
  }
`;

// Todo: use sst/db trigger to delete files in s3 buckets too 

function useDeleteFile() {
  const [deleteFile] = useMutation(DELETE_FILE);

  const handleDeleteFile = async (fileId) => {
    if (!fileId) return;
    try {
      await deleteFile({ variables: { id: fileId } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMultipleFiles = async (fileIds) => {
    if (fileIds.length === 0) return;
    try {
      await Promise.all(fileIds.map(handleDeleteFile));
    } catch (err) {
      console.log("Error deleting files: ", err);
    }
  };

  return { handleDeleteMultipleFiles, handleDeleteFile };
}

export default useDeleteFile;
