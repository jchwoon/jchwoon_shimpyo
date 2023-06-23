import styled from 'styled-components';
import SideContainer from './SideContainer';
import SideBox from '../sideBox/SideBox';
import BottomContainer from './BottomContainer';
import NewSideBox from '../sideBox/NewSideBox';

export default function MainContainer() {
  return (
    <>
      <Main>
        <SideContainer />
        <NewSideBox />
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
