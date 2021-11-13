import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import Link from "next/link";
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9tYXJtb250dXlhIiwiYSI6ImNrdnV0ZnhoeDBhODMybnFtZHNsZ29vNDYifQ.wELUqSZYF864ISHD5Q7m0w";

const Map = (props) => {
  // console.log(props);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [120.9593, 14.8757],
      zoom: 10,
    });

    if (props.pickUpCoordinates) {
      addToMap(map, props.pickUpCoordinates);
    }

    if (props.dropOffCoordinates) {
      addToMap(map, props.dropOffCoordinates);
    }

    if (props.pickUpCoordinates && props.dropOffCoordinates) {
      map.fitBounds([props.pickUpCoordinates, props.dropOffCoordinates], {
        padding: 60,
      });
    }
  }, [props.pickUpCoordinates, props.dropOffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  return (
    <Wrapper id="map">
      <ButtonContainer className={props.hidden ? "block" : "hidden"}>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex-1
    h-1/2
    
`;

const ButtonContainer = tw.div`
flex 

`;
const BackButton = tw.img`
w-10
z-10
bg-white
rounded-full
m-4
cursor-pointer
`;

export default Map;
