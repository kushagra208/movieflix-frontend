    import React, { useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { fetchStats } from '../features/stats/slice/statsSlice';
    import { Grid, Paper, Typography } from '@mui/material';
    import { Pie, Bar, Line } from 'react-chartjs-2';
    import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

    Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

    export default function StatsDashboard() {
    const dispatch = useDispatch();
    const stats = useSelector(s => s.stats.data);

    useEffect(() => { dispatch(fetchStats()); }, [dispatch]);

    if (!stats) return <Typography>Loading stats...</Typography>;

    const genreLabels = Object.keys(stats.genreDistribution || {});
    const genreCounts = genreLabels.map(k => stats.genreDistribution[k]);

    const ratingLabels = Object.keys(stats.avgRatingByGenre || {});
    const ratingValues = ratingLabels.map(k => stats.avgRatingByGenre[k]);

    const yearLabels = Object.keys(stats.avgRuntimeByYear || {}).sort();
    const yearValues = yearLabels.map(k => stats.avgRuntimeByYear[k]);

    const pieColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
  '#9966FF', '#FF9F40', '#E7E9ED'
];

    return (
        <Grid width={'100%'} container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>Genres Distribution</Typography>
            <div style={{ height: "320px" }}>
                <Pie data={{ labels: genreLabels, datasets: [{ 
                data: genreCounts,
                backgroundColor: pieColors.slice(0, genreLabels.length),
                borderColor: '#fff',
                borderWidth: 2
                }] }} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>Average Ratings by Genre</Typography>
            <div style={{ height: "320px" }}>
                <Bar data={{ labels: ratingLabels, 
                    datasets: [{
                    label: 'Avg Rating',
                    data: ratingValues,
                    backgroundColor: ratingLabels.map((_, i) => pieColors[i % pieColors.length]),
                    }]
                 }} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>Avg Runtime by Year</Typography>
            <div style={{ height: "320px" }}>
                <Line data={{ labels: yearLabels, 
                datasets: [{
                label: 'Avg Runtime',
                data: yearValues,
                borderColor: '#36A2EB',
                backgroundColor: '#36A2EB33', // translucent fill
                tension: 0.3, // smooth curve
                fill: true
                }]
                }} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            </Paper>
        </Grid>
        </Grid>
    );
    }
