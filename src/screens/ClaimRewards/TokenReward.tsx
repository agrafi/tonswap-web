import { Box, Typography } from "@mui/material";
import { Token } from "types";
import { useStyles } from "./styles";

interface Props {
  amount: number;
  token?: Token;
}

function TokenReward({ amount, token }: Props) {
  const classes = useStyles();



  return (
    <Box style={{ background: token?.color || "" }} className={classes.tokenRewardBox}>
      <Typography component='p'>Earned Reward:</Typography>
      <Typography component='p'>
        <strong>{amount.toFixed(7)} {token?.displayName}</strong>
      </Typography>
    </Box>
  );
}

export default TokenReward;
