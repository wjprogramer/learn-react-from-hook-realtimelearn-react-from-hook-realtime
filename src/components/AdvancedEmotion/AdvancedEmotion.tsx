import { css } from '@emotion/react';
import styled from '@emotion/styled';

const buttonDefault = (props: any) => css`
  display: block;
  width: 120px;
  height: 30px;
  font-size: 14px;
  background-color: transparent;
  color: ${props.theme === 'dark' ? '#dadada' : '#212121'};
`;

const RejectButton = styled.button`
  ${buttonDefault}
  background-color: red;
`

const AcceptButton = styled.button`
  ${buttonDefault}
  background-color: green;
`

// 套用 css 到某 component 上
const ButtonContainer = styled(AcceptButton)`
  width: 100px;
  height: 100px;
  background-color: black;
`

const AdvancedEmotion = () => {
  return <>
    <RejectButton />
    <AcceptButton />
    <ButtonContainer />
  </>;
}

export default AdvancedEmotion;