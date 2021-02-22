import React from 'react';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import styles from './styles';

import useFilteredPools from '../../hooks/useFilteredPools';
import usePoolsByPlatform from '../../hooks/usePoolsByPlatform';
import usePoolsByVaultType from '../../hooks/usePoolsByVaultType';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';
import useSortedPools from '../../hooks/useSortedPools';

import PoolSummary from '../PoolSummary/PoolSummary';
import Filters from '../Filters/Filters';

const useStyles = makeStyles(styles);

// TODO: Measure this dynamically?
const rowHeight = 122;

const VisiblePools = ({
  pools,
  tokens,
  apys,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { poolsByPlatform, platform, setPlatform } = usePoolsByPlatform(filteredPools);
  const { poolsByVaultType, vaultType, setVaultType } = usePoolsByVaultType(poolsByPlatform);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(poolsByVaultType);
  const { sortedPools, order, setOrder } = useSortedPools(poolsByAsset, apys);

  return (
    <>
      <Filters
        toggleFilter={toggleFilter}
        filters={filters}
        platform={platform}
        vaultType={vaultType}
        asset={asset}
        order={order}
        setPlatform={setPlatform}
        setVaultType={setVaultType}
        setAsset={setAsset}
        setOrder={setOrder}
      />
      <FixedSizeList
        itemSize={rowHeight}
        itemCount={sortedPools.length}
        height={rowHeight * 10}
        width="100%"
        itemData={sortedPools}
        onItemsRendered={data => console.log(data)}
      >
        {({ data, index, style }) => {
          const pool = data[index];
          return (
            <PoolSummary
              style={style}
              pool={pool}
              index={index}
              tokens={tokens}
              apy={apys[pool.id] || 0}
              key={pool.id}
              fetchBalancesDone={fetchBalancesDone}
              fetchApysDone={fetchApysDone}
              fetchVaultsDataDone={fetchVaultsDataDone}
            />
          );
        }}
      </FixedSizeList>
      {!sortedPools.length && <h3 className={classes.subtitle}>{t('No-Results')}</h3>}
    </>
  );
};

export default VisiblePools;
