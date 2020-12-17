import { Grid, Paper, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IFilter } from '~/interfaces/filters';

interface IProps {
  filters?: IFilter[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export default function FiltersWidget({ filters }: IProps) {
  const classes = useStyles();

  // Needs to get filters here probably from store Redux

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Some place for filter category</Paper>
        <Paper className={classes.paper}>
          {filters ? (
            filters.map((filter: IFilter) => (
              <Box key={filter.name}>{filter}</Box>
            ))
          ) : (
            <span>No filters passed out</span>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
