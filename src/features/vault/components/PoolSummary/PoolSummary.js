import React, { memo } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { formatApy, formatTvl, calcDaily, formatDecimals } from 'features/helpers/format';
import { byDecimals } from 'features/helpers/bignumber';
import styles from './styles';
import PoolPaused from './PoolPaused/PoolPaused';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import SummaryActions from './SummaryActions/SummaryActions';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  style,
  pool,
  tokens,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  push,
}) => {
  const classes = useStyles(pool);

  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const { t } = useTranslation();
  const vaultStateTitle = (status, paused) => {
    let state =
      status === 'eol'
        ? t('Vault-DepositsRetiredTitle')
        : paused
        ? t('Vault-DepositsPausedTitle')
        : null;
    return state === null ? '' : <PoolPaused message={t(state)} />;
  };

  return (
    <div style={style}>
      <Grid
        className={classes.container}
        container
        justify="space-around"
        spacing={0}
        onClick={event => {
          // Do we need to connect to redux store here?
          push(`/vault/${pool.id}`);
        }}
      >
        {vaultStateTitle(pool.status, pool.depositsPaused)}
        <PoolTitle
          name={pool.name}
          logo={pool.logo}
          description={pool.tokenDescription}
          url={pool.tokenDescriptionUrl}
        />
        <Grid item md={7} xs={4}>
          <Grid item container justify="space-between">
            <Hidden smDown>
              <LabeledStat
                value={formatDecimals(balanceSingle)}
                label={t('Vault-Balance')}
                isLoading={!fetchBalancesDone}
                xs={5}
                md={3}
              />
              <LabeledStat
                value={formatDecimals(
                  byDecimals(
                    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
                    pool.tokenDecimals
                  )
                )}
                label={t('Vault-Deposited')}
                isLoading={!fetchBalancesDone}
                xs={5}
                md={3}
                align="start"
              />
              <LabeledStat
                value={formatApy(apy)}
                label={t('Vault-APY')}
                isLoading={!fetchApysDone}
                xs={5}
                md={2}
                align="start"
              />
              <LabeledStat
                value={calcDaily(apy)}
                label={t('Vault-APYDaily')}
                isLoading={!fetchApysDone}
                xs={5}
                md={2}
              />
              <LabeledStat
                value={formatTvl(pool.tvl, pool.oraclePrice)}
                label={t('Vault-TVL')}
                isLoading={!fetchVaultsDataDone}
                xs={5}
                md={2}
              />
            </Hidden>
          </Grid>
        </Grid>
        <SummaryActions helpUrl={pool.tokenDescriptionUrl} />

        <Hidden mdUp>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <LabeledStat
              value={formatDecimals(balanceSingle)}
              label={t('Vault-Balance')}
              isLoading={!fetchBalancesDone}
              xs={6}
            />
            <LabeledStat
              value={formatDecimals(
                byDecimals(
                  sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
                  pool.tokenDecimals
                )
              )}
              label={t('Vault-Deposited')}
              xs={6}
              align="start"
            />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <LabeledStat
              value={formatApy(apy)}
              label={t('Vault-APY')}
              isLoading={!fetchApysDone}
              xs={4}
              align="start"
            />
            <LabeledStat
              value={calcDaily(apy)}
              label={t('Vault-APYDaily')}
              isLoading={!fetchApysDone}
              xs={4}
            />
            <LabeledStat
              value={formatTvl(pool.tvl, pool.oraclePrice)}
              label={t('Vault-TVL')}
              isLoading={!fetchVaultsDataDone}
              xs={4}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default connect(null, { push })(PoolSummary);
