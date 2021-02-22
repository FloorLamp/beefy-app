import React from 'react';
import { useParams } from 'react-router';

import Disclaimer from 'components/Disclaimer/Disclaimer';
import PoolDetails from './components/PoolDetails/PoolDetails';

export default function VaultDetailsPage() {
  const { vaultId } = useParams();
  return (
    <>
      <Disclaimer />
      <PoolDetails vaultId={vaultId} />
    </>
  );
}
