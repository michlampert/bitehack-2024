import React from 'react'

import { useLocation } from 'react-router-dom'
import DetailedView from './DetailedView'
import Home from './Home'

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function App() {

  const query = useQuery()

  return <>
    {query.get("id") ? <DetailedView id={query.get("id")!} /> : <Home />}
  </>
}
