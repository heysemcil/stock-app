import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIcon from '../images/MARKER.png';

import { useSelector } from 'react-redux';
import { Card, CardHeader, CardMedia } from '@mui/material';

const position = [40.748958, -73.986095]



export default function MapView() {

  const firms = useSelector(state=> state.firms.data)

  return (
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <Marker position={position} icon={new Icon({iconUrl:markerIcon, iconSize:[50,50]})}>
      <Popup>
        <Card>
          <CardHeader title={firms[0].name} sx={{color: 'dodgerblue', textAlign:'center'}}/>
          <CardMedia component="img" src={firms[0].image} height="50" title={firms[0].name} alt={firms[0].name} sx={{objectFit:'cover' , p:2}}/>
        </Card>
      </Popup>
    </Marker>
    
  </MapContainer>
  )
}

