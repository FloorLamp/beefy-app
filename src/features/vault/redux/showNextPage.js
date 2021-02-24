import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VAULT_SHOW_NEXT_PAGE } from './constants';

const POOLS_PER_PAGE = 10;

export function useShowNextPage(pools) {
  const dispatch = useDispatch();

  const { visiblePoolPages } = useSelector(state => ({
    visiblePoolPages: state.vault.visiblePoolPages,
  }));

  const boundAction = useCallback(() => dispatch({ type: VAULT_SHOW_NEXT_PAGE }), [dispatch]);

  return {
    showNextPage: boundAction,
    pools: pools.slice(0, visiblePoolPages * POOLS_PER_PAGE),
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_SHOW_NEXT_PAGE:
      return {
        ...state,
        visiblePoolPages: state.visiblePoolPages + 1,
      };

    default:
      return state;
  }
}
