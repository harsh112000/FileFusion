import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography, Box, Avatar, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';
import ShareModal from '../shareModal';
import './fileTile.css';

const formatLastModified = () => {
  const date = new Date();
  return date.toLocaleString();
};

const FileTile = ({ file, handleDownload, handleRename }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDoubleClick = () => {
    window.open(file.thumbnailUrl, '_blank');
  };

  const displayTitle = file.title.length > 15 ? `${file.title.slice(0, 15)}...` : file.title;

  const openShareModalHandler = () => {
    setOpenShareModal(true);
    handleClose();
  };

  return (
    <Card className="file-tile">
      <Box
        className="file-tile-header"
        onClick={handleClick}
      >
        <Box className="file-actions">
          <ImageIcon className="file-icon" />
          <Tooltip title={file.title} placement="top">
            <Typography className="file-title">
              {displayTitle}
            </Typography>
          </Tooltip>
        </Box>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        className="file-thumbnail"
        image={file.thumbnailUrl}
        alt={file.title}
        onDoubleClick={handleDoubleClick}
      />
      <CardContent className="file-details">
        <Box className="file-details-content">
          <Avatar className="file-avatar" src={file.avatarUrl} />
          <Box className="file-metadata">
            <Typography variant="caption" color="textSecondary">
              Last modified: {formatLastModified()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleDownload(file)}>Download</MenuItem>
        <MenuItem onClick={openShareModalHandler}>Share</MenuItem>
        <MenuItem onClick={() => handleRename(file)}>Rename</MenuItem>
      </Menu>

      <ShareModal
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
        file={file}
      />
    </Card>
  );
};

export default FileTile;
