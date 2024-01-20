import React from 'react'

import { useLocation } from 'react-router-dom'
import DetailedView from './DetailedView'
import Home from './Home'
import TopBarComponent from '../../components/TopBar'

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function App() {

  const query = useQuery()

  return <>
    <TopBarComponent />
    {query.get("id") ? <DetailedView id={query.get("id")!} /> : <Home />}
  </>
}
