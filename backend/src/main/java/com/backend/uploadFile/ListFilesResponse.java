package com.backend.uploadFile;

import java.util.List;

public class ListFilesResponse {
    public List<FileEntry> data;  // Notice 'data', not 'files'

    public static class FileEntry {
        public String name;
        // other fields if needed
    }
}
