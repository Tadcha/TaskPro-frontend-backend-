import { useState } from 'react';
import sprite from '../../../images/sprite.svg';
import {
  AccentText,
  Image,
  Wrapper,
  Text,
  ButtonWrapper,
  ButtonText,
  CircleIcon,
} from './NeedHelpBlock.styled';
import BasicModal from 'components/Modals/BasicModal/BasicModal';
import NeedHelpModal from 'components/Modals/NeedHelpModal/NeedHelpModal';

const NeedHelpBlock = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/help-image.svg`}
        alt="need help image"
      />

      <Text>
        If you need help with <AccentText>TaskPro</AccentText>, check out our
        support resources or reach out to our customer support team.
      </Text>

      <ButtonWrapper onClick={handleOpen}>
        <CircleIcon>
          <use href={sprite + '#icon-help-circle'} />
        </CircleIcon>

        <ButtonText>Need help?</ButtonText>
      </ButtonWrapper>

      <BasicModal
        name="NeedHelp"
        open={open}
        closeModal={handleClose}
        children={<NeedHelpModal closeModal={handleClose} />}
      />
    </Wrapper>
  );
};

export default NeedHelpBlock;
