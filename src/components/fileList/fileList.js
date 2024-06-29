import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileTile from '../fileTile/fileTile';
import { Box, TextField, Modal, Typography, Button } from '@mui/material';
import './fileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setFiles(response.data.slice(0, 12));
        setFilteredFiles(response.data.slice(0, 12));
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFiles(filtered);
    }
  }, [searchTerm, files]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownload = (file) => {
    console.log(`Downloading file: ${file.title}`);
  };

  const handleRename = (file) => {
    setSelectedFile(file);
    setNewFileName(file.title); // Set default file name
    setOpenRenameModal(true);
  };

  const handleCloseRenameModal = () => {
    setOpenRenameModal(false);
    setNewFileName('');
    setSelectedFile(null);
  };

  const handleRenameSubmit = () => {
    // Perform rename logic here (e.g., send request to backend)
    console.log(`Renaming file ${selectedFile.title} to ${newFileName}`);
    handleCloseRenameModal();
  };

  return (
    <Box className="file-list-container">
      <TextField
        label="Search by File Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <Box className="file-tile-container">
        {filteredFiles.map((file) => (
          <FileTile
            key={file.id}
            file={file}
            handleDownload={handleDownload}
            handleRename={handleRename}
          />
        ))}
      </Box>

      {/* Rename Modal */}
      <Modal
        open={openRenameModal}
        onClose={handleCloseRenameModal}
        aria-labelledby="rename-modal-title"
        aria-describedby="rename-modal-description"
      >
        <Box className="rename-modal">
          <Typography variant="h6" id="rename-modal-title">
            Rename File: {selectedFile && selectedFile.title}
          </Typography>
          <TextField
            label="New File Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <Button onClick={handleRenameSubmit} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default FileList;
