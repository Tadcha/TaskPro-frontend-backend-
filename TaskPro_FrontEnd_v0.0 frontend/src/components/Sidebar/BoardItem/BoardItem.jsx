import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  deleteDashboard,
  getDashboardById,
} from 'redux/dashboards/dashboardsOperations';
import { closeMenuMode } from 'redux/menuMode/menuModeSlice';

import sprite from '../../../images/sprite.svg';
import BasicModal from 'components/Modals/BasicModal/BasicModal';
import EditBoardModal from 'components/Modals/BoardModal/EditBoardModal/EditBoardModal';
import ConfirmDeleteModal from 'components/Modals/ConfirmDeleteModal/ConfirmDeleteModal';
import {
  Board,
  BoardIcon,
  BoardTitle,
  IconDel,
  IconEdit,
  IconsBlock,
  Item,
  StyledLink,
} from './BoardItem.styled';

const BoardItem = ({ item, index, onActive, activeProjectIndex }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleConfirmDelete = () => {
    dispatch(deleteDashboard(item._id));
    handleCloseDeleteModal();
  };
  const checkTextLength = text => {
    const str = text.split('');

    if (str.length <= 10) {
      return str.join('');
    }
    return str.splice(0, 10).join('') + '...';
  };

  const handleDragStart = event => {
    event.preventDefault();
  };

  const handleContextMenu = event => {
    event.preventDefault();
  };

  return (
    <>
      <Item
        className={activeProjectIndex === index ? 'active' : ''}
        draggable={false}
        onDragStart={handleDragStart}
        onContextMenu={handleContextMenu}
      >
        <StyledLink to={`${item.name}`}>
          <Board>
            <BoardIcon className={activeProjectIndex === index ? 'active' : ''}>
              <use href={sprite + item.icon} />
            </BoardIcon>

            <BoardTitle
              onClick={() => {
                onActive(index);
                dispatch(closeMenuMode());
                dispatch(getDashboardById(item._id));
              }}
              className={activeProjectIndex === index ? 'active' : ''}
            >
              {checkTextLength(item.name)}
            </BoardTitle>
          </Board>
          <IconsBlock>
            <IconEdit aria-label="edit icon" onClick={handleOpen}>
              <use href={sprite + `#icon-pencil`} />
            </IconEdit>

            <IconDel aria-label="delete icon" onClick={handleOpenDeleteModal}>
              <use href={sprite + `#icon-trash`} />
            </IconDel>
          </IconsBlock>
        </StyledLink>
      </Item>

      <BasicModal
        open={open}
        closeModal={handleClose}
        children={<EditBoardModal item={item} closeModal={handleClose} />}
      />
      <BasicModal
        open={openDeleteModal}
        closeModal={handleCloseDeleteModal}
        children={
          <ConfirmDeleteModal
            title="Delete Board"
            message={`Are you sure you want to delete the board "${item.title}"? This action cannot be undone and will delete all columns and cards in this board.`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDeleteModal}
          />
        }
      />
    </>
  );
};

export default BoardItem;
