import React from 'react'

type Props = {}

const WeatherDetails = (props: Props) => {
  return (
    <>WeatherDetails</>
  )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return ()
}