import { useState } from 'react';

const useExpandedPools = () => {
  const [poolExpanded, setPool] = useState({});

  const togglePool = id => {
    setPool(pools => ({ ...pools, [id]: !pools[id] }));
  };

  return { poolExpanded, togglePool };
};

export default useExpandedPools;
