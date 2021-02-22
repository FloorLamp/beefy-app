import { VaultPage } from './';
import VaultDetailsPage from './VaultDetailsPage';

export default {
  path: '',
  childRoutes: [
    { path: '', component: VaultPage, isIndex: true },
    { path: 'vault/:vaultId', component: VaultDetailsPage },
  ],
};
