import { Card, CardHeader, CardMedia, Box } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export default function StyledCard({ item, onEdit, onDelete }) {
  const [editVisible, setEditVisible] = useState(false);
  return (
    <Card
      onMouseOver={() => setEditVisible(true)}
      onMouseOut={() => setEditVisible(false)}
      sx={{ position: "relative" }}
    >
      <CardHeader
        title={item?.name}
        sx={{ color: "dodgerblue", textAlign: "center" }}
      />
      <CardMedia
        component="img"
        src={item?.image}
        height="250"
        title={item?.name}
        alt={item?.name}
        sx={{ objectFit: "contain", p: 2 }}
      />

      {editVisible && (
        <Box sx={{ position: "absolute", top:'10px', right:'10px' }}>
          <EditIcon
            sx={{ color: "orange", cursor: "pointer" }}
            onClick={() => onEdit(item)}
          />
          <DeleteOutlineIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(item.id)}
          />
        </Box>
      )}
    </Card>
  );
}
