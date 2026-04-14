import { useModal } from '../../context/ModalContext';
import styles from './JoinButton.module.css';

const JoinButton = ({ children, className }) => {
  const { openAuthModal } = useModal();
  const handleJoinClick = () => {
    openAuthModal();
  };

  return (
    <button onClick={handleJoinClick} className={`${styles.btnPrimary} ${className ? className : ''}`}>
      {children || 'Join Sequorr'}
    </button>
  );
};

export default JoinButton;
