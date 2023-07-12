import styled from 'styled-components';
import SideContainer from './SideContainer';
import BottomContainer from './BottomContainer';
import NewSideBox from '../sideBox/NewSideBox';

interface MainContainerProps {
  houseName: string,
  houseContents: string;
  options: Array<string>;
  rooms: Array<Object>;
  lat: number;
  lng: number;
}

export default function MainContainer({ houseName, houseContents, options, rooms, lat, lng }: MainContainerProps) {
  return (
    <>
      <Main>
        <SideContainer houseContents={houseContents} options={options} rooms={rooms} lat={lat} lng={lng} />
        <NewSideBox houseName={houseName} />
      </Main>
      <BottomContainer />
    </>
  );
}

const Main = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-top: 48px;
  @media screen and (max-width: 750px){
    flex-direction: column;
  };
`;
