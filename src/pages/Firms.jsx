import {
  Button,
  Stack,
  Typography,
  Box,
  Container,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import StyledCard from "../components/StyledCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  ViewCarousel as ViewCarouselIcon,
  Map as MapIcon,
} from "@mui/icons-material";

import { uiActions } from "../store/ui";
import { deleteFirm, getFirms } from "../store/firms";
import FirmModal from "../components/Modals/FirmModal";
import MapView from "../components/MapView";

export default function Firms() {
  const dispatch = useDispatch();
  const firms = useSelector((state) => state.firms.data);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState("card");

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const openModal = () => setOpen(true);

  useEffect(() => {
    dispatch(getFirms());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFirm(id));
  };
  const handleEdit = (brand) => {
    setEdit(true);
    setOpen(true);
    dispatch(uiActions.setModalData(brand));
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Firms
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Firm
        </Button>
      </Stack>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" pb={1}>
          <Box flexGrow={1} />
          <ToggleButtonGroup
            exclusive
            size="small"
            value={view}
            onChange={(e, newView) => setView(newView)}
          >
            <ToggleButton value="card">
              <ViewCarouselIcon />
            </ToggleButton>
            <ToggleButton value="map">
              <MapIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {view === "card" && (
          <Grid container spacing={5}>
            {firms.map((brand) => (
              <Grid item xs={12} md={6} xl={3}>
                <StyledCard
                  item={brand}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {view==='map'&&(
          <MapView/>
        )}

        <FirmModal closeModal={closeModal} open={open} edit={edit} />
      </Container>
    </Box>
  );
}
