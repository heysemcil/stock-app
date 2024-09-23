import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ name, data }) {
  const [chart, setChart] = useState("line");
  return (
    <Card>
      <CardContent >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">{name}</Typography>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel>Chart Type</InputLabel>
            <Select
              label="Chart Type"
              value={chart}
              onChange={(e) => setChart(e.target.value)}
            >
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="area">Area Chart</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {chart === "line" && (
          <LineChart
            width={700}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 10 }}
            />
          </LineChart>
        )}

        {chart==='bar'&&(
            <BarChart width={700} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        )}

        {chart==='area'&&(
            <AreaChart
            width={700}
            height={250}
            data={data}
            margin={{
              top: 5, right: 30, bottom: 20, left: 5,
            }}
          >
            <XAxis dataKey="time" />
            <YAxis />
            <Area dataKey="price" stroke="#8884d8" fill="#8884d8"   type="monotone" />
            <Tooltip />
          </AreaChart>
        )}
      </CardContent>
    </Card>
  );
}
