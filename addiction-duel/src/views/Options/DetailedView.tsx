import React, { useState } from 'react'
import HistoryList from '../../components/UserHistory'

export default function DetailedView(props: { id: number }) {

  return <>
    <HistoryList id={props.id} />
  </>
}
