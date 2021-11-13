import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Confirm = (props) => {
  const router = useRouter();
  console.log(router.query);
  const [pickUpCoordinates, setPickUpCoordinates] = useState([0, 0]);
  const [dropOffCoordinates, setDropOffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = () => {
    const pickUpLocation = router.query.pickUpLocation;

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUpLocation}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoiam9tYXJtb250dXlhIiwiYSI6ImNrdnV0ZnhoeDBhODMybnFtZHNsZ29vNDYifQ.wELUqSZYF864ISHD5Q7m0w",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setPickUpCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = () => {
    const dropOfLocation = router.query.dropOffLocation;

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOfLocation}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoiam9tYXJtb250dXlhIiwiYSI6ImNrdnV0ZnhoeDBhODMybnFtZHNsZ29vNDYifQ.wELUqSZYF864ISHD5Q7m0w",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setDropOffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCoordinates();
    getDropoffCoordinates();
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  //   console.table(pickUpCoordinates);
  //   console.table(dropOffCoordinates);
  return (
    <Wrapper>
      <Map
        hidden={"hidden"}
        pickUpCoordinates={pickUpCoordinates}
        dropOffCoordinates={dropOffCoordinates}
      />
      <RideContainer>
        {/* <RideSelector>*/}
        <RideSelector
          pickUpCoordinates={pickUpCoordinates}
          dropOffCoordinates={dropOffCoordinates}
        />

        {/* <Confirm Button >*/}
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
h-screen   
flex-col
relative
z-0
`;

const RideContainer = tw.div`
flex
flex-1
flex-col
h-1
`;

const ConfirmButtonContainer = tw.div`
border-t-2
`;

const ConfirmButton = tw.div`
bg-black
text-white
my-4
mx-4
p-4
text-center
text-xl
cursor-pointer
`;

export default Confirm;
