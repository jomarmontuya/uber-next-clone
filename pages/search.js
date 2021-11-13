/* eslint-disable @next/next/link-passhref */
import tw from "tailwind-styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Search = () => {
  const router = useRouter();
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const pickUpLocationHandler = (e) => {
    setPickUpLocation(e.target.value);
  };

  const dropOffLocationHandler = (e) => {
    setDropOffLocation(e.target.value);
  };

  useEffect(() => {
    if (pickUpLocation.length > 0 && dropOffLocation.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [pickUpLocation, dropOffLocation]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  return (
    <Wrapper>
      {/*Button Container */}
      <ButtonContainer>
        <Link href="/">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      {/*Input Container */}

      <InputContainer>
        <FormToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
        </FormToIcons>
        <InputBoxes>
          <Input
            placeholder="Enter Pickup Location"
            onChange={pickUpLocationHandler}
          />
          <Input placeholder="Where to?" onChange={dropOffLocationHandler} />
        </InputBoxes>
        <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
      </InputContainer>
      {/*Save Places*/}
      <SavePlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Save Places
      </SavePlaces>
      {/* Confirmed Locations */}
      <ConfirmedLocations>
        <Link
          href={{
            pathname: "confirm",
            query: {
              pickUpLocation: pickUpLocation,
              dropOffLocation: dropOffLocation,
            },
          }}
        >
          <ConfirmedLocationButton
            disabled={buttonDisabled ? "disabled" : undefined}
          >
            Confirmed Location
          </ConfirmedLocationButton>
        </Link>
      </ConfirmedLocations>
    </Wrapper>
  );
};

const Wrapper = tw.div`
bg-gray-200
h-screen

`;

const ButtonContainer = tw.div`
bg-white
px-4
`;

const BackButton = tw.img`
cursor-pointer

`;

const InputContainer = tw.div`
bg-white
flex
items-center
px-4

`;

const FormToIcons = tw.div`
w-10
flex
flex-col
mr-2
items-center
`;
const Circle = tw.img`
h-2.5

`;
const Line = tw.img`
h-10
`;
const Square = tw.img`
h-3

`;
const InputBoxes = tw.div`
flex
flex-col
flex-1
`;
const Input = tw.input`
h-10
bg-gray-200
my-2
rounded-2 
p-2
outline-none
border-none
`;

const PlusIcon = tw.img`
w-10
h-10
bg-gray-200
rounded-full
ml-3
`;

const SavePlaces = tw.div`
flex
items-center
bg-white
px-4
py-2

`;
const StarIcon = tw.img`
bg-gray-400
w-10
h-10
p-2
rounded-full
mr-2
`;

const ConfirmedLocations = tw.div`
flex
justify-center
items-center
mt-4

`;
const ConfirmedLocationButton = tw.button`
w-2/3
bg-black
text-white
p-3
`;

export default Search;
