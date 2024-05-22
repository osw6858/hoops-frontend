import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

export default function KakaoMap({
  lat = 0,
  lng = 0,
}: {
  lat: number
  lng: number
}) {
  const [,] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_APP_KEY,
    libraries: ['services'],
  })
  return (
    <div style={{ marginTop: '1rem' }}>
      <Map
        center={{ lat, lng }}
        style={{ width: '100%', height: '350px' }}
        level={4}
      >
        <MapMarker
          position={{
            lat,
            lng,
          }}
        />
      </Map>
    </div>
  )
}
